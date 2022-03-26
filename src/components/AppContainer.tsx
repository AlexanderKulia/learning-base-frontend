import { css } from "@emotion/react";
import { Box } from "@mui/material";
import { FunctionComponent } from "react";

export const AppContainer: FunctionComponent = ({ children }): JSX.Element => {
  return (
    <Box
      css={css`
        display: flex;
      `}
    >
      {children}
    </Box>
  );
};
