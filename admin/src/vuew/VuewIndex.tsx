import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { VuewList } from "./VuewList";
import { CreateVuew } from "./CreateVuew";
import { Vuew } from "./Vuew";

export const VuewIndex = (): React.ReactElement => {
  useBreadcrumbs("/vuews/", "Vuews");

  return (
    <Switch>
      <PrivateRoute exact path={"/vuews/"} component={VuewList} />
      <PrivateRoute path={"/vuews/new"} component={CreateVuew} />
      <PrivateRoute path={"/vuews/:id"} component={Vuew} />
    </Switch>
  );
};
