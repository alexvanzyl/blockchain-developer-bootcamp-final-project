import Link from "next/link";

const Logo = (): JSX.Element => {
  return (
    <>
      <Link href="/">
        <a>
          <span className="block lg:hidden text-3xl">&#127793;</span>
        </a>
      </Link>
      <Link href="/">
        <a>
          <span className="hidden lg:block text-2xl">S&#127793;&#127793;D</span>
        </a>
      </Link>
    </>
  );
};

export default Logo;
