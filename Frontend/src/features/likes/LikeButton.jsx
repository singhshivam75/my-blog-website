import { useEffect, useState } from 'react';
import { getLikesCount, toggleLike, getLikedUsers } from './likeService';

const LikeButton = ({ blogId }) => {
  const [likes, setLikes] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const fetchLikes = async () => {
    try {
      const count = await getLikesCount(blogId);
      setLikes(count);
    } catch (err) {
      console.error('Error fetching likes count:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const users = await getLikedUsers(blogId);
      setLikedUsers(users);
    } catch (err) {
      console.error('Error fetching liked users:', err);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [blogId]);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await toggleLike(blogId);
      await fetchLikes();
    } catch (err) {
      alert('Error toggling like: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleShowUsers = async () => {
    if (!showUsers) {
      await fetchUsers();
    }
    setShowUsers(!showUsers);
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
      >
        ❤️ Like
      </button>
      <span className="ml-3 font-medium text-gray-700">{likes} {likes === 1 ? 'like' : 'likes'}</span>

      <button
        onClick={handleShowUsers}
        className="ml-4 text-sm text-blue-600 underline hover:text-blue-800"
      >
        {showUsers ? 'Hide users' : 'View users'}
      </button>

      {showUsers && (
        <ul className="pl-5 mt-3 text-sm text-gray-700 list-disc">
          {likedUsers.length === 0 ? (
            <li>No users have liked this blog yet.</li>
          ) : (
            likedUsers.map((user, index) => (
              user?.username && user?.email ? (
                <li key={user._id || index}>{user.username} ({user.email})</li>
              ) : null
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default LikeButton;
