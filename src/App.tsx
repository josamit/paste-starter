import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeContainer from "@app/home/HomeContainer";
import FirstPageContainer from "@app/first-page/FirstPageContainer";
import { SiteWrapper } from "./site";
import SitePage from "./site/site-page";
import { SidebarCategoryRoutes } from "./constants";

const App: React.VFC = () => (
  <BrowserRouter>
    <SiteWrapper>
      <SitePage>
        <Switch>
          <Route path={SidebarCategoryRoutes.HOME}>
            <HomeContainer />
          </Route>
          <Route path={SidebarCategoryRoutes.FIRST_PAGE}>
            <FirstPageContainer />
          </Route>
        </Switch>
      </SitePage>
    </SiteWrapper>
  </BrowserRouter>
);

export default App;
