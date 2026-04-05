import { InputRootProps } from "@/types/props";

const InputRoot = ({ children, className }: InputRootProps) => {
  return <div className={className}>{children}</div>;
};

export default InputRoot;
