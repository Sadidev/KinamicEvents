import Event from "./Event";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Events = ({events, user, url}) => {

  const navigate = useNavigate()

  const logout = () => {
    navigate("/")
  }

  const[message, setMessage] = useState({username:''})

  const addAttendance = async(id, message) => {
    const res = await fetch(`${url}/${id}/going`, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(message)
    })
  }

  const handleAssistance = (id, attendance) => {
    setMessage({username: `${user} is going`})
    if(attendance){
      addAttendance(id, message)
    }
  }

  return (
    <section>
      <header>
        <button className="btn" onClick={logout}>logout</button>
        <h4>{user}</h4>
      </header>
      <div className="title">
        <h2>Kinamic Events</h2>
        <div className="underline" />
        <h4>Upcoming events</h4>
      </div>
      <div>
        {events.map((event) => {
        return <Event key={event.id}  {...event} handleAssistance={handleAssistance}/>
        }
        )}
      </div>
    </section>
  );
}

export default Events