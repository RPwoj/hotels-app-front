import { getHotels } from "../api/HotelApi.js";
import { useState, useEffect } from 'react';
import Label from "./Label.js";
import Button from "./Button.js";
import FormHotel from "./FormHotel.js";
import { getHotelInfo, deleteHotel } from "../api/HotelApi.js";
import { createRoot } from 'react-dom/client';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

async function editHotel(e) {
  const listEl = e.target.closest('.hotels-list-el');
  const hotelId = listEl.getAttribute('hotel-id');
  const editFormHolder = listEl.querySelector('.edit-form-holder');

  try {
      if (!listEl.classList.contains('edit-active')) {
          const hotelInfo = await getHotelInfo(hotelId);
          const root = createRoot(editFormHolder);
          root.render(<FormHotel formType="edit" hotelData={hotelInfo} />);
          listEl.classList.add('edit-active');
          editFormHolder.classList.add('edit-form-expanded');
      } else {
          editFormHolder.classList.toggle('edit-form-expanded');
      }
  } catch (error) {
      console.error("Failed to fetch hotel info:", error);
  }
}

async function removeHotel(e, refreshFn) {
  const listEl = e.target.closest('.hotels-list-el');
  const hotelId = listEl.getAttribute('hotel-id');

  try {
      await deleteHotel(hotelId);
      refreshFn();
  } catch (error) {
      console.error("Failed to fetch hotel info:", error);
  }
}

function ListEl(props) {

  return (
    <Col sm="6" xs="12">
      <div hotel-id={props.id} className="hotels-list-el d-flex flex-column p-3 rounded shadow-sm m-2">
        <Row className="d-flex flex-column gap-3">
          <Col xs="12">
            <div className="img-placeholder"></div>
          </Col>
          <Col>
            <h3 className="font-weight-bold">{props.name}</h3>
          </Col>
          <Col className="d-flex align-items-center flex-wrap gap-1">
            {props.amenities.map(amenity => (
              <Label text={amenity['name']} key={amenity['id']}/>
              ))}
          </Col>
          <Col md="2" className="d-flex align-items-center gap-1">
            <Button onClickAction={editHotel} text="edit" />
            <Button onClickAction={(e) => removeHotel(e, props.refreshFn)} text="delete" />  
          </Col>
        </Row>
        <Row className="edit-form-holder pt-3"></Row>
      </div>
    </Col>
  )
}

function HotelsList(props) {
  const [data, setData] = useState([]);

  // async function refreshData() {
  //     const hotels = await getHotels();
  //     setData(hotels);
  //     console.log(hotels);
  // }

  useEffect(() => {
    async function loadData() {
      if (props.refreshFn) {
        const hotels = await props.refreshFn();
        setData(hotels);
        return data;
      }
    }

    loadData();
  }, []); // include it in deps in case it changes

  // useEffect(() => {
  //     props.refreshFn;
  //     // refreshData();
  // }, []);

  // there is problem
  return (
    <div className="hotels-list d-flex flex-wrap">
         {props.data.map(hotel => (
          <ListEl name={hotel['name']} id={hotel['id']} amenities={hotel['amenities']} refreshFn={props.refreshFn} key={hotel['id']} />
        ))}
    </div>
  );
}

export default HotelsList;
