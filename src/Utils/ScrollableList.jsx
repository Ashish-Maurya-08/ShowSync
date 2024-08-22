import React, { useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";

const ScrollableList = ({ children }) => {
    const ourRef = useRef(null);
    const { events } = useDraggable(ourRef);

    return (
        <div ref={ourRef} className="list" {...events}>
            {children}
        </div>
    );
};

export default ScrollableList;