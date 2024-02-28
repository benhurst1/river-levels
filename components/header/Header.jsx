import Navbar from "./Navbar";
import Image from "next/image";

export default function Header() {
  const imageStyle = {
    objectFit: "cover",
    objectPosition: "0% 40%",
    width: "100%",
    height: "100%",
    opacity: 0.75,
  };

  return (
    <header data-testid="header" className="flex flex-col h-[200px] bg-white">
      <div className="relative w-full h-full">
        <Image
          src="/riverbg.jpg"
          fill={true}
          style={imageStyle}
          alt="Canal river with trees and blue sky in the background"
        />
        <div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4 text-white text-6xl "
          style={{ textShadow: "4px 4px 10px #000000" }}
        >
          River Levels
        </div>
      </div>
      <Navbar />
    </header>
  );
}
