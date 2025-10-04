export interface GeneralProps {
  children?: React.ReactNode;
  className?: string;
}

export interface InputProps extends GeneralProps {
  id: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface InputRootProps extends GeneralProps {}

export interface LabelProps extends GeneralProps {
  labelText: string;
  htmlFor: string;
}

export interface MainLayoutProps extends GeneralProps {}
