type UseWindowObjectReturn = {
  environment: string;
  username: string;
  email: string;
};

function useWindowObject(): UseWindowObjectReturn {
  return {
    // @ts-ignore
    environment: window?.environment || "stage",
    // @ts-ignore
    username: window?.user?.name || "jdoe",
    // @ts-ignore
    email: window?.user?.email || "jdoe@test.com",
  };
}

export { useWindowObject };
