const Notification = ({ message }) => {
    return message ? <div className="update">{message}</div> : null;
}
export default Notification;