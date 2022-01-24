import * as React from "react";
import { renderComponent } from "@src/utils/test-utils";
import AnnouncementAlert from "@app/announcements/AnnouncementAlert";

describe("<AnnouncementAlert />", () => {
  it("should render correctly", async () => {
    const mockOnDismiss = jest.fn();
    const { container } = renderComponent(
      <AnnouncementAlert
        isVisible
        id="test_alert"
        variant="warning"
        onDismiss={mockOnDismiss}
        content="[link](https://test.url)<em>test</em>some random text"
      />
    );

    expect(
      container.querySelector('a[href="https://test.url"]')
    ).not.toBeNull();
    expect(container).toMatchSnapshot();
  });
});
