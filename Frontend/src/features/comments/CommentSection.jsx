import { useEffect, useState } from 'react';
import { getCommentsByBlogId, createComment } from './commentService';
import Comment from '../../components/Comment';
import CommentForm from '../../components/CommentForm';

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [reload, setReload] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      const fetchComments = async () => {
        try {
          const data = await getCommentsByBlogId(blogId);
          setComments(data);
        } catch (err) {
          console.error('Failed to load comments', err);
        }
      };

      fetchComments();
    }
  }, [blogId, reload, showComments]);

  const handleCommentSubmit = async (content) => {
    try {
      await createComment(blogId, content);
      setReload(!reload);
    } catch (err) {
      alert('Failed to post comment', err);
    }
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold mb-6">Comments</h3>

      <CommentForm onSubmit={handleCommentSubmit} />

      <button
        onClick={toggleComments}
        className="mt-6 px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 text-sm font-medium transition"
      >
        {showComments ? 'Hide Comments' : 'See Comments'}
      </button>

      {showComments && (
        <div className="mt-8 space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
