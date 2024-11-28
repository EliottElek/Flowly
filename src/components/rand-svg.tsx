import React from "react";

const KanbanPlaceholder = ({ width = "100%", height = "100%" }) => {
    const kanbanData = [
        { cards: [null, null] },
        { cards: [null, null, null] },
        { cards: [null, null, null, null] },
        { cards: [null] },
    ];

    const columnWidthPercent = 100 / kanbanData.length; // Each column's width as a percentage
    const cardHeightPercent = 13; // Card height as a percentage of viewBox height
    const cardSpacingPercent = 3; // Card spacing as a percentage of viewBox height

    return (
        <div className="w-full h-full relative overflow-hidden">
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none" // Forces SVG to stretch fully to its container
                className="w-full h-full"
            >
                {kanbanData.map((column, colIndex) => (
                    <g
                        key={colIndex}
                        transform={`translate(${colIndex * columnWidthPercent}, 0)`} // Translate columns horizontally
                    >
                        {/* Column Background */}
                        <rect
                            x="0"
                            y="0"
                            width={`${columnWidthPercent}%`}
                            height="100%"
                            fill="rgba(165, 164, 164, 0.08)"
                            stroke="rgba(165, 164, 164, 0.06)"
                        />
                        {column.cards.map((_, cardIndex) => (
                            <rect
                                className="rounded-md group-hover:fill-green-300/40 duration-100"
                                key={cardIndex}
                                x="2%" // Slight padding inside the column
                                y={`${2 + cardIndex * (cardHeightPercent + cardSpacingPercent)}%`} // Card position
                                width={`${columnWidthPercent - 4}%`} // Card width with padding
                                height={`${cardHeightPercent}%`} // Card height
                                fill="rgba(165, 164, 164, 0.20)"
                            />
                        ))}
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default KanbanPlaceholder;
