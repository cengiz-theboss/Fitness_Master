import { useState, useEffect, useRef } from 'react';
import { Calendar, Bell, Dumbbell, Home, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Schedule.css';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const initialSchedule = {
  Monday: 'Rest',
  Tuesday: 'Rest',
  Wednesday: 'Rest',
  Thursday: 'Rest',
  Friday: 'Rest',
  Saturday: 'Rest',
  Sunday: 'Rest'
};
const initialScheduleTimes = {
  Monday: '08:00',
  Tuesday: '08:00',
  Wednesday: '08:00',
  Thursday: '08:00',
  Friday: '08:00',
  Saturday: '08:00',
  Sunday: '08:00'
};

const workoutTypes = [
  { id: 'Gym', icon: <Dumbbell size={20} />, color: 'var(--accent-primary)' },
  { id: 'Home', icon: <Home size={20} />, color: 'var(--accent-secondary)' },
  { id: 'Stretching', icon: <Sparkles size={20} />, color: 'var(--coral)' },
  { id: 'Rest', icon: <CheckCircle2 size={20} />, color: 'var(--text-secondary)' }
];

const padTime = (value) => String(value).padStart(2, '0');

const Schedule = () => {
  const { currentUser } = useAuth();
  const [schedule, setSchedule] = useState(initialSchedule);
  const [scheduleTimes, setScheduleTimes] = useState(initialScheduleTimes);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState('default');
  const notifiedEvents = useRef({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedSchedule = localStorage.getItem('fitnessmaster-schedule');
    const storedTimes = localStorage.getItem('fitnessmaster-schedule-times');
    const storedNotification = localStorage.getItem('fitnessmaster-schedule-notifications');

    if (storedSchedule) {
      try {
        setSchedule(JSON.parse(storedSchedule));
      } catch (error) {
        console.error('Failed to parse saved schedule', error);
      }
    }

    if (storedTimes) {
      try {
        setScheduleTimes(JSON.parse(storedTimes));
      } catch (error) {
        console.error('Failed to parse saved schedule times', error);
      }
    }

    if (storedNotification === 'true') {
      setNotificationsEnabled(true);
    }

    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    if (!notificationsEnabled || typeof window === 'undefined') return;
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    const checkForNotification = () => {
      const now = new Date();
      const currentDay = dayNames[now.getDay()];
      const currentTime = `${padTime(now.getHours())}:${padTime(now.getMinutes())}`;
      const workout = schedule[currentDay];
      const scheduledTime = scheduleTimes[currentDay];

      if (workout && workout !== 'Rest' && scheduledTime === currentTime) {
        const eventKey = `${currentDay}-${currentTime}-${workout}`;
        if (!notifiedEvents.current[eventKey]) {
          new Notification('Workout Reminder', {
            body: `It's ${currentTime}. Time for your ${workout} session on ${currentDay}.`,
            icon: '/logo192.png'
          });
          notifiedEvents.current[eventKey] = true;
        }
      }
    };

    const intervalId = setInterval(checkForNotification, 15000);
    checkForNotification();

    return () => {
      clearInterval(intervalId);
    };
  }, [notificationsEnabled, schedule, scheduleTimes]);

  const handleUpdateDay = (day, type) => {
    setSchedule(prev => ({ ...prev, [day]: type }));
  };

  const handleUpdateTime = (day, time) => {
    setScheduleTimes(prev => ({ ...prev, [day]: time }));
  };

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) return;

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);

    if (permission === 'granted') {
      setNotificationsEnabled(true);
      new Notification('Notifications Enabled!', {
        body: 'You will now receive reminders for your scheduled workouts.',
        icon: '/logo192.png'
      });
    } else {
      setNotificationsEnabled(false);
      alert('Please allow notifications in your browser settings to receive workout reminders.');
    }
  };

  const saveSchedule = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitnessmaster-schedule', JSON.stringify(schedule));
      localStorage.setItem('fitnessmaster-schedule-times', JSON.stringify(scheduleTimes));
      localStorage.setItem('fitnessmaster-schedule-notifications', String(notificationsEnabled));
    }
    console.log('Saving schedule for', currentUser?.email, schedule, scheduleTimes);
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
          <p className="text-secondary">
            Plan your week, choose exact workout times, and receive reminders at the scheduled moment.
          </p>
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

      <p className="notification-note">
        Exact reminder delivery works when browser notifications are allowed. On mobile devices, allow notifications and keep the browser open or in the background for the message to appear.
      </p>

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
            <div className="time-field">
              <label htmlFor={`${day}-time`}>Reminder time</label>
              <input
                id={`${day}-time`}
                type="time"
                value={scheduleTimes[day]}
                onChange={(e) => handleUpdateTime(day, e.target.value)}
              />
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
