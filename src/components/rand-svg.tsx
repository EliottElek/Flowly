import { Column } from "@/types/kanban";
import React from "react";


const KanbanPlaceholder = ({ kanbanData }: { kanbanData: Partial<Column>[] | undefined }) => {
    const columnWidthPercent = 22.5; // Each column's width as a percentage
    const columnSpacingPercent = 3; // Card spacing as a percentage of viewBox height
    const cardHeightPercent = 13; // Card height as a percentage of viewBox height
    const cardSpacingPercent = 3; // Card spacing as a percentage of viewBox height

    return (
        <div className="w-full h-full relative overflow-hidden p-2">
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none" // Forces SVG to stretch fully to its container
                className="w-full h-full"
            >
                {kanbanData?.map((column, colIndex) => (
                    <g
                        key={colIndex}
                        transform={`translate(${colIndex * (columnWidthPercent + columnSpacingPercent)}, 0)`} // Translate columns horizontally
                    >
                        {/* Column Background */}
                        <rect
                            x="0"
                            className="group-hover:fill-primary/5"
                            y="0"
                            width={`${columnWidthPercent}%`}
                            height={`100%`}
                            fill="rgba(165, 164, 164, 0.08)"
                            stroke="rgba(165, 164, 164, 0.06)"
                            rx="2"
                            ry="2"
                        />
                        {column.tasks?.map((_, cardIndex) => (
                            <g key={cardIndex}
                            >
                                <rect
                                    className="rounded-md group-hover:fill-emerald-200/20 duration-100"
                                    x="2%" // Slight padding inside the column
                                    y={`${2 + cardIndex * (cardHeightPercent + cardSpacingPercent)}%`} // Card position
                                    width={`${columnWidthPercent - 4}%`} // Card width with padding
                                    height={`${cardHeightPercent}%`} // Card height
                                    fill="rgba(165, 164, 164, 0.20)"
                                    rx="1"
                                    ry="1"
                                />
                                <rect
                                    className="rounded-md opacity-0 -translate-y-1 group-hover:translate-y-0 duration-300 group-hover:opacity-100 group-hover:fill-emerald-500/80 duration-100"
                                    x="3%" // Slight padding inside the column
                                    y={`${4 + cardIndex * (cardHeightPercent + cardSpacingPercent)}%`} // Card position
                                    width={`${columnWidthPercent - 10}%`} // Card width with padding
                                    height={`3`} // Card height
                                    fill="rgba(165, 164, 164, 0.20)"
                                    rx=".5"
                                    ry=".5"
                                />
                                <rect
                                    className="rounded-md opacity-0 translate-y-2 group-hover:translate-y-0 duration-300 group-hover:opacity-100 group-hover:fill-emerald-500/20 duration-100"
                                    x="3%" // Slight padding inside the column
                                    y={`${9 + cardIndex * (cardHeightPercent + cardSpacingPercent)}%`} // Card position
                                    width={`${columnWidthPercent - 6}%`} // Card width with padding
                                    height={`1`} // Card height
                                    fill="rgba(165, 164, 164, 0.20)"
                                    rx=".5"
                                    ry=".5"
                                />
                                <rect
                                    className="rounded-md opacity-0 translate-y-2 group-hover:translate-y-0 duration-300 group-hover:opacity-100 group-hover:fill-emerald-500/20 duration-100"
                                    x="3%" // Slight padding inside the column
                                    y={`${12 + cardIndex * (cardHeightPercent + cardSpacingPercent)}%`} // Card position
                                    width={`${columnWidthPercent - 6}%`} // Card width with padding
                                    height={`1`} // Card height
                                    fill="rgba(165, 164, 164, 0.20)"
                                    rx=".5"
                                    ry=".5"
                                />
                            </g>
                        ))}
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default KanbanPlaceholder;
