const Comment = ({ comment }) => {
  return (
    <div className="bg-gray-50 p-3 rounded shadow-sm">
      <p className="text-sm text-gray-800">{comment.text}</p>
      <div className="text-xs text-gray-500 mt-1">
        — {comment.user?.username || 'Anonymous'}, {new Date(comment.created).toLocaleDateString()}
      </div>
    </div>
  );
};

export default Comment;
