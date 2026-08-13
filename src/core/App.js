import Dashboard from "../ui/Dashboard.js";
import HandTracker from "../hand/HandTracker.js";

import LibraryManager from "../audio/LibraryManager.js";
import AudioEngine from "../audio/AudioEngine.js";

import Waveform from "../audio/Waveform.js";


class App {

    constructor() {

        this.dashboard =
            new Dashboard();

    }


    async initialize() {

        document.body.innerHTML =
            this.dashboard.render();


        console.log(
            "🚀 GestureBeat Started"
        );


        this.initializeEvents();


        await this.startCamera();

    }


    // =====================================
    // EVENTS
    // =====================================

    initializeEvents() {

        const importButton =
            document.getElementById(
                "importSong"
            );


        const playButton =
            document.getElementById(
                "playSong"
            );


        const pauseButton =
            document.getElementById(
                "pauseSong"
            );


        /*
         * IMPORT SONG
         */

        if (importButton) {

            importButton.addEventListener(
                "click",
                () => {

                    this.importSong();

                }
            );

        }


        /*
         * PLAY
         */

        if (playButton) {

            playButton.addEventListener(
                "click",
                () => {

                    if (AudioEngine.song) {

                        AudioEngine.play();

                    }

                }
            );

        }


        /*
         * PAUSE
         */

        if (pauseButton) {

            pauseButton.addEventListener(
                "click",
                () => {

                    if (AudioEngine.song) {

                        AudioEngine.pause();

                    }

                }
            );

        }


        /*
         * Record / Export intentionally removed.
         */

    }


    // =====================================
    // CAMERA
    // =====================================

    async startCamera() {

        console.log(
            "🚀 Starting camera..."
        );


        const video =
            document.getElementById(
                "video"
            );


        if (!video) {

            console.error(
                "❌ Video element not found."
            );

            return;

        }


        /*
         * Check browser support
         */

        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
        ) {

            console.error(
                "❌ Camera API is not supported."
            );

            alert(
                "Camera access is not supported by this browser."
            );

            return;

        }


        try {

            const stream =
                await navigator.mediaDevices.getUserMedia({

                    video: {

                        width: {
                            ideal: 1280
                        },

                        height: {
                            ideal: 720
                        },

                        facingMode: "user"

                    },

                    audio: false

                });


            console.log(
                "📷 Camera stream received"
            );


            video.srcObject =
                stream;


            video.muted =
                true;

            video.autoplay =
                true;

            video.playsInline =
                true;


            await video.play();


            console.log(
                "▶ Camera video playing"
            );


            /*
             * Start hand tracking
             */

            await HandTracker.initialize(
                video
            );


            console.log(
                "🖐 Hand tracking started"
            );

        }


        catch (error) {

            console.error(
                "❌ Camera initialization failed:",
                error
            );


            alert(
                "Unable to access camera. Please allow camera access and refresh the page."
            );

        }

    }


    // =====================================
    // IMPORT SONG
    // =====================================

    importSong() {

        const input =
            document.createElement(
                "input"
            );


        input.type =
            "file";


        input.accept =
            "audio/*";


        input.onchange =
            () => {

                const file =
                    input.files[0];


                if (!file) return;


                const song =
                    LibraryManager.addSong(
                        file
                    );


                AudioEngine.load(
                    song
                );


                Waveform.load(
                    file
                );


                const songName =
                    document.getElementById(
                        "songName"
                    );


                if (songName) {

                    songName.textContent =
                        "🎵 " +
                        song.name;

                }


                AudioEngine.audio
                    .onloadedmetadata =
                    () => {

                        const duration =
                            AudioEngine.audio.duration;


                        const minutes =
                            Math.floor(
                                duration / 60
                            );


                        const seconds =
                            Math.floor(
                                duration % 60
                            )
                            .toString()
                            .padStart(
                                2,
                                "0"
                            );


                        const durationElement =
                            document.getElementById(
                                "duration"
                            );


                        if (
                            durationElement
                        ) {

                            durationElement.textContent =
                                `⏱ ${minutes}:${seconds}`;

                        }

                    };


                console.log(
                    "🎵 Song Loaded"
                );

            };


        input.click();

    }

}


export default new App();