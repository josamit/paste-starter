import * as React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { MockQueryManagerContext } from "@context/QueryManagerContext";
import { WindowSizeContext } from "@context/WindowSizeProvider";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import { DarkModeContext } from "@context/DarkModeContext";
import ToastsProvider from "@context/ToastsProvider";
import { createGetForm } from "@src/utils/form";
import { Box } from "@twilio-paste/core/dist/box";

export function renderWithFormUtils(...args: Parameters<typeof rtlRender>) {
  const [children, ...restArgs] = args;

  const results = rtlRender(<Box>{children}</Box>, ...restArgs);
  const getForm = createGetForm(results);

  return {
    ...results,
    getForm,
  };
}

const renderComponent = (
  ui: React.ReactElement,
  {
    initialEntry = "/route/1",
    initialRoute = "/route/:appSid",
    queryParams = {
      accountSid: "ACxxx",
      activeTab: "a2pBrandsReconciliation",
    },
    container = undefined,
    mockToggleMode = jest.fn(),
    setQueryParams = jest.fn(),
    ...renderOptions
  } = {}
) => {
  const Wrapper: React.FC = ({ children }) => (
    <MockQueryManagerContext
      value={{
        queryParams,
        setQueryParams,
      }}
    >
      <WindowSizeContext.Provider
        value={{ width: 1400, height: 800, breakpointIndex: 450 }}
      >
        <Theme.Provider theme="default" disableAnimations>
          <DarkModeContext.Provider
            value={{
              theme: "default",
              toggleMode: mockToggleMode,
              componentMounted: true,
            }}
          >
            <ToastsProvider>
              <MemoryRouter initialEntries={[initialEntry]}>
                <Switch>
                  <Route path={initialRoute}>{children}</Route>
                </Switch>
              </MemoryRouter>
            </ToastsProvider>
          </DarkModeContext.Provider>
        </Theme.Provider>
      </WindowSizeContext.Provider>
    </MockQueryManagerContext>
  );

  return renderWithFormUtils(ui, {
    wrapper: Wrapper,
    container,
    ...renderOptions,
  });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderComponent };
