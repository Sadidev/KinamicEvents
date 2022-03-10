
const NoEvents = ({fetchEvents}) => {
  return (
    <div className="title">
        <h2>No upcoming events</h2>
            <button className="btn" onClick={() => fetchEvents()} >
            refresh
        </button>
    </div>
  );
}

export default NoEvents