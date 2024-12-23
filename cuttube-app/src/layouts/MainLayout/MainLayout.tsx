import { GeneralProps } from "../../entities/vite-env";

interface MainLayoutProps extends GeneralProps {}

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
