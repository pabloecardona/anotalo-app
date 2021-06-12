const Notification = ({ message }) => {
  if (message !== null) {
    return (
      <span>{message}</span>
    )
  }
  return ('')
}

export { Notification }
