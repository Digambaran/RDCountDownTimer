import React from "react";
import {render, fireEvent} from "@testing-library/react";
import App from "./App";
describe("Displays headers and buttons and inputs", () => {
  test("Displays Headers", () => {
    const {getByText} = render(<App />);

    getByText("Count Down Timer");
    getByText("Lap Timer");
  });

  test("Displays Buttons", () => {
    const {getByText} = render(<App />);

    getByText("start");
    getByText("pause");
    getByText("resume");
    getByText("reset");
  });

  test("Displays Input boxes", () => {
    const {getAllByPlaceholderText} = render(<App />);

    expect(getAllByPlaceholderText("hours").length).toBe(1);
    expect(getAllByPlaceholderText("minutes").length).toBe(1);
    expect(getAllByPlaceholderText("seconds").length).toBe(1);
  });
});

describe("Input Boxes", () => {
  test("should Update on Entering value", () => {
    const {queryByPlaceholderText} = render(<App />);
    const HrBox = queryByPlaceholderText("hours");
    const MinBox = queryByPlaceholderText("minutes");
    const SecBox = queryByPlaceholderText("seconds");

    fireEvent.change(HrBox, {target: {value: "12"}});
    expect(HrBox.value).toBe("12");

    fireEvent.change(MinBox, {target: {value: "12"}});
    expect(MinBox.value).toBe("12");

    fireEvent.change(SecBox, {target: {value: "12"}});
    expect(SecBox.value).toBe("12");
  });
});
