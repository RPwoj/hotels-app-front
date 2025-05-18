function Button(props) {
    return (
        <span className="btn btn-primary" onClick={props.onClickAction}>{props.text}</span>
    )
}

export default Button;