import Link from "next/link";

export default function Navbar() {
  return (
    <nav data-testid="navbar">
      <Link href={"/"}>Home</Link>
      <Link href={"/map"}>Map</Link>
    </nav>
  );
}
