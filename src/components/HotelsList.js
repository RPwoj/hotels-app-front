import { getHotels } from "../api/HotelApi.js";
import { useState, useEffect } from 'react';


function ListEl(props) {
  return (
    <div className="row">
      <div className="col">{props.id}</div>
      <div className="col">{props.name}</div>
      <div className="col">
        {props.amenities.map(amenity => (
            <p>{amenity['name']}</p>
          ))}
      </div>
    </div>
  )
}

function HotelsList() {
const [data, setData] = useState([]);

async function refreshData() {
    const hotels = await getHotels();
    setData(hotels);
    console.log(hotels);
}

useEffect(() => {
    refreshData();
}, []);
 

  return (
    <div>
         {data.map(hotel => (
          <ListEl name={hotel['name']} id={hotel['id']} amenities={hotel['amenities']} key={hotel['id']} />
        ))}
    </div>
  );
}

export default HotelsList;
