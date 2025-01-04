import "./input.css";

const Input = ({
  icon = null,
  handleClick = () => {},
  type = "text",
  name = "",
  handleChange = () => {},
  defaultValue = "",
  disabled = false,
  text = ""
}) => {
  return (
    <div className="input">
      <label>
        {icon && (
          <div className="input_icon" onClick={handleClick}>
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          onChange={handleChange}
          defaultValue={defaultValue}
          disabled={disabled}
          placeholder="&nbsp;"
          autoComplete="off"
        />
        <span>{text}</span>
      </label>
    </div>
  );
};

export default Input;