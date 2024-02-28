import Link from "next/link";

export default function Navbar() {
  const routes = [
    { name: "Home", path: "/" },
    { name: "Map", path: "/map" },
  ];

  return (
    <nav
      data-testid="navbar"
      className="bg-blue-200 text-black flex justify-center gap-2 h-20 shadow-xl"
    >
      {routes.map((route) => (
        <Link
          key={route.path}
          href={route.path}
          className="p-3 w-[80px] h-12 bg-blue-300 text-center my-auto rounded-lg hover:bg-blue-400 transition-colors duration-300 ease-in-out"
        >
          {route.name}
        </Link>
      ))}
    </nav>
  );
}
