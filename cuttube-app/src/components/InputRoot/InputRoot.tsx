import { GeneralProps } from "../../entities/vite-env";

interface InputRootProps extends GeneralProps {}

export const InputRoot = ({
  children,
  className,
}: InputRootProps): JSX.Element => {
  return <div className={className}>{children}</div>;
};
