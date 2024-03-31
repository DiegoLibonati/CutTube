import { LabelProps } from "../../entities/vite-env";

export const Label = ({ labelText, className }: LabelProps): JSX.Element => {
  return (
    <label className={className}>{labelText}</label>
  );
};
