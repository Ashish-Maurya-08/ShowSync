import React ,{ useRef } from 'react';
import './Utils.css';


const GlassMorph = ({children}) => {
    const glassRef = useRef(null);
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = glassRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }
    


    return (
        <div ref={glassRef} className="glass-morph" onMouseMove={handleMouseMove}
        style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
        }} 

        >
            {children}
        </div>
    );
}


export default GlassMorph;