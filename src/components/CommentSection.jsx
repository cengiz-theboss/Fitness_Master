import { useState, useEffect } from 'react';
import { Send, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase';
import './CommentSection.css';

const CommentSection = ({ videoId }) => {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial comments
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('video_id', videoId)
        .order('created_at', { ascending: true });
      
      if (!error) setComments(data);
      setLoading(false);
    };

    fetchComments();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel(`comments:${videoId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'comments',
        filter: `video_id=eq.${videoId}`
      }, (payload) => {
        setComments(prev => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    const commentData = {
      video_id: videoId,
      user_id: currentUser.id,
      user_name: currentUser.user_metadata?.full_name || 'Athlete',
      user_avatar: currentUser.user_metadata?.avatar_url || null,
      content: newComment,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('comments').insert([commentData]);

    if (error) {
      console.error('Error adding comment:', error.message);
      alert("Failed to add comment. Make sure your Supabase table 'comments' exists.");
    } else {
      setNewComment('');
    }
  };

  return (
    <div className="comment-section">
      <h3 className="comments-title">Comments ({comments.length})</h3>
      
      {currentUser ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          {currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="Profile" className="comment-avatar" />
          ) : (
            <UserCircle size={40} className="comment-avatar-placeholder" />
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
          <p className="no-comments">No comments yet. Be the first to start the discussion!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment">
              {comment.userPhoto ? (
                <img src={comment.userPhoto} alt={comment.userName} className="comment-avatar" />
              ) : (
                <UserCircle size={40} className="comment-avatar-placeholder" />
              )}
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-author">{comment.userName}</span>
                  <span className="comment-date">
                    {comment.createdAt ? new Date(comment.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                  </span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
