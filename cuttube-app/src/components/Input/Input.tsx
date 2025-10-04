import { InputProps } from "@src/entities/props";

export const Input = ({
  id,
  type,
  className,
  placeholder,
  value,
  name,
  onChange,
}: InputProps): JSX.Element => {
  return (
    <input
      id={id}
      type={type}
      className={className}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    ></input>
  );
};
