import { useUiStore } from "../../hooks/useUiStore";

export const Modal = (): JSX.Element => {
  const { modal, handleModal } = useUiStore();

  const handleClickButton: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleModal("", "", "", false);
  };

  return (
    <div className="flex items-center justify-center absolute bg-black bg-opacity-75 w-full h-full">
      <div className="flex flex-col items-center justify-around bg-[#323232] w-[22rem] h-[12.5rem] p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-white">{modal.title}</h2>
        <p className="text-white text-center text-base">{modal.message}</p>
        <button className="text-white rounded-lg bg-black p-2 cursor-pointer" type="button" onClick={handleClickButton}>
          {modal.buttonText}
        </button>
      </div>
    </div>
  );
};
