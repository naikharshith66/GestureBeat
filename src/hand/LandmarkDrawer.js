import {
    drawConnectors,
    drawLandmarks
} from "@mediapipe/drawing_utils";

import { HAND_CONNECTIONS } from "@mediapipe/hands";

class LandmarkDrawer {

    constructor() {

        this.canvas = null;
        this.ctx = null;

    }

    initialize() {

        if (this.canvas) return;

        this.canvas = document.getElementById("canvas");

        if (!this.canvas) {

            console.error("Canvas not found");
            return;

        }

        this.ctx = this.canvas.getContext("2d");

    }

    draw(results) {

        this.initialize();

        if (!this.canvas || !this.ctx) return;

        this.canvas.width = results.image.width;
        this.canvas.height = results.image.height;

        this.ctx.save();

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        if (results.multiHandLandmarks) {

            for (const landmarks of results.multiHandLandmarks) {

                drawConnectors(
                    this.ctx,
                    landmarks,
                    HAND_CONNECTIONS,
                    {
                        color: "#FFFFFF",
                        lineWidth: 4
                    }
                );

                drawLandmarks(
                    this.ctx,
                    landmarks,
                    {
                        color: "#00FFFF",
                        radius: 5
                    }
                );

            }

        }

        this.ctx.restore();

    }

}

export default new LandmarkDrawer();