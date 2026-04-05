import { InputProps } from "@/types/props";

const Input = ({ id, type, className, placeholder, value, name, onChange }: InputProps) => {
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

export default Input;
