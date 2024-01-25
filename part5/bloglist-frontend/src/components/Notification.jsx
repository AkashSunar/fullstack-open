import React from 'react';
import "./blog.css";

const Notification = ({notification,statusCode}) => {
  return (
    <div className={statusCode===201?"notification_green":"notification_red"}>
          <h2>{notification}</h2>
    </div>
  );
}

export default Notification;
