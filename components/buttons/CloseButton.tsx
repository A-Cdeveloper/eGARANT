const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <span
      className=" bg-red-500 text-white w-5 h-5 absolute top-0 right-0 cursor-pointer rounded-full text-center 
      flex items-center justify-center text-[22px] leading-[22px] font-bold"
      onClick={onClick}
    >
      &times;
    </span>
  );
};

export default CloseButton;
