import { render, screen } from "@testing-library/react";
import Header from "@/components/header/Header";

describe("Header", () => {
  it("renders correctly", () => {
    render(<Header />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
});
