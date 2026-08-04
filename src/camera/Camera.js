import EventBus from "../core/EventBus.js";

class Camera {
  constructor() {
    this.video = null;
    this.stream = null;
    this.isRunning = false;
  }

  async initialize() {
    if (this.isRunning) return;

    this.video = document.getElementById("video");

    if (!this.video) {
      throw new Error("Video element not found.");
    }

    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: "user"
      },
      audio: false
    });

    this.video.srcObject = this.stream;

    await this.video.play();

    this.isRunning = true;

    EventBus.emit("camera-started", {
      video: this.video
    });
  }

  stop() {
    if (!this.stream) return;

    this.stream.getTracks().forEach(track => track.stop());

    this.stream = null;
    this.isRunning = false;

    EventBus.emit("camera-stopped");
  }

  getVideo() {
    return this.video;
  }
}

export default new Camera();