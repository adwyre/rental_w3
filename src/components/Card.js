import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const Card = ({car, account, rent, provider, updated, setUpdated}) => {

  const[carAvailable, setCarAvailable] = useState(true)

  const fetchCarData = async () => {
    const available = await rent.carAvailable(car.id)
    setCarAvailable(available)
  }

  const handleCheckOut = async () => {
    const signer = await provider.getSigner()
    // checkout car
    let transaction = await rent.connect(signer).checkOut()
    await transaction.wait()
    // set car availability
    setCarAvailable(false)
    setUpdated(!updated)
  }

  const handleCheckIn = async () => {
    const signer = await provider.getSigner()
    // checkout car
    let transaction = await rent.connect(signer).checkIn()
    await transaction.wait()
    // set car availability
    setCarAvailable(true)
    setUpdated(!updated)
  }

  useEffect(() => {
    fetchCarData()
  }, [carAvailable])


  return (
    <div className="card">
      <div className="crop">
         <img src={car.image}></img>
      </div>
      <div className="card-body">
        <p className="card-text">{car.name}</p>
        <p className="card-text">Color: {car.color}</p>
        <p className="card-text">Type: {car.type}</p>
        <div className="card-buttons">
          <button type="button" className="button check-out" onClick={handleCheckOut}>Check-out</button>
          <button type="button" className="button check-in" onClick={handleCheckIn}>Check-in</button>
        </div>
      </div>
    </div>
  );
}

export default Card;