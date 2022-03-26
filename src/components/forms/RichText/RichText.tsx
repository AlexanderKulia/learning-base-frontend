import { css } from "@emotion/react";
import { Box } from "@mui/material";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FunctionComponent } from "react";
import { MenuBar } from "./MenuBar";

interface RichTextProps {
  content: string;
  onChange: (content: string) => void;
}

export const RichText: FunctionComponent<RichTextProps> = ({
  content,
  onChange,
}): JSX.Element => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: JSON.parse(content),
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange(JSON.stringify(json));
    },
  });

  return (
    <Box
      css={css`
        border: 1px solid #c4c4c4;
      `}
    >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </Box>
  );
};
