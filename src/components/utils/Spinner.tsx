import React from "react";
import { CircularProgress } from "@mui/material";
import { css } from "@emotion/react";

export const Spinner = (props: any) => {
  return (
    <CircularProgress
      css={css`
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -8px;
        margin-left: -8px;
      `}
      {...props}
    />
  );
};
