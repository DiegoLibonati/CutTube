import { InputRootProps } from "@src/entities/props";

export const InputRoot = ({
  children,
  className,
}: InputRootProps): JSX.Element => {
  return <div className={className}>{children}</div>;
};
