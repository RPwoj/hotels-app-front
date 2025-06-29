import ButtonBootstrap from 'react-bootstrap/Button';

function Button(props) {
    // console.log(props.onClickAction);
    return (
        <ButtonBootstrap variant="outline-dark" onClick={props.onClickAction}>{props.text}</ButtonBootstrap>
    )
}

export default Button;