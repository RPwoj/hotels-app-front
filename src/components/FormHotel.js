import Checkbox from "./Checkbox.js";
import { getAmenities } from "../api/HotelApi.js";
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
    
    if (props.hotelData) {
        allAmenities.forEach(amenity => {
            const match = props.hotelData.amenities.find(amenityChecked => amenityChecked.name === amenity.name);
            if (match) {
                amenity.checked = true;
            }
        });
    }

    return (
        <form className="form-horizontal hotel-edit-form">
            <div className="form-group hotel-name-holder">
                <label htmlFor="hotelName" className="col-sm-2 control-label">Hotel name</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="hotelName" defaultValue={props.hotelData ? props.hotelData.name : ""} />
                </div>
            </div>
            <div className="form-group amenities-holder d-flex flex-wrap">
                {allAmenities.map(amenity => (
                    <div className="col-sm-offset-2 col-sm-3" key={amenity['id']}>
                        <Checkbox name={amenity['name']} checked={amenity['checked'] || false} readOnly />
                    </div>
                ))}
            </div>
            <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                    <Button text={btnText(props.formType)} />
                </div>
            </div>
        </form>
    )
}

export default FormHotel;