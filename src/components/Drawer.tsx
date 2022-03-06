import React from "react";
import { css } from "@emotion/react";
import { Drawer as MuiDrawer, List, ListItem, ListItemButton, Toolbar, Box, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const drawerWidth = 96;

interface DrawerItems {
  [key: string]: string;
}

const drawerItems: DrawerItems = {
  Notes: "/notes",
  Tags: "/tags"
};

export const Drawer = () => {
  return (
    <MuiDrawer
      variant="permanent"
      css={css`
        width: ${drawerWidth}px;
        flex-shrink: 0;
        & .MuiDrawer-paper {
          width: ${drawerWidth}px;
          box-sizing: border-box;
        }
      `}
    >
      <Toolbar />
      <Box
        css={css`
          overflow: auto;
        `}
      >
        <List>
          {Object.keys(drawerItems).map((text: string) => (
            <ListItem disablePadding button key={text}>
              <ListItemButton component={RouterLink} to={drawerItems[text]}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </MuiDrawer>
  );
};
