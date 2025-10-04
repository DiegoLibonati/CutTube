import { MainLayoutProps } from "@src/entities/props";

export const MainLayout = ({
  children,
  className,
}: MainLayoutProps): JSX.Element => {
  return (
    <main className={`w-full min-h-screen bg-primary ${className}`}>
      {children}
    </main>
  );
};
