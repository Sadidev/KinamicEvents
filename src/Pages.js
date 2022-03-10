import { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "./UserLogin";
import AdminPage from "./AdminPage";
import Events from "./Events";
import NoEvents from "./NoEvents";

const Pages = ({events, url}) => {

  const [user,setUser] = useState("guest");

  const loggedUser = (name) => {
    setUser(name)
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/eventspage"
          element=
            {events.length === 0 ?
              <NoEvents /> :
              <Events events={events} user={user} url={url} />
            }
        />
        <Route path="/adminpage" element={<AdminPage events={events} url={url}/>}/>
        <Route path="/" element={<UserLogin loggedUser={loggedUser}/>} />
      </Routes>
    </Router>
  );
}

export default Pages