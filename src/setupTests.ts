const React = require("react");

const silencedMessages = [
  "is a deprecated design token. It will be removed",
  "The enterprise object was not initialized!",
  "Warning: Do not await the result",
  "is missing in the 'defaultValue' prop of either its Controller",
  "axiosWithRetry()",
  "Request failed with status code",
  '"selected" is a blocked prop on this component',
];

const log = global.console.log.bind(console);
const warn = global.console.warn.bind(console);
const error = global.console.error.bind(console);

const shouldShowMessage = (msg: any) => {
  if (typeof msg === "string" && msg.length) {
    return silencedMessages.some((silencedMessage) =>
      msg.includes(silencedMessage)
    );
  }
  return true;
};

global.console.log = function wrappedLog(...args) {
  const [message] = args;
  if (!shouldShowMessage(message)) {
    log(...args);
  }
};

global.console.warn = function wrappedWarning(...args) {
  const [message] = args;
  if (!shouldShowMessage(message)) {
    warn(...args);
  }
};

global.console.error = function wrappedError(...args) {
  const [level, response] = args;
  if (response && !shouldShowMessage(response.message)) {
    error(...args);
  }
};

export default silencedMessages;

const mockDivComponentWithChildren =
  (componentName: any, componentType: "div" | "button" = "div") =>
  // @ts-ignore
  ({ children, ...props }) =>
    React.createElement(
      componentType,
      { ...props, datamockcomponentname: componentName },
      children
    );

// Following components are mocked because they create random IDs.
jest.mock("@twilio-paste/disclosure", () => ({
  Disclosure: mockDivComponentWithChildren("Disclosure"),
  DisclosureHeading: mockDivComponentWithChildren("DisclosureHeading"),
  DisclosureContent: mockDivComponentWithChildren("DisclosureContent"),
}));
