/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React, { FunctionComponent } from "react";
import { css } from "@emotion/react";

export const AppContainer: FunctionComponent = ({ children }): JSX.Element => {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      {children}
    </div>
  );
};
