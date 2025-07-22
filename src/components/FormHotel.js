import Checkbox from "./Checkbox.js";
import { getAmenities, createHotel, editHotel } from "../api/HotelApi.js";
import { useState, useEffect } from 'react';
import Button from "./Button.js";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

function FormHotel(props) {
    const [allAmenities, setAmenities] = useState([]);
    const [errorMessage, setErrorMessage] = useState([]);

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

    function headingText(formType) {
        let text = 'Click';

        switch(formType) {
            case 'create':
                text = 'Create new hotel';
                break;

            case 'edit':
                text = 'Update hotel data';
                break;
        }

        return text;
    }

    
    function classes(formType) {
        let classes = 'form-horizontal hotel-form d-flex flex-column gap-3 ';

        switch(formType) {
            case 'create':
                classes += 'form-create border p-3 mb-3 rounded m-2';
                break;

            case 'edit':
                classes += 'form-edit';
                break;
        }

        return classes;
    }


    function getFormData(formType, targetButton) {
        const form = targetButton.closest('.hotel-form');
        const hotelNameInput = form.querySelector('input[type="text"]');
        const checkboxes = form.querySelectorAll('.checkbox input');

        let amenities = [];
        let hotelFormId = null;

        if (formType === 'edit') {
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

    function clearForm() {
        const form = document.querySelector('.hotel-form.form-create');
        const hotelNameInput = form.querySelector('#hotelName');
        const checkboxes = form.querySelectorAll('.checkbox input');

        hotelNameInput.value = '';
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        })

        setErrorMessage('');
        props.refreshFn();
    }

    async function buttonFormAction(clickedButton, formType) {
        const formData = getFormData(formType, clickedButton);
        const errorHandler = document.querySelector('.form-error-handler');
        const editFormHolder = clickedButton.closest('.edit-form-holder');

        switch(formType) {
            case 'create':
                const res = await createHotel(formData);

                (res['@type'] != 'Error') ? clearForm() : setErrorMessage(res.detail);

                ['alert', 'alert-warning', 'mt-3'].forEach(cls =>
                    errorHandler.classList.toggle(cls, res['@type'] === 'Error')
                );

                break;

            case 'edit':
                await editHotel(formData);
                if (editFormHolder.classList.contains('edit-form-expanded')) editFormHolder.classList.remove('edit-form-expanded');
                await props.refreshFn();
                break;
        }
    }

    return (
        <Form className={classes(props.formType)}>

            <div className="form-heading">
                <h4>{headingText(props.formType)}</h4>
            </div>

            <Form.Group className="hotel-name-holder">
                <label htmlFor="hotelName" className="control-label">Hotel name</label>
                <Col sm="8">
                    <input type="text" className="form-control" id="hotelName" defaultValue={props.hotelData ? props.hotelData.name : ""} />
                </Col>
            </Form.Group>

            <Form.Group className="amenities-holder d-flex flex-wrap">
                {allAmenities.map(amenity => (
                    <Col xs="6" key={amenity['id']}>
                        <Checkbox amenityId={amenity['@id']} name={amenity['name']} checked={amenity['checked'] || false} />
                    </Col>
                ))}
            </Form.Group>

            <Form.Group>
                <Col sm="10">
                    <Button onClickAction={(e) => {buttonFormAction(e.target, props.formType)}} text={btnText(props.formType)} />
                </Col>
                <Col className="form-error-handler">{errorMessage}</Col>
            </Form.Group>

        </Form>
    )
}

export default FormHotel;