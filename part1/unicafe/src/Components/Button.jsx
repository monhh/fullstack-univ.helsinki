const Button = (props) => (

    <button onClick={() => props.setStateVar(props.stateVar + 1)}>
		{props.text}
    </button>
)
export default Button
