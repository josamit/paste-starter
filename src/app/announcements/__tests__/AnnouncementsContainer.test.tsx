import * as React from "react";
import { renderComponent } from "@src/utils/test-utils";
import AnnouncementsContainer from "@app/announcements/AnnouncementsContainer";
import { announcements } from "@app/announcements/types/announcements";

describe("<AnnouncementsContainer />", () => {
  it("should render correctly", async () => {
    const { container, getByText, getByTestId } = renderComponent(
      <AnnouncementsContainer presetAnnouncements={announcements} />
    );

    getByText("If you are using this page for a compliance audit, please");
    getByText("DO NOT MODIFY OR DELETE");

    expect(
      container.querySelector('a[href="mailto:product-compliance@twilio.com"]')
    ).not.toBeNull();

    expect(container).toMatchSnapshot();
  });
});
