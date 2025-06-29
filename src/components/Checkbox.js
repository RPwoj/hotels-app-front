function Checkbox(props) {

    return (
        <div className="checkbox d-block" >
            <label>
                <input className="pr-1" type="checkbox" value="" amenityId={props.amenityId} defaultChecked={props.checked} defaultValue={props.id}/>
                {props.name}
            </label>
        </div>
    )
}

export default Checkbox;