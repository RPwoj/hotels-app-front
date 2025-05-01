import { getHotels } from "../api/HotelApi.js";
import { useState, useEffect } from 'react';
import Label from "./Label.js";


function ListEl(props) {
  return (
    <div hotelId={props.id} className="hotels-list-el row d-flex flex-column flex-md-row p-3 rounded shadow-sm">
      <div className="col">
        <h2 className="font-weight-bold">{props.name}</h2>
      </div>
      <div className="col d-flex align-items-center flex-wrap gap-1">
        {props.amenities.map(amenity => (
            <Label text={amenity['name']} />
          ))}
      </div>
      <div className="col-12 col-md-2 d-flex flex-column gap-1">
        <button type="button" class="btn btn-primary">Primary</button>
        <button type="button" class="btn btn-primary">Primary</button>
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
    <div className="hotels-list d-flex flex-column gap-2">
         {data.map(hotel => (
          <ListEl name={hotel['name']} id={hotel['id']} amenities={hotel['amenities']} key={hotel['id']} />
        ))}
    </div>
  );
}

export default HotelsList;
