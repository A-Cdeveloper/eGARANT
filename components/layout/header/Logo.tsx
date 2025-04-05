import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image src="/egarant.png" alt="eGarant logo" width={150} height={50} />
    </Link>
  );
};

export default Logo;
