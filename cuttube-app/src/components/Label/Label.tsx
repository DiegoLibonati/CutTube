import { LabelProps } from "@src/entities/props";

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
