import Dashboard from "../ui/Dashboard.js";
import HandTracker from "../hand/HandTracker.js";

import LibraryManager from "../audio/LibraryManager.js";
import AudioEngine from "../audio/AudioEngine.js";

import Waveform from "../audio/Waveform.js";

class App {

    constructor() {

        this.dashboard = new Dashboard();

    }

    async initialize() {

        document.body.innerHTML = this.dashboard.render();

        console.log("🚀 GestureBeat Started");

        this.initializeEvents();

        await this.startCamera();

    }
    
    initializeEvents() {
   
        document
            .getElementById("importSong")
            .addEventListener("click", () => {

                this.importSong();

           });

        document
            .getElementById("playSong")
            .addEventListener("click", () => {

                if (AudioEngine.song) {

                    AudioEngine.play();

                }

            });

        document
            .getElementById("pauseSong")
            .addEventListener("click", () => {

                if (AudioEngine.song) {

                AudioEngine.pause();

             }

        });

       
        document
            .getElementById("record")
            .addEventListener("click", () => {

                console.log("🎥 Record Coming Soon");

            });

       
        document
            .getElementById("export")
            .addEventListener("click", () => {

                console.log("📤 Export Coming Soon");

            });

    }

    async startCamera() {

        console.log("🚀 startCamera called");
        
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

    importSong() {

        const input = document.createElement("input");

        input.type = "file";

        input.accept = "audio/*";

        input.onchange = () => {

            const file = input.files[0];

            if (!file) return;

            const song = LibraryManager.addSong(file);

            AudioEngine.load(song);

            Waveform.load(file);

            document.getElementById("songName").textContent =
                "🎵 " + song.name;

            AudioEngine.audio.onloadedmetadata = () => {

                const duration = AudioEngine.audio.duration;

                const minutes = Math.floor(duration / 60);

                const seconds = Math.floor(duration % 60)
                    .toString()
                    .padStart(2, "0");

                document.getElementById("duration").textContent =
                    `⏱ ${minutes}:${seconds}`;

            };

            console.log("🎵 Song Loaded");

        };

        input.click();

    }

}

export default new App();