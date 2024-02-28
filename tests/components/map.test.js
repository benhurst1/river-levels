import Map from "@/components/map/Map";
import { render, screen } from "@testing-library/react";

describe("Map Component", () => {
  it("renders correctly", () => {
    render(<Map stations={[]} />);
    expect(screen.getByTestId("google-maps")).toBeInTheDocument();
  });
  it("renders map object", () => {
    render(<Map stations={[]} />);
    const mapObject = screen.getByTestId("google-maps");
    expect(mapObject).toBeInstanceOf(HTMLDivElement);
  });

});