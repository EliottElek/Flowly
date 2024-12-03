'use client'
import '@/app/globals.css'
import {
    EditorContent, JSONContent, useEditor, BubbleMenu,
} from '@tiptap/react'
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { all, createLowlight } from 'lowlight'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'
import { Bold, Italic, Underline } from "lucide-react"
import Link from '@tiptap/extension-link'


import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import Placeholder from '@tiptap/extension-placeholder'

const lowlight = createLowlight(all)

// you can also register individual languages
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

interface EditorProps {
    content: JSONContent;
    setContent: (content: JSONContent) => void;
}

export default ({ content, setContent }: EditorProps) => {

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            CodeBlockLowlight.configure({ lowlight }),
            Image,
            Placeholder.configure({
                // Use a placeholder:
                placeholder: 'Write some comments...',
            }),
            Link.configure({
                defaultProtocol: 'https',
            })
        ],
        content,
        onUpdate: ({ editor }) => {
            setContent(editor.getJSON()); // Synchronize the editor content with the React state
        },
    });

    useEffect(() => {
        if (!editor) return;

        const currentContent = editor.getJSON();
        // Only update if content has actually changed
        if (JSON.stringify(currentContent) !== JSON.stringify(content)) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    return (
        <div className='prose dark:prose-invert max-w-none'>
            {editor && <BubbleMenu className="bubble-menu bg-background shadow" tippyOptions={{ duration: 100 }} editor={editor}>
                <ToggleGroup type="multiple">
                    <ToggleGroupItem onClick={() => editor.chain().focus().toggleBold().run()}
                        value="bold" aria-label="Toggle bold">
                        <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem onClick={() => editor.chain().focus().toggleItalic().run()}
                        value="italic" aria-label="Toggle italic">
                        <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem onClick={() => editor.chain().focus().toggleStrike().run()}
                        value="strikethrough" aria-label="Toggle strikethrough">
                        <Underline className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </BubbleMenu>}
            <EditorContent autoFocus editor={editor} />
        </div>
    );
};


export const CommentContent = ({ content }: { content: JSONContent }) => {
    const editor = useEditor({
        editable: false,
        immediatelyRender: false,
        content: content,
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            CodeBlockLowlight.configure({ lowlight }),
            Image,
            Link.configure({
                defaultProtocol: 'https',
            })
        ],
    });

    return (
        <div className='prose dark:prose-invert max-w-none !bg-background'>
            <EditorContent editor={editor} />
        </div>
    );
};

