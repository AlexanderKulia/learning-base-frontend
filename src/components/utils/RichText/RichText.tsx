import { css } from "@emotion/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";

export const emptyContent = [
  '{"type":"doc","content":[]}',
  '{"type":"doc","content":[{"type":"paragraph"}]}',
];

interface RichTextProps {
  content: string;
  onUpdate?: (content: string) => void;
  setFieldTouched?: (field: string) => void;
  editable?: boolean;
  renderMenu?: boolean;
  maxHeight?: number;
}

export const RichText = ({
  content,
  onUpdate = (): void => {},
  setFieldTouched = (): void => {},
  editable = true,
  renderMenu = false,
  maxHeight = 500,
}: RichTextProps): JSX.Element => {
  const editor = useEditor(
    {
      extensions: [StarterKit],
      content: JSON.parse(content),
      editable,
      autofocus: "end",
      onUpdate: ({ editor }): void => {
        const json = editor.getJSON();
        onUpdate(JSON.stringify(json));
      },
      onBlur: (): void => {
        setFieldTouched("content");
      },
    },
    [content],
  );

  return (
    <>
      {renderMenu ? <MenuBar editor={editor} /> : null}
      <EditorContent
        editor={editor}
        css={css`
          .ProseMirror {
            min-height: 400px;
            max-height: ${maxHeight}px;
          }

          .ProseMirror:focus {
            outline: none;
          }

          .ProseMirror p {
            margin: 0;
          }

          .ProseMirror > * + * {
            margin-top: 0.75em;
          }

          .ProseMirror ul,
          ol {
            padding: 0 1rem;
          }

          .ProseMirror h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            line-height: 1.1;
          }

          .ProseMirror code {
            background-color: rgba(#616161, 0.1);
            color: #616161;
          }

          .ProseMirror pre {
            background: #0d0d0d;
            color: #fff;
            font-family: "JetBrainsMono", monospace;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
          }

          .ProseMirror pre code {
            color: inherit;
            padding: 0;
            background: none;
            font-size: 0.8rem;
          }

          .ProseMirror img {
            max-width: 100%;
            height: auto;
          }

          .ProseMirror blockquote {
            padding-left: 1rem;
            border-left: 2px solid rgba(#0d0d0d, 0.1);
          }

          .ProseMirror hr {
            border: none;
            border-top: 2px solid rgba(#0d0d0d, 0.1);
            margin: 2rem 0;
          }
        `}
      />
    </>
  );
};
