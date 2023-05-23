import React, { useState, useEffect } from 'react';

const ProgressBar = ({ progress, duration }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const progressWidth = (progress / duration) * 100;
        setWidth(progressWidth);
    }, [progress, duration]);

    return (
        <div style={{ width: '85%', height: '20px', backgroundColor: '#e0e0e0',  borderRadius:'10px'}}>
            <div
                style={{
                    width: `${width}%`,
                    maxWidth:'100%',
                    height: '100%',
                    backgroundColor: '#007bff',
                    transition: 'width 0.3s ease-in-out',
                    borderRadius:'10px'
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '99%',
                    left: `${width/5}%`,
                    transform: 'translate(-50%, -50%)',
                    color: '#000',
                    backgroundColor:'#fff',
                    zIndex:"999"
                }}
            >
                {`${width.toFixed(2)}%`}
            </div>
        </div>
    );
};

export default ProgressBar;
