"use client"

import { JSONContent } from "@tiptap/react";
import React, { useEffect, useState } from "react";

interface Heading {
    level: number;
    text: string;
    id: string
}

interface TOCProps {
    doc: JSONContent;
}

const TOC: React.FC<TOCProps> = ({ doc }) => {

    const [headings, setHeadings] = useState<Heading[]>([])

    useEffect(() => (
        setHeadings(doc.content
            ?.filter((item) => item.type === "heading" && item.content)
            .map((heading) => ({
                level: heading.attrs?.level ?? 1, // Default to level 1 if not specified
                id: heading?.attrs?.id,
                text: heading.content
                    ?.map((item) => item.text ?? "")
                    .join("") ?? "",
            })) ?? [])
    ), [doc])

    return (
        <div className="prose dark:prose-invert grow overflow-auto p-3">
            <h2 className="text-sm">Table of Contents</h2>
            {headings.length > 0 ?
                <ul className="text-sm">
                    {headings.map((heading, index) => (
                        <li
                            key={index}
                            style={{
                                marginLeft: `${(heading.level - 1) * 10}px`,
                                listStyleType: heading.level === 1 ? "disc" : "circle",
                            }}
                        >
                            <a className="not-prose hover:underline" href={`#${heading.id}`}>{heading.text}</a>
                        </li>
                    ))}
                </ul>
                : (
                    <p className="text-xs italic opacity-60">No headings found in the document.</p>
                )}
        </div >
    );
};

export default TOC;
