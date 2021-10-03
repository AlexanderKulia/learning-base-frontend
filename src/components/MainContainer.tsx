/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from "react";
import { Toolbar, useTheme } from "@mui/material";
import { css } from "@emotion/react";
import { FunctionComponent } from "react";

export const MainContainer: FunctionComponent = ({ children }): JSX.Element => {
  const theme = useTheme();

  return (
    <div
      css={css`
        flex-grow: 1;
        padding: ${theme.spacing(3)};
      `}
    >
      <Toolbar />
      {children}
    </div>
  );
};
