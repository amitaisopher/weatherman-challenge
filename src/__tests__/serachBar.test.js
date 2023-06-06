import SearchBar from "../components/SearchBar";
import { screen, render, fireEvent } from "@testing-library/react";

test("Check SearchBar component renders successfully", () => {
  const handleSubmit = jest.fn((e) => e.preventDefault());
  const handleChange = jest.fn();

  render(
    <SearchBar
      inputChangeHandler={handleChange}
      submitSearchHandler={handleSubmit}
      placeholderText="special text goes here"
    />
  );
  const element = screen.getByTestId("search-bar");
  expect(element).toBeInTheDocument();

  const inputField = screen.queryByPlaceholderText("special text goes here");
  // check placeholder text is correct
  expect(inputField).toHaveAttribute("placeholder", "special text goes here");
  // check initial value is an empty string
  expect(inputField).toHaveValue("");
  // change the value of input field
  fireEvent.change(inputField, { target: { value: "Ashdod" } });
  // check change handler function was called
  expect(handleChange).toBeCalledTimes(1);
  // make sure the value of input element match to the value we changed to
  expect(inputField.value).toBe("Ashdod");

  // click on the search button
  const submitButton = screen.getByTestId("submit-button");
  expect(submitButton).toBeInTheDocument();
  // check cubmit handler is called.
  fireEvent.click(submitButton);
  expect(handleSubmit).toBeCalledTimes(1);
});
