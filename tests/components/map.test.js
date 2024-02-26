import Map from "@/components/map/Map";
import { render, screen } from "@testing-library/react";

describe("Map", () => {
  it("renders correctly", () => {
    render(<Map />);
    expect(screen.getByTestId("google-maps")).toBeInTheDocument();
  });
  it("renders map object", () => {
    render(<Map />);
    const mapObject = screen.getByTestId("google-maps");
    expect(mapObject).toBeInstanceOf(HTMLDivElement);
  });
});
