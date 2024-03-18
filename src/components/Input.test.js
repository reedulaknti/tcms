import React, { useState } from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import Input from "./Input";

function MyInput() {
  const [value, setValue] = useState("");

  const handleChange = (ev) => {
    ev.preventDefault();
    const inputtedValue = ev.currentTarget.value;
    setValue(inputtedValue);
  };

  return <Input value={value} label="my-input" onChange={handleChange} />;
}

const setup = () => {
  const utils = render(<MyInput />);
  const input = screen.getByLabelText("my-input");
  return {
    input,
    ...utils,
  };
};
describe("Input component", () => {
  it("should render Input component correctly", () => {
    const { input } = setup();
    expect(input.value).toBe("");
  });

  it("It should allow letters to be inputted", () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: "Good Day" } });
    expect(input.value).toBe("Good Day");
  });

  it("It should allow numbers to be inputted", () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 23 } });
    expect(input.value).toBe("23");
    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("");
  });
});
