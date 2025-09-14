"use client";
import React from "react";

// Progress bar component to show reading progress
const ReadingProgress = () => {
    const [width, setWidth] = React.useState(0);

    React.useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
            setWidth(scrollPercent * 100);
        };

        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-50">
            <div
                className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-100 ease-out"
                style={{ width: `${width}%` }}
            />
        </div>
    );
};

export default ReadingProgress;