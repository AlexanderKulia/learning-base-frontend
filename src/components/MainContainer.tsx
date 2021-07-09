import React from "react";
import { makeStyles, Toolbar } from "@material-ui/core";
import { FunctionComponent } from "react";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export const MainContainer: FunctionComponent = ({ children }): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Toolbar />
      {children}
    </div>
  );
};
