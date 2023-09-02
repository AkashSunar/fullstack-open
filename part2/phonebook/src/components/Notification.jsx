const Notification = ({ message, action }) => {
    return message ? <div className={action === 'added' ? "update" : "deleted"}>{message} {console.log(action)}</div> : null;
}
export default Notification;