import { MainLayoutProps } from "../../entities/vite-env";

export const MainLayout = ({
  children,
  className,
}: MainLayoutProps): JSX.Element => {
  return (
    <main className={`w-full min-h-screen bg-[#161616] ${className}`}>
      {children}
    </main>
  );
};
