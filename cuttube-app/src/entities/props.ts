export interface DefaultProps {
  children?: React.ReactNode;
  className?: string;
}

export interface InputProps extends DefaultProps {
  id: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface InputRootProps extends DefaultProps {}

export interface LabelProps extends DefaultProps {
  labelText: string;
  htmlFor: string;
}

export interface MainLayoutProps extends DefaultProps {}
