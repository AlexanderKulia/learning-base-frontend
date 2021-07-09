import React from "react";
import { Drawer as MuiDrawer, List, ListItem, ListItemText, makeStyles, Toolbar } from "@material-ui/core";

export const drawerWidth = 96;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContainer: {
    overflow: "auto"
  }
}));

export const Drawer = () => {
  const classes = useStyles();

  return (
    <MuiDrawer
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {["Tags"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </MuiDrawer>
  );
};
