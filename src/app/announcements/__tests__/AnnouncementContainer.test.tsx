import * as React from "react";
import { renderComponent } from "@src/utils/test-utils";
import AnnouncementContainer from "@app/announcements/AnnouncementContainer";

describe("<AnnouncementContainer />", () => {
  it("should render correctly", async () => {
    const { container, getByTestId, getByText } = renderComponent(
      <AnnouncementContainer
        content="[link](https://test.url)<em>test</em>some random text"
        variant="warning"
        can_be_dismissed={false}
        id="test-announcement"
        valid_from="2021-01-01T00:00:00Z"
        valid_until="2099-01-01T00:00:00Z"
      />
    );

    getByText("some random text");

    expect(container).toMatchSnapshot();
  });
});
