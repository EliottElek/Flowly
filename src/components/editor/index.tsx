'use client'
import '@/app/globals.css'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import {
    EditorContent, JSONContent, useEditor, BubbleMenu,
} from '@tiptap/react'
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Link from '@tiptap/extension-link'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { all, createLowlight } from 'lowlight'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'
import { Bold, Italic, Underline } from "lucide-react"
//@ts-ignore
import UniqueId from "tiptap-unique-id";

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"

const CustomDocument = Document.extend({
    content: 'heading paragraph block*',
})

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
            CustomDocument,
            StarterKit.configure({
                document: false,
            }),
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'heading') {
                        return 'What’s the title?'
                    }
                    return 'Can you add some further context?'
                },
            }),
            CodeBlockLowlight.configure({ lowlight }),
            Image,
            Link.configure({
                defaultProtocol: 'https',
            }),
            UniqueId.configure({
                attributeName: "id",
                types: ["paragraph", "heading", "orderedList", "bulletList", "listItem"],
                createId: () => window.crypto.randomUUID(),
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            setContent(editor.getJSON()); // Synchronize the editor content with the React state
        },
    });

    const addImage = () => {
        const url = window.prompt('URL')

        if (url) {
            editor?.chain().focus().setImage({ src: url }).run()
        }
    }

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
            {/* <div className="mb-12">
                <Button variant={"secondary"} size={"icon"} onClick={addImage}><ImagePlus /></Button>
            </div> */}
            <EditorContent autoFocus editor={editor} />
        </div>
    );
};
