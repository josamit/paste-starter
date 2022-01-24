import * as React from "react";
import { renderComponent } from "@src/utils/test-utils";
import SiteHeaderEnvBadge from "@site/site-header/SiteHeaderEnvBadge";
import * as useWindowObjectHook from "@hooks/useWindowObject";

describe("<SiteHeaderEnvBadge />", () => {
  it("should render correctly for dev env", async () => {
    jest
      .spyOn(useWindowObjectHook, "useWindowObject")
      .mockImplementation(() => ({
        environment: "dev",
        username: "test",
        email: "test@test.com",
      }));

    const { container } = renderComponent(<SiteHeaderEnvBadge />);

    expect(container).toMatchSnapshot();
  });
  it("should render correctly for stage env", async () => {
    jest
      .spyOn(useWindowObjectHook, "useWindowObject")
      .mockImplementation(() => ({
        environment: "stage",
        username: "test",
        email: "test@test.com",
      }));

    const { container } = renderComponent(<SiteHeaderEnvBadge />);

    expect(container).toMatchSnapshot();
  });
  it("should render correctly for prod env", async () => {
    jest
      .spyOn(useWindowObjectHook, "useWindowObject")
      .mockImplementation(() => ({
        environment: "prod",
        username: "test",
        email: "test@test.com",
      }));

    const { container } = renderComponent(<SiteHeaderEnvBadge />);

    expect(container).toMatchSnapshot();
  });
});
