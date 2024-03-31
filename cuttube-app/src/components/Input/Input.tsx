import { InputProps } from "../../entities/vite-env";

export const Input = ({
  type,
  className,
  placeholder,
  id,
  value,
  name,
  onChange,
}: InputProps): JSX.Element => {
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      id={id}
      value={value}
      name={name}
      onChange={onChange}
    ></input>
  );
};
