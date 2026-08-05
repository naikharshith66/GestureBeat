import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import EventBus from "../core/EventBus.js";
import LandmarkDrawer from "./LandmarkDrawer.js";

class HandTracker {

    constructor() {

        this.hands = null;
        this.camera = null;
        this.video = null;

        this.lastTime = performance.now();
        this.frames = 0;

    }

    async initialize(video) {

        this.video = video;

        this.hands = new Hands({

            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }

        });

        this.hands.setOptions({

            maxNumHands: 2,

            modelComplexity: 1,

            minDetectionConfidence: 0.7,

            minTrackingConfidence: 0.7

        });

        this.hands.onResults((results) => {

            LandmarkDrawer.draw(results);

            document.getElementById("hands").textContent =
                results.multiHandLandmarks
                    ? results.multiHandLandmarks.length
                    : 0;

            this.updateFPS();

            EventBus.emit("hands-result", results);

        });

        this.camera = new Camera(video, {

            onFrame: async () => {

                await this.hands.send({

                    image: video

                });

            },

            width: 1280,

            height: 720

        });

        this.camera.start();

        console.log("✅ HandTracker Started");

    }

    updateFPS() {

        this.frames++;

        const now = performance.now();

        if (now - this.lastTime >= 1000) {

            document.getElementById("fps").textContent = this.frames;

            this.frames = 0;

            this.lastTime = now;

        }

    }

}

export default new HandTracker();