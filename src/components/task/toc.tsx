"use client";

import { JSONContent } from "@tiptap/react";
import React, { useEffect, useState } from "react";

interface Heading {
    level: number;
    text: string;
    id: string;
}

interface TOCProps {
    doc: JSONContent;
}

const TOC: React.FC<TOCProps> = ({ doc }) => {
    const [headings, setHeadings] = useState<Heading[]>([]);

    useEffect(() => {
        setHeadings(
            doc.content
                ?.filter((item) => item.type === "heading" && item.content)
                .map((heading) => ({
                    level: heading.attrs?.level ?? 1,
                    id: heading?.attrs?.id,
                    text: heading.content
                        ?.map((item) => item.text ?? "")
                        .join("") ?? "",
                })) ?? []
        );
    }, [doc]);

    const handleScrollToView = (id: string) => {
        const container = document.querySelector(".editor-view"); // Your container with overflow-auto
        const targetElement = document.getElementById(id);

        if (container && targetElement) {
            const rect = targetElement.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const offset = 80; // Adjust the offset as needed

            // Calculate the position within the container
            const targetPosition = rect.top - containerRect.top + container.scrollTop - offset;

            // Scroll the container to the target position
            container.scrollTo({
                top: targetPosition,
                behavior: "smooth", // Smooth scrolling
            });
        } else {
            console.warn(`No element found for id: ${id}`);
        }
    };
    return (
        <div className="prose dark:prose-invert grow overflow-auto p-3">
            <h2 className="text-sm">Table of Contents</h2>
            {headings.length > 0 ? (
                <ul className="text-sm">
                    {headings.map((heading, index) => (
                        <li
                            key={index}
                            style={{
                                marginLeft: `${(heading.level - 1) * 10}px`,
                                listStyleType: heading.level === 1 ? "disc" : "circle",
                            }}
                        >
                            <button
                                className="not-prose hover:underline text-left"
                                onClick={() => handleScrollToView(heading.id)}
                            >
                                {heading.text}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-xs italic opacity-60">No headings found in the document.</p>
            )}
        </div>
    );
};

export default TOC;
