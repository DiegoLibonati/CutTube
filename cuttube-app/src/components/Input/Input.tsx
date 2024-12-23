import { GeneralProps } from "../../entities/vite-env";

interface InputProps extends GeneralProps {
  id: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

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
