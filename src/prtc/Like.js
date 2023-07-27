import React from 'react';
// import { createRoot } from "https://esm.run/react-dom@18/client";
// import confetti from "https://esm.run/canvas-confetti@1";
import confetti from "canvas-confetti";
import {Button} from "../UI/UIPackage";
function Like({text}) {
    function onClick() {
        confetti({
            particleCount: 50,
            spread: 50
        });
    }

    return (
        <Button className="button" onClick={onClick}>
            <span>🎉</span>
            <span>{text}</span>
        </Button>
    );
}

export default Like;