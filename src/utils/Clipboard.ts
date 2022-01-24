import { UseToasterReturnedProps } from "@twilio-paste/core";

const handleErr = (
  toaster: UseToasterReturnedProps,
  itemName: string,
  err: unknown
) => {
  toaster.push({
    message: `Oops, unable to copy ${itemName} to clipboard. ${err}`,
    variant: "error",
  });
};

const handleSuccess = (toaster: UseToasterReturnedProps, message: string) => {
  toaster.push({
    message: `${message}`,
    variant: "success",
  });
};

const handleWarning = (toaster: UseToasterReturnedProps, message: string) => {
  toaster.push({
    message: `${message}`,
    variant: "warning",
  });
};

export function copyToClipboardSync(
  textToCopy: string,
  itemName: string,
  toaster: UseToasterReturnedProps
) {
  const textArea = document.createElement("textarea");
  textArea.value = textToCopy;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const copyResult = document.execCommand("copy");
    const message = copyResult
      ? `${itemName} was successfully copied to your clipboard.`
      : `${itemName} could not be copied to your clipboard. Please try again.`;
    if (copyResult) {
      handleSuccess(toaster, message);
    } else {
      handleWarning(toaster, message);
    }
  } catch (err) {
    handleErr(toaster, itemName, err);
  }

  document.body.removeChild(textArea);
}

export function copyToClipboardAsync(
  textToCopy: string,
  itemName: string,
  toaster: UseToasterReturnedProps
) {
  if (!navigator.clipboard) {
    copyToClipboardSync(textToCopy, itemName, toaster);
    return;
  }

  navigator.clipboard
    .writeText(textToCopy)
    .then(() =>
      handleSuccess(
        toaster,
        `${itemName} was successfully copied to your clipboard.`
      )
    )
    .catch((err) => handleErr(toaster, itemName, err));
}
