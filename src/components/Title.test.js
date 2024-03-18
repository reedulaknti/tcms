import { render, screen } from "@testing-library/react";
import Title from "./Title";

describe("Title component", () => {
  it("should render Title component correctly", () => {
    render(<Title label="users" />);
    const usersTitle = screen.queryByText("users");
    expect(usersTitle).toBeInTheDocument();
  });
});
