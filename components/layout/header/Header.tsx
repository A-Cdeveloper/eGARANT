import Logo from "./Logo";
import UserArea from "./UserArea";

const Header = () => {
  return (
    <header className="bg-white fixed top-0 left-0 right-0 h-[60px] border-b border-gray-200 flex justify-between items-center px-3">
      <Logo />
      <UserArea />
    </header>
  );
};

export default Header;
