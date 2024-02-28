import { render, screen } from "@testing-library/react";
import Navbar from "@/components/header/Navbar";

describe("Navbar", () => {
  it("renders correctly", () => {
    render(<Navbar />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });
  it("renders map text", () => {
    render(<Navbar />);
    expect(screen.getByText("Map")).toBeInTheDocument();
  });
  it("renders map link with correct href", () => {
    render(<Navbar />);
    expect(screen.getByText("Map").closest("a")).toHaveAttribute(
      "href",
      "/map"
    );
  });
  it("renders home text", () => {
    render(<Navbar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
  it("renders home link with correct href", () => {
    render(<Navbar />);
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
  });
});
