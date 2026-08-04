import Dashboard from "../ui/Dashboard.js";
import EventBus from "./EventBus.js";
import State from "./State.js";

import Camera from "../camera/Camera.js";
import HandTracker from "../hand/HandTracker.js";

class App {

    constructor() {
        this.dashboard = new Dashboard();
    }

    initialize() {

        // Render UI
        document.body.innerHTML = this.dashboard.render();

        console.log("🚀 GestureBeat Started");

        // Register events
        this.registerEvents();

        // Register button listeners
        this.initializeEvents();

        // Notify app is ready
        EventBus.emit("app-ready", State);
    }

    registerEvents() {

        // Camera started
        EventBus.on("camera-started", async ({ video }) => {

            console.log("📷 Camera Started");
            console.log("✋ Starting Hand Tracker...");

            await HandTracker.initialize(video);

        });

        // Hand tracking results
        EventBus.on("hands-result", (result) => {

            console.log(result);

        });

    }

    initializeEvents() {

        const startCameraBtn = document.getElementById("startCamera");

        startCameraBtn.addEventListener("click", async () => {

            await Camera.initialize();

        });

    }

}

export default new App();