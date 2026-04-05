import { LabelProps } from "@/types/props";

const Label = ({ labelText, htmlFor, className }: LabelProps) => {
  return (
    <label className={className} htmlFor={htmlFor}>
      {labelText}
    </label>
  );
};

export default Label;
