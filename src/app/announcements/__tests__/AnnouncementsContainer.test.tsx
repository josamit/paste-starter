import * as React from "react";
import { renderComponent } from "@src/utils/test-utils";
import AnnouncementsContainer from "@app/announcements/AnnouncementsContainer";
import { announcements } from "@app/announcements/types/announcements";

describe("<AnnouncementsContainer />", () => {
  it("should render correctly", async () => {
    const { container, getByText } = renderComponent(
      <AnnouncementsContainer presetAnnouncements={announcements} />
    );

    getByText("This is a sample announcement. You can dismiss it safely.");

    expect(container).toMatchSnapshot();
  });
});
