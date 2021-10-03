/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Drawer as MuiDrawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";

export const drawerWidth = 96;

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
      <div
        css={css`
          overflow: auto;
        `}
      >
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
