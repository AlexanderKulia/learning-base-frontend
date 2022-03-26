import {
  CodeOutlined,
  FormatBoldOutlined,
  FormatClearOutlined,
  FormatItalicOutlined,
  FormatListBulletedOutlined,
  FormatListNumberedOutlined,
  FormatQuoteOutlined,
  FormatStrikethroughOutlined,
} from "@mui/icons-material";
import { Editor } from "@tiptap/react";
import { FunctionComponent } from "react";
import { ReactComponent as H1Icon } from "./icons/h-1.svg";
import { ReactComponent as H2Icon } from "./icons/h-2.svg";
import { ReactComponent as H3Icon } from "./icons/h-3.svg";
import { ReactComponent as H4Icon } from "./icons/h-4.svg";
import { ReactComponent as H5Icon } from "./icons/h-5.svg";
import { ReactComponent as H6Icon } from "./icons/h-6.svg";
import { ReactComponent as ParagraphIcon } from "./icons/paragraph.svg";

interface MenuBarProps {
  editor: Editor | null;
}

export const MenuBar: FunctionComponent<MenuBarProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <>
      <FormatBoldOutlined
        onClick={(): boolean => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      />
      <FormatItalicOutlined
        onClick={(): boolean => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      />
      <FormatStrikethroughOutlined
        onClick={(): boolean => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      />
      <CodeOutlined
        onClick={(): boolean => editor.chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      />
      <FormatClearOutlined
        onClick={(): boolean => editor.chain().focus().unsetAllMarks().run()}
      />
      <FormatClearOutlined
        onClick={(): boolean => editor.chain().focus().clearNodes().run()}
      />
      <ParagraphIcon
        onClick={(): boolean => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      />
      <H1Icon
        onClick={(): boolean =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      />
      <H2Icon
        onClick={(): boolean =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      />
      <H3Icon
        onClick={(): boolean =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      />
      <H4Icon
        onClick={(): boolean =>
          editor.chain().focus().toggleHeading({ level: 4 }).run()
        }
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      />
      <H5Icon
        onClick={(): boolean =>
          editor.chain().focus().toggleHeading({ level: 5 }).run()
        }
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      />
      <H6Icon
        onClick={(): boolean =>
          editor.chain().focus().toggleHeading({ level: 6 }).run()
        }
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      />
      <FormatListBulletedOutlined
        onClick={(): boolean => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      />
      <FormatListNumberedOutlined
        onClick={(): boolean =>
          editor.chain().focus().toggleOrderedList().run()
        }
        className={editor.isActive("orderedList") ? "is-active" : ""}
      />
      <CodeOutlined
        onClick={(): boolean => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      />
      <FormatQuoteOutlined
        onClick={(): boolean => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      />
    </>
  );
};
