import { useState, useEffect } from 'react';
import { Send, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './CommentSection.css';

const CommentSection = ({ videoId }) => {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement Firebase Firestore for comments
    // For now, comments are stored in local state only
    setLoading(false);
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    const commentData = {
      id: Date.now(),
      videoId,
      userId: currentUser.uid,
      userName: currentUser.displayName || 'Athlete',
      userAvatar: currentUser.photoURL || null,
      content: newComment,
      createdAt: new Date().toISOString(),
    };

    // TODO: Save to Firebase Firestore
    setComments(prev => [...prev, commentData]);
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <h3 className="comments-title">Comments ({comments.length})</h3>
      
      {currentUser ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          {currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="Profile" className="comment-avatar" />
          ) : (
            <User size={40} className="comment-avatar-placeholder" />
          )}
          <div className="comment-input-wrapper">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a public comment..."
              className="comment-input"
            />
            <button type="submit" className="comment-submit-btn" disabled={!newComment.trim()}>
              <Send size={18} />
            </button>
          </div>
        </form>
      ) : (
        <div className="comment-login-prompt">
          <p>Please log in to leave a comment.</p>
        </div>
      )}

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              {comment.userAvatar ? (
                <img src={comment.userAvatar} alt={comment.userName} className="comment-avatar-small" />
              ) : (
                <User size={32} className="comment-avatar-placeholder" />
              )}
              <div className="comment-content">
                <strong className="comment-name">{comment.userName}</strong>
                <p className="comment-text">{comment.content}</p>
                <small className="comment-date">{new Date(comment.createdAt).toLocaleString()}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
