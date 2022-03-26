import { css } from "@emotion/react";
import { Box, Grid, Toolbar, useTheme } from "@mui/material";
import { FunctionComponent } from "react";

export const MainContainer: FunctionComponent = ({ children }): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      css={css`
        flex-grow: 1;
        padding: ${theme.spacing(3)};
      `}
    >
      <Toolbar />
      <Grid container>{children}</Grid>
    </Box>
  );
};
