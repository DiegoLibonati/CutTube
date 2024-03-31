import { InputGroupProps } from "../../entities/vite-env";

export const InputGroup = ({
  children,
  className,
}: InputGroupProps): JSX.Element => {
  return <div className={className}>{children}</div>;
};
