import LandmarkDrawer from "./LandmarkDrawer.js";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

import EventBus from "../core/EventBus.js";

class HandTracker {
  constructor() {
    this.landmarker = null;
    this.video = null;
    this.running = false;

    this.lastVideoTime = -1;
    this.lastFPSUpdate = performance.now();
    this.frames = 0;
  }

  async initialize(video) {
    if (this.running) return;

    this.video = video;

    console.log("Loading MediaPipe...");

    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
    );

    console.log("Loading Hand Landmarker...");

    this.landmarker = await HandLandmarker.createFromOptions(
      vision,

      {
        baseOptions: {
            modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"
        },

        runningMode: "VIDEO",

        numHands: 2,
      },
    );

    console.log("✅ HandTracker Ready");

    this.running = true;

    requestAnimationFrame(this.detect.bind(this));
  }

  detect() {
    if (!this.running) return;

    if (this.video.readyState < 2) {
      requestAnimationFrame(this.detect.bind(this));
      return;
    }

    if (this.video.currentTime === this.lastVideoTime) {
      requestAnimationFrame(this.detect.bind(this));
      return;
    }

    this.lastVideoTime = this.video.currentTime;

    const result = this.landmarker.detectForVideo(
      this.video,

      performance.now(),
    );

    console.log(result);

    this.frames++;

    const now = performance.now();

    if (now - this.lastFPSUpdate >= 1000) {
      document.getElementById("fps").textContent = this.frames;

      this.frames = 0;
      this.lastFPSUpdate = now;
    }

    document.getElementById("hands").textContent = result.landmarks
      ? result.landmarks.length
      : 0;

    LandmarkDrawer.draw(
        result,
        this.video,
    );
      EventBus.emit("hands-result", result);

    requestAnimationFrame(this.detect.bind(this));
  }

  stop() {
    this.running = false;
  }
}

export default new HandTracker();
