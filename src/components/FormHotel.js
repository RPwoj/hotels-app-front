import Checkbox from "./Checkbox.js";
import { getAmenities, createHotel, editHotel } from "../api/HotelApi.js";
import { useState, useEffect } from 'react';
import Button from "./Button.js";


function FormHotel(props) {
    const [allAmenities, setAmenities] = useState([]);

    useEffect(() => {
        async function fetchAmenities() {
            const fetchedAmenities =  await getAmenities();
            setAmenities(fetchedAmenities);
        }
        
        fetchAmenities();
    }, []);

    if (props.hotelData) {
        allAmenities.forEach(amenity => {
            const match = props.hotelData.amenities.find(amenityChecked => amenityChecked.name === amenity.name);
            if (match) {
                amenity.checked = true;
            }
        });
    }

    function btnText(formType) {
        let text = 'Click';

        switch(formType) {
            case 'create':
                text = 'Create';
                break;

            case 'edit':
                text = 'Update';
                break;
        }

        return text;
    }


    function getFormData(formType, targetButton) {
        const form = targetButton.closest('.hotel-form');
        const hotelNameInput = form.querySelector('input[type="text"]');
        const checkboxes = form.querySelectorAll('.checkbox input');
        let amenities = [];
        let hotelFormId = null;

        if (formType == 'edit') {
            hotelFormId = form.closest('.hotels-list-el').getAttribute('hotel-id');
        }

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                amenities.push(checkbox.getAttribute('amenityId'));
            }
        })

        let result = {};

        if (hotelFormId) result.hotelId = hotelFormId;
        if (hotelNameInput.value) result.name = hotelNameInput.value;
        if (amenities.length > 0) result.amenities = amenities;

        return result;
    }

    function buttonFormAction(clickedButton, formType) {
        const formData = getFormData(formType, clickedButton);
        switch(formType) {
            case 'create':
                createHotel(formData);
                break;

            case 'edit':
                editHotel(formData);
                break;
        }
    }

    return (
        <form className="form-horizontal hotel-form">
            <div className="form-group hotel-name-holder">
                <label htmlFor="hotelName" className="col-sm-2 control-label">Hotel name</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="hotelName" defaultValue={props.hotelData ? props.hotelData.name : ""} />
                </div>
            </div>
            <div className="form-group amenities-holder d-flex flex-wrap">
                {allAmenities.map(amenity => (
                    <div className="col-sm-offset-2 col-sm-3" key={amenity['id']}>
                        <Checkbox amenityId={amenity['@id']} name={amenity['name']} checked={amenity['checked'] || false} />
                    </div>
                ))}
            </div>
            <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                    <Button onClickAction={(e) => {buttonFormAction(e.target, props.formType)}} text={btnText(props.formType)} />
                </div>
            </div>
        </form>
    )
}

export default FormHotel;