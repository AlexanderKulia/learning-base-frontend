import React, { FunctionComponent } from "react";

export const AppContainer: FunctionComponent = ({ children }): JSX.Element => {
  return <div style={{ display: "flex" }}>{children}</div>;
};
