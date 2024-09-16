import React from 'react';

type badgeProps = {
    content: string | null
    type : "blue" | "green" | "yellow" | 'red' | 'purple' | undefined
}

const Badges: React.FC<badgeProps> = ({ content,type }) => {
    return (
        <span className={`
            ${
                type === "blue" ? "bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
                :
                type === "green" ? "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
                :
                type === "yellow" ? "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
                :
                type === "purple" ? "bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300"
                :
                type === "red" ? "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
                :
                "bg-gray-200 text-gray-500 text-xs font-medium me-2 px-2.5 py-0.5"
            }
            `}>{content || 'Default'}</span>
    );
};

export default Badges;