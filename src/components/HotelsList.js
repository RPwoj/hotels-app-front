import { getHotels } from "../api/HotelApi.js";
import { useState, useEffect } from 'react';
import Label from "./Label.js";
import Button from "./Button.js";


function ListEl(props) {
  return (
    <div hotel-id={props.id} className="hotels-list-el">
      <div className="row d-flex flex-column flex-md-row p-3 gap-1 rounded shadow-sm">
        <div className="col-md-auto">
          <div className="img-placeholder"></div>
        </div>
        <div className="col">
          <h4 className="font-weight-bold">{props.name}</h4>
        </div>
        <div className="col d-flex align-items-center flex-wrap gap-1">
          {props.amenities.map(amenity => (
              <Label text={amenity['name']} key={amenity['id']}/>
            ))}
        </div>
        <div className="col-12 col-md-2 d-flex flex-column gap-1">
          <Button />
        </div>
      </div>
      <div className="row hidden edit-form-holder"></div>
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
