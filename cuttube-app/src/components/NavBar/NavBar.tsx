import { BsFilm } from "react-icons/bs";

const NavBar = () => {
  return (
    <header className="flex flex-row items-center justify-between w-full fixed bottom-0 bg-secondary p-2">
      <div
        className="flex items-center justify-center h-10 w-10 bg-black rounded-full"
        aria-label="CutTube logo"
        role="img"
      >
        <BsFilm className="fill-white text-lg" aria-hidden="true"></BsFilm>
      </div>
    </header>
  );
};

export default NavBar;
