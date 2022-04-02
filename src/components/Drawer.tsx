import { css } from "@emotion/react";
import {
  Box,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const drawerWidth = 96;

interface DrawerItems {
  [key: string]: string;
}

const drawerItems: DrawerItems = {
  Notes: "/notes",
  Tags: "/tags",
  Stats: "/stats",
};

export const Drawer = (): JSX.Element => {
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
            <ListItem id={`drawer${text}`} disablePadding button key={text}>
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
