const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <span
      className="block bg-red-500 text-white w-5 h-5 absolute top-0 right-0 cursor-pointer rounded-full text-center text-[22px]/[1] font-bold"
      onClick={onClick}
    >
      &times;
    </span>
  );
};

export default CloseButton;
