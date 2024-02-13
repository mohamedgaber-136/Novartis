import React, { useState, useEffect, useContext } from 'react';
import { FireBaseContext } from '../../Context/FireBase';

const Notification = () => {
    const {database} = useContext(FireBaseContext)
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Set up real-time listener for changes in the 'notifications' collection
    const unsubscribe = database.collection('notifications').onSnapshot((snapshot) => {
      const newNotifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(newNotifications);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.EventName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;