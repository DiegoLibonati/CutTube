import { BsFilm } from "react-icons/bs";

export const SideNav = (): JSX.Element => {
  return (
    <aside className="flex flex-col h-screen w-[12.5rem] bg-[#F31B11] p-2">
      <button
        className="flex items-center justify-start w-full p-3 bg-black rounded-full cursor-pointer"
        type="button"
        aria-label="create clip"
      >
        <BsFilm fontSize={18} className="fill-white"></BsFilm>
        <p className="ml-2 text-white font-semibold">Create clip</p>
      </button>
    </aside>
  );
};
