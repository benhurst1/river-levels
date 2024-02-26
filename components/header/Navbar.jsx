import Link from "next/link";

export default function Navbar() {
  return (
    <nav data-testid="navbar">
      <Link href={"/map"}>Map</Link>
    </nav>
  );
}
