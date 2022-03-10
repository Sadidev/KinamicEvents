import { useState, useReducer } from "react"
import { useNavigate } from "react-router-dom";
import FormInstance from "./FormInstance";
import Modal from "./Modal";
import { useFetch } from "./useFetch";

const url = 'http://localhost:5000/users'

const UserLogin = ({ loggedUser }) => {
  
  const { events } = useFetch(url)
  const navigate = useNavigate()

  const reducer = (state, action) => {
    if(action.type === 'MISSINGINPUT'){
      return {...state, isModalOpen:true, modalContent: 'Please fill out all the areas' };
    }
    if(action.type === 'USERNOTFOUND'){
      return {...state, isModalOpen:true, modalContent: 'Username/password invalid'};
    }
    return state;
  };

  const defaultState = {
    isModalOpen: false,
    modalContent: ''
  };

  const[user, setUser] = useState({ username:'', password:'' });
  const[state, dispatch] = useReducer(reducer, defaultState);

  const handleChange = (e) => {
    const name  = e.target.name
    const value = e.target.value
    setUser({...user,[name]:value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(user.username && user.password){
      events.forEach(function(event){
        if(event.name === user.username && event.password === user.password){
          loggedUser(event.name)
          {event.name === 'admin' ? navigate("/adminpage") : navigate("eventspage")}
        }
        else{
          dispatch({type: 'USERNOTFOUND'});
        }
      });
      setUser({username:'', password:''});
    }
    else{
      dispatch({type: 'MISSINGINPUT'});
    }
  };

  return (
    <>
      <article>
        {state.isModalOpen && <Modal modalContent={state.modalContent} />}
        <form className= 'form'>
          <h2>User Login</h2>
          <FormInstance itype='text' prop={'username'} value={user.username} onChange={handleChange}/>
          <FormInstance itype='password'prop={'password'} value={user.password} onChange={handleChange}/>
          <button type='submit' onClick={handleSubmit}>login</button>
        </form>
      </article>
    </>
  )
}

export default UserLogin