import { css } from "@emotion/react";
import { CircularProgress } from "@mui/material";

export const Spinner = (props: any): JSX.Element => {
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
