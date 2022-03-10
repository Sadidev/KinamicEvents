import { useState, useEffect } from 'react'

export const useFetch = (url) => {
  const [loading,setLoading] = useState(true);
  const [events,setEvents] = useState([]);
  const [error, setError] = useState(false);

  const fetchEvents = async () => {

    try {
      const resp = await fetch(url);
      const events = await resp.json();
      setLoading(false);
      setEvents(events);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, [url])

  return {loading, events, error}
}  


