import { UseToasterReturnedProps } from "@twilio-paste/core";
import { Toaster, useToaster } from "@twilio-paste/core/toast";
import React, { useEffect } from "react";

const ToasterContext =
  React.createContext<UseToasterReturnedProps | undefined>(undefined);

export const randomString = () => {
  // @ts-ignore
  const crypto = window.crypto || window.msCrypto;
  const array = new Uint32Array(1);
  return crypto.getRandomValues(array).toString();
};

export type UseToastsReturn = ReturnType<typeof useToaster>;

export function useToasts(): UseToastsReturn {
  const context = React.useContext(ToasterContext);

  if (context === undefined) {
    throw new Error("`useToasts` must be used within a `ToastsProvider`.");
  }

  return {
    ...context,
    push: (props) => {
      context.push({ ...props, dismissAfter: 3000 });
    },
  };
}

interface ToastsProviderProps {
  toastLimit?: number;
  toasterProps?: Partial<UseToasterReturnedProps>;
}

const DEFAULT_TOAST_LIMIT = 2;

const ToastsProvider: React.FC<ToastsProviderProps> = ({
  toastLimit = DEFAULT_TOAST_LIMIT,
  toasterProps,
  children,
}) => {
  const toaster = useToaster();

  useEffect(() => {
    if (toaster.toasts.length > toastLimit) {
      toaster.toasts.shift();
    }
  }, [toaster.toasts, toastLimit]);

  return (
    <ToasterContext.Provider value={toaster}>
      {children}
      <Toaster {...toaster} {...toasterProps} />
    </ToasterContext.Provider>
  );
};

export default ToastsProvider;
