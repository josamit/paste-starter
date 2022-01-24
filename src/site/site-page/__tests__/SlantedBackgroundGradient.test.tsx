import * as React from "react";
import { renderComponent } from "@src/utils/test-utils";
import { SlantedBackgroundGradient } from "@site/site-page/SlantedBackgroundGradient";

describe("<SlantedBackgroundGradient />", () => {
  it("should render correctly", async () => {
    const { container } = renderComponent(
      <SlantedBackgroundGradient
        skewAngle={10}
        startColor="colorBackgroundBrandStrong"
        endColor="colorBackgroundBrand"
      >
        <div>Test Component</div>
      </SlantedBackgroundGradient>
    );

    expect(container).toMatchSnapshot();
  });
});
