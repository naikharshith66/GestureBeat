import Dashboard from "../ui/Dashboard.js";
import HandTracker from "../hand/HandTracker.js";

class App {

    constructor() {
        this.dashboard = new Dashboard();
    }

    initialize() {

        document.body.innerHTML = this.dashboard.render();

        console.log("🚀 GestureBeat Started");

        this.initializeEvents();

    }

    initializeEvents() {

        document
            .getElementById("startCamera")
            .addEventListener("click", () => {

                this.startCamera();

            });

    }

    async startCamera() {

        const video = document.getElementById("video");

        try {

            const stream = await navigator.mediaDevices.getUserMedia({

                video: {

                    width: 1280,

                    height: 720,

                    facingMode: "user"

                },

                audio: false

            });

            video.srcObject = stream;

            await video.play();

            await HandTracker.initialize(video);

        }
        catch (err) {

            console.error(err);

            alert("Unable to access camera.");

        }

    }

}

export default new App();