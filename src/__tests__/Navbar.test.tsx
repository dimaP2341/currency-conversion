import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import "@testing-library/jest-dom/extend-expect";

describe("Navbar", () => {
  test("renders component", () => {
    render(<Navbar />);
    const rendered = screen.getByText("Currency Converter");
    expect(rendered).toBeInTheDocument();
  });
});
