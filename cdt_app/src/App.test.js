import React from "react";
import {render} from "@testing-library/react";
import App from "./App";

test("Displays headers and buttons and inputs", () => {
  const {getByText, getAllByPlaceholderText} = render(<App />);
  getByText("Count Down Timer");
  getByText("Lap Timer");
  getByText("start");
  getByText("pause");
  getByText("resume");
  getByText("reset");
  getAllByPlaceholderText("hours");
  getAllByPlaceholderText("minutes");
  getAllByPlaceholderText("seconds");
});
