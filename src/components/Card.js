

const Card = ({car}) => {

  return (
    <div className="card">
      <div className="crop">
         <img src={car.image}></img>
      </div>
      <div className="card-body">
        <p className="card-text">{car.name}</p>
        <p className="card-text">{car.color}</p>
        <p className="card-text">{car.type}</p>
        <div className="card-buttons">
          <button type="button" class="button check-out">Check-out</button>
          <button type="button" class="button check-in">Check-in</button>
        </div>
      </div>
    </div>
  );
}

export default Card;