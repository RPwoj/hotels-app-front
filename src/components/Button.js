import Label from "./Label.js";
import { createRoot } from 'react-dom/client';


function Button(props) {

    function editHotel(e) {
        const listEl = e.target.closest('.hotels-list-el');
        const hotelId = listEl.getAttribute('hotelId');
        const editFormHolder = listEl.querySelector('.edit-form-holder');

        if (!listEl.classList.contains('edit-active')) {
            const root = createRoot(editFormHolder)
            root.render(<Label text="expand test"/>)
            listEl.classList.add('edit-active');
            editFormHolder.classList.add('edit-form-expanded');
        } else {
            editFormHolder.classList.toggle('edit-form-expanded');
        }
    }

    return (
        <span className="btn btn-primary" onClick={editHotel}>edit</span>
    )
}

export default Button;