import SearchBar from "../components/SearchBar";
import { screen, render } from "@testing-library/react";

test("Check SearchBar component renders successfully", () => {
  render(<SearchBar />);
  const element = screen.getByTestId("search-bar");
  expect(element).toBeInTheDocument();
});
