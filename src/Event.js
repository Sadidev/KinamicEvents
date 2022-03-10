import { useEffect, useState } from "react"

const Event = ({id, eventName, eventDate, imageUrl, handleAssistance}) => {

  const[attendance, setAttendance] = useState(false);

  useEffect(() => {
    handleAssistance(id, attendance)
  },[attendance])

  const handleClick = () => {
    setAttendance(!attendance)
  }

  return (
    <article className="single-event">
        <img src={imageUrl} alt={eventName} />
        <footer>
            <div className="event-info">
                <h4>{eventName}</h4>
                <h4 className="event-date">{eventDate}</h4>
            </div>
            <button onClick={handleClick} style={attendance ? {background: 'red'} : {background: null}} className="attendance-btn">Going</button>
        </footer>
    </article>
  )
}

export default Event