

const Card = () => {

  return (
    <div className="card">
      <img></img>
      <div className="card-body">
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <div className="card-buttons">
          <button type="button" class="button check-out">Check-out</button>
          <button type="button" class="button check-in">Check-in</button>
        </div>
      </div>
    </div>
  );
}

export default Card;