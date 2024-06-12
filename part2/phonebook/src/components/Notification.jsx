const Notification = ({ message }) => {
  if (message.message === null) {
    return null
  }
  const notificationStyle = message.isError ? 'error' : 'success'; 
  return (
    <div className={` notification ${notificationStyle}`}>
      {message.message}
    </div>
  )
}
export default Notification