import { useState, useEffect } from 'react';
import { Calendar, Bell, Dumbbell, Home, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Schedule.css';

const Schedule = () => {
  const { currentUser } = useAuth();
  const [schedule, setSchedule] = useState({
    Monday: 'Rest',
    Tuesday: 'Rest',
    Wednesday: 'Rest',
    Thursday: 'Rest',
    Friday: 'Rest',
    Saturday: 'Rest',
    Sunday: 'Rest'
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const workoutTypes = [
    { id: 'Gym', icon: <Dumbbell size={20} />, color: 'var(--accent-primary)' },
    { id: 'Home', icon: <Home size={20} />, color: 'var(--accent-secondary)' },
    { id: 'Stretching', icon: <Sparkles size={20} />, color: 'var(--coral)' },
    { id: 'Rest', icon: <CheckCircle2 size={20} />, color: 'var(--text-secondary)' }
  ];

  const handleUpdateDay = (day, type) => {
    setSchedule(prev => ({ ...prev, [day]: type }));
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        new Notification('Notifications Enabled!', {
          body: 'You will now receive reminders for your scheduled workouts.',
          icon: '/logo192.png'
        });
      }
    }
  };

  const saveSchedule = () => {
    // In a real app, this would save to Firestore
    console.log('Saving schedule for', currentUser?.email, schedule);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  if (!currentUser) {
    return (
      <div className="page-container container section text-center">
        <h2 className="section-title">Access Denied</h2>
        <p className="text-secondary">Please sign in with Google to use the Training Schedule feature.</p>
      </div>
    );
  }

  return (
    <div className="page-container container section">
      <div className="schedule-header">
        <div>
          <h1 className="section-title text-gradient">Training Schedule</h1>
          <p className="text-secondary">Plan your week and stay consistent with your goals.</p>
        </div>
        <div className="schedule-actions">
          <button 
            className={`btn-notification ${notificationsEnabled ? 'active' : ''}`}
            onClick={requestNotificationPermission}
          >
            <Bell size={20} />
            {notificationsEnabled ? 'Reminders On' : 'Enable Reminders'}
          </button>
          <button className="btn btn-primary" onClick={saveSchedule}>Save Changes</button>
        </div>
      </div>

      <div className="schedule-grid">
        {days.map(day => (
          <div key={day} className="day-card">
            <h3 className="day-name">{day}</h3>
            <div className="workout-selector">
              {workoutTypes.map(type => (
                <button
                  key={type.id}
                  className={`workout-option ${schedule[day] === type.id ? 'active' : ''}`}
                  onClick={() => handleUpdateDay(day, type.id)}
                  style={{ '--type-color': type.color }}
                >
                  {type.icon}
                  <span>{type.id}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showSavedToast && (
        <div className="toast">
          <CheckCircle2 size={20} />
          <span>Schedule saved successfully!</span>
        </div>
      )}
    </div>
  );
};

export default Schedule;
