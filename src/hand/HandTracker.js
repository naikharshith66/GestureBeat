import {
  FilesetResolver,
  HandLandmarker
} from "@mediapipe/tasks-vision";

import EventBus from "../core/EventBus.js";

class HandTracker {
  constructor() {
    this.handLandmarker = null;
    this.video = null;
    this.running = false;
  }

  async initialize(video) {
    if (this.running) return;

    this.video = video;

    try {
      console.log("Loading MediaPipe WASM...");

      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      console.log("Loading Hand Landmarker...");

      this.handLandmarker =
        await HandLandmarker.createFromModelPath(
          vision,
          "/models/hand_landmarker.task"
        );

      await this.handLandmarker.setOptions({
        runningMode: "VIDEO",
        numHands: 2,
        minHandDetectionConfidence: 0.7,
        minHandPresenceConfidence: 0.7,
        minTrackingConfidence: 0.7
      });

      console.log("✅ HandTracker Ready");

      this.running = true;

      requestAnimationFrame(this.detect.bind(this));

    } catch (error) {
      console.error("HandTracker Error:", error);
    }
  }

  detect() {
    if (!this.running) return;

    const result = this.handLandmarker.detectForVideo(
      this.video,
      performance.now()
    );

    EventBus.emit("hands-result", result);

    requestAnimationFrame(this.detect.bind(this));
  }

  stop() {
    this.running = false;
  }
}

export default new HandTracker();