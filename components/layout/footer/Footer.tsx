import MetaNavigation from "./MetaNavigation";

const Footer = () => {
  return (
    <footer className="py-3 px-5  border-t border-gray-200 bg-white flex justify-center sm:justify-between items-center flex-wrap">
      <p className="text-[12px] w-full text-center sm:w-auto sm:text-start order-2 sm:order-1">
        @ 2025 E-SEO TEAM | All right reserved.
      </p>
      <MetaNavigation />
    </footer>
  );
};

export default Footer;
