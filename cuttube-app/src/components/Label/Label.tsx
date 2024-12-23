import { GeneralProps } from "../../entities/vite-env";

interface LabelProps extends GeneralProps {
  labelText: string;
  htmlFor: string;
}

export const Label = ({
  labelText,
  htmlFor,
  className,
}: LabelProps): JSX.Element => {
  return (
    <label className={className} htmlFor={htmlFor}>
      {labelText}
    </label>
  );
};
