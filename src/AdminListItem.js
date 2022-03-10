
const AdminListItem = ({id, eventName, removeEvent}) => {
  return (
    <div className="admin-list-item">
      <h3>{eventName}</h3>
      <button className="btn" onClick={() => removeEvent(id)}>Remove</button>
    </div>
  )
}

export default AdminListItem