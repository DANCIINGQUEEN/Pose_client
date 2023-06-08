import React from 'react';
import ml5 from "ml5";
import Sketch from "react-p5";

function PoseNetprtc(props) {

    let video, poseNet, pose, skeleton;
    const ratio=0.32
    const ww = window.innerWidth * ratio;
    const wh = window.innerHeight * ratio;

    const setup = (p5) => {
        p5.createCanvas(window.innerWidth * ratio, window.innerHeight * ratio)
        video = p5.createCapture(p5.VIDEO);
        video.size(window.innerWidth * ratio, window.innerHeight * ratio);
        video.hide();
        poseNet = ml5.poseNet(video);
        poseNet.on('pose', gotPoses);
    };

    const draw = (p5) => {
        p5.translate(p5.width, 0);
        p5.scale(-1, 1);
        p5.image(video, 0, 0, window.innerWidth * ratio, window.innerHeight * ratio);
        if (pose) {
            for (let i = 0; i < skeleton.length; i++) {
                let a = skeleton[i][0];
                let b = skeleton[i][1];
                p5.strokeWeight(2);
                p5.stroke(255);
                p5.line(a.position.x * (window.innerWidth * ratio/ww), a.position.y * (window.innerHeight * ratio/wh), b.position.x * (window.innerWidth * ratio /ww), b.position.y * (window.innerHeight * ratio /wh));
            }
            for (let i = 0; i < pose.keypoints.length; i++) {
                let x = pose.keypoints[i].position.x * (window.innerWidth * ratio / ww);
                let y = pose.keypoints[i].position.y * (window.innerHeight * ratio / wh);
                p5.fill(0, 255, 0);
                p5.stroke(255);
                p5.ellipse(x, y, 10, 10);
            }
        }
    };
    const windowResized = (p5) => {
        p5.resizeCanvas(window.innerWidth*ratio, window.innerHeight*ratio, true);
    };
    const gotPoses = (poses) => {
        if (poses.length > 0) {
            pose = poses[0].pose;
            skeleton = poses[0].skeleton;
        }
    };
    return (
        <div>
            <Sketch
                setup={setup}
                draw={draw}
                windowResized={windowResized}
            />
        </div>
    );
}

export default PoseNetprtc;
