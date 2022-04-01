import { css } from "@emotion/react";
import { Box, Paper, Typography, useTheme } from "@mui/material";

interface SystemMessageProps {
  content: string;
}

export const SystemMessage = ({ content }: SystemMessageProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      css={css`
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #f3f3f3;
      `}
    >
      <Paper
        css={css`
          position: fixed;
          width: 400px;
          padding: ${theme.spacing(3)};
          left: 50%;
          top: 10%;
          transform: translate(-50%, -50%);
          text-align: center;
        `}
      >
        <Typography variant="body1">{content}</Typography>
      </Paper>
    </Box>
  );
};
