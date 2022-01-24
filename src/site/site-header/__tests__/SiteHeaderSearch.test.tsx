import * as React from "react";
import { renderComponent } from "@src/utils/test-utils";
import { SiteHeaderSearch } from "@site/site-header/SiteHeaderSearch";
import { act, fireEvent, waitFor } from "@testing-library/react";

describe("<SiteHeaderSearch />", () => {
  it("should render correctly", async () => {
    const { container } = renderComponent(<SiteHeaderSearch />);

    expect(container).toMatchSnapshot();
  });

  it("should be able to set the account sid correctly", async () => {
    const mockSetQueryParams = jest.fn();
    const { container, getByTestId } = renderComponent(<SiteHeaderSearch />, {
      setQueryParams: mockSetQueryParams,
    });

    await act(() => {
      fireEvent.input(getByTestId("site_header_search_input"), {
        target: { value: "ACyyy" },
      });
    });

    await act(() => {
      fireEvent.click(getByTestId("site_header_search_btn"));
    });

    await waitFor(() => {
      expect(mockSetQueryParams).toHaveBeenNthCalledWith(1, "/route/1", {
        accountSid: "ACyyy",
      });
    });
  });
});
