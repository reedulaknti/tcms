import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  it("should render Button component correctly", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} label="Click Me" />);
    fireEvent.click(screen.getByText(/click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
