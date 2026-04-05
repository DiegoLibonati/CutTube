import { MainLayoutProps } from "@/types/props";

const MainLayout = ({ children, className }: MainLayoutProps) => {
  return <main className={`w-full min-h-screen bg-primary ${className}`}>{children}</main>;
};

export default MainLayout;
