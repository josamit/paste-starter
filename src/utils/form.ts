import { fireInputChange } from "@twilio/react-typed-forms/dist/testing-utils";
import { fireEvent, RenderResult } from "@testing-library/react";

export function createGetForm({ findByTestId, queryByTestId }: RenderResult) {
  return (formId: string) => ({
    async get(testId: string) {
      return findByTestId(`form-${formId}-${testId}`);
    },
    async click(testId: string) {
      const element = await this.get(testId);

      fireEvent.click(element);
    },
    async type(testId: string, value: string) {
      const element = await this.get(testId);

      fireInputChange(element, value);
    },
    async submit() {
      const element = await this.get("submit-button");

      await fireEvent.click(element);
    },
    async expectValid() {
      const elementId = `${formId}-error`;

      expect(queryByTestId(elementId)).toBeNull();
    },
    async expectValue(testId: string, value: string) {
      const element = (await this.get(testId)) as HTMLInputElement;

      expect(element.value).toEqual(value);
    },
    async select(testId: string, value: string) {
      const element = await this.get(testId);

      await fireEvent.change(element, {
        target: {
          value,
        },
      });
    },
  });
}
