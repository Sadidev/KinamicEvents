import { useState, useReducer } from "react";
import FormInstance from "./FormInstance";
import Modal from "./Modal";
import AdminListItem from "./AdminListItem";
import { BiRefresh } from 'react-icons/bi';

const AdminPage = ({events, url}) => {

  const addEvent = async (event, url) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-type': 'application/json'
        },
        body: JSON.stringify(event)
    })
  }

  const removeEvent = async (id) => {
    await fetch(`${url}/${id}`, {
      method: 'DELETE',
    })
  }

  const refreshPage = () => {
    window.location.reload();
  }

  const reducer = (state, action) => {
    if(action.type === 'EMPTYFIELD'){
      return {...state, isModalOpen:true, modalContent: 'Missing input' };
    }
    return state;
  };

  const defaultState = {
    isModalOpen: false,
    modalContent: ''
  };

  const [event,setEvent] = useState({eventName:'', eventDate:'', imageUrl:''});
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setEvent({...event,[name]:value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(event.eventName && event.eventDate){
      addEvent(event, url);
      setEvent({eventName:"", eventDate:"", imageUrl:""});
    }
    else{
      dispatch({type: "EMPTYFIELD"});
    }
  }

  return (
    <article>
      <form className="form">
        {state.isModalOpen && <Modal modalContent={state.modalContent} />}
        <h2>Add Events</h2>
        <FormInstance itype='text' prop={'eventName'} value={event.eventName} onChange={handleChange}/>
        <FormInstance itype='text'prop={'eventDate'} value={event.eventDate} onChange={handleChange}/>
        <FormInstance itype='text'prop={'imageUrl'} value={event.imageUrl} placeholder='(Optional)' onChange={handleChange}/>
        <button type='submit' onClick={handleSubmit}>Add</button>
      </form>
      <div className="eventList">
        <h2>List of events</h2>
        <BiRefresh className="icon-birefresh" onClick={refreshPage}/>
        {events.map((event) => {
          return (
            <AdminListItem key={event.id} id={event.id} eventName={event.eventName} removeEvent={removeEvent} />
          );
        })}
      </div>
    </article>
  );
}

export default AdminPage