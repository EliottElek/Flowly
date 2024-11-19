'use client'
import '@/app/globals.css'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import {
    EditorContent, JSONContent, useEditor, BubbleMenu,
    FloatingMenu,
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
        <>
            {editor && <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    Strike
                </button>
            </BubbleMenu>}

            {editor && <FloatingMenu className="flex gap-2" tippyOptions={{ duration: 100 }} editor={editor}>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    H1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    Bullet list
                </button>
            </FloatingMenu>}
            <div className="control-group">
                <div className="button-group">
                    <button onClick={addImage}>Add image from URL</button>
                </div>
            </div>
            <EditorContent autoFocus editor={editor} />
        </>
    );
};
