import React, { useState } from "react";
import { Box } from "@twilio-paste/box";
import { Input } from "@twilio-paste/input";
import { SearchIcon } from "@twilio-paste/icons/esm/SearchIcon";
import { Button } from "@twilio-paste/button";
import { useWindowSize } from "@hooks/useWindowSize";
import { useLocation } from "react-router-dom";
import { useQueryManager } from "@context/QueryManagerContext";
import { useToasts } from "@context/ToastsProvider";

const SiteHeaderSearch: React.VFC = () => {
  const toaster = useToasts();
  const { pathname } = useLocation();

  const { breakpointIndex } = useWindowSize();
  const { queryParams, setQueryParams } = useQueryManager();

  const [value, setValue] = useState<string>(queryParams.accountSid || "");
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    if (queryParams.accountSid && value !== queryParams.accountSid.trim()) {
      setValue(queryParams.accountSid);
    }
  }, [queryParams.accountSid]);

  const isMobileNav = breakpointIndex !== undefined && breakpointIndex < 2;

  return (
    <Box minWidth={["size30", "size30", "size30", "size40"]}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setHasError(false);
          // @ts-ignore
          const inputText = e.target?.search_input?.value || value;

          if (!inputText || inputText.trim().length === 0) {
            setHasError(true);
            return;
          }

          setQueryParams(pathname, { accountSid: inputText });
        }}
      >
        <Input
          type="text"
          id="search_input"
          name="search_input"
          data-testid="site_header_search_input"
          placeholder="Search by account"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          variant={isMobileNav ? "default" : "inverse"}
          insertAfter={
            <Box cursor="default">
              <Button
                type="submit"
                variant="reset"
                data-testid="site_header_search_btn"
              >
                <SearchIcon decorative />
              </Button>
            </Box>
          }
          hasError={hasError}
        />
      </form>
    </Box>
  );
};

export { SiteHeaderSearch };
