import React from "react";
import { useFetch } from "./useFetch";
import Loading from "./Loading";
import Error from "./Error";
import Pages from "./Pages";

const url = 'http://localhost:5000/events'

function App() {

  const { loading, events, error } = useFetch(url) 

  if(loading){ 
  return (
    <main>
      <Loading />
    </main>
  );
  }
  if(error){
    return (
      <main>
        <Error />
      </main>
    );
  }
  return(
    <main>
      <Pages events={events} url={url}/>
    </main>
  );
}

export default App;
