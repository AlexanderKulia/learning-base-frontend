/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React, { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { css } from "@emotion/react";

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
