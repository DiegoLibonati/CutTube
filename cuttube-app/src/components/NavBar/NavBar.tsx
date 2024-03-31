import { BsFilm } from "react-icons/bs";

export const NavBar = (): JSX.Element => {
  return (
    <header className="flex flex-row items-center justify-between w-full fixed bottom-0 bg-[#F31B11] p-2">
      <div className="flex items-center justify-center h-10 w-10 bg-black rounded-full">
        <BsFilm fontSize={18} className="fill-white cursor-pointer"></BsFilm>
      </div>
    </header>
  );
};
