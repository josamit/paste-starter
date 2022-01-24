import * as React from "react";
import { renderComponent } from "@src/utils/test-utils";
import { SiteHeaderMobile } from "@site/site-header/SiteHeaderMobile";
import { act, fireEvent } from "@testing-library/react";

describe("<SiteHeaderMobile />", () => {
  it("should render correctly", async () => {
    const { container } = renderComponent(<SiteHeaderMobile />);

    expect(container).toMatchSnapshot();
  });

  it("should be able to open and close main mobile navigation", async () => {
    const { container, getByTestId } = renderComponent(<SiteHeaderMobile />);

    await act(() => {
      fireEvent.click(getByTestId("open_main_navigation"));
    });

    expect(container).toMatchSnapshot("mobile main nav open");

    await act(() => {
      fireEvent.click(getByTestId("close_main_navigation"));
    });

    expect(container).toMatchSnapshot("mobile main nav close");
  });

  it("should be able to open and close mobile navigation", async () => {
    const { container, getByText } = renderComponent(<SiteHeaderMobile />);

    await act(() => {
      fireEvent.click(getByText("Search by Account SID (ACxxx)"));
    });

    expect(container).toMatchSnapshot("mobile nav open");

    await act(() => {
      fireEvent.click(getByText("Close Search"));
    });

    expect(container).toMatchSnapshot("mobile nav closed");
  });
});
