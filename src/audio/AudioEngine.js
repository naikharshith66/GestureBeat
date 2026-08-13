import Waveform from "./Waveform.js";
import EffectEngine from "./EffectEngine.js";

class AudioEngine {

    constructor() {

        this.audio = new Audio();

        this.song = null;

        this.animation = null;

        this.audioContext = null;
        this.source = null;
        this.analyser = null;

    }



    setupAudioContext() {

        if (this.audioContext) {
            return;
        }


        this.audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();


        this.source =
            this.audioContext.createMediaElementSource(
                this.audio
            );


        this.analyser =
            this.audioContext.createAnalyser();


        this.analyser.fftSize =
            2048;


        this.analyser.smoothingTimeConstant =
            0.8;


    

        EffectEngine.initialize(
            this.audioContext,
            this.source,
            this.analyser
        );


       

        this.analyser.connect(
            this.audioContext.destination
        );


        console.log(
            "🎧 Audio analyser ready"
        );

    }



    load(song) {

        this.song = song;


        this.audio.src =
            song.url;


        this.audio.load();


        Waveform.clear();


        console.log(
            "🎵 Loaded:",
            song.name
        );

    }




    async play() {

        if (!this.song) {

            console.warn(
                "⚠️ No song loaded"
            );

            return;

        }


        try {

            this.setupAudioContext();


            if (
                this.audioContext.state ===
                "suspended"
            ) {

                await this.audioContext.resume();

            }


            await this.audio.play();


            console.log(
                "▶ Playing"
            );


            this.animate();

        }
        catch (error) {

            console.error(
                "❌ Audio playback failed:",
                error
            );

        }

    }



    pause() {

        this.audio.pause();


        if (this.animation) {

            cancelAnimationFrame(
                this.animation
            );

            this.animation = null;

        }


        console.log(
            "⏸ Paused"
        );

    }


  
    animate() {

        if (this.audio.paused) {

            return;

        }


        const duration =
            this.audio.duration;


        let progress = 0;


        if (
            Number.isFinite(duration) &&
            duration > 0
        ) {

            progress =
                this.audio.currentTime /
                duration;

        }


        Waveform.update(
            progress,
            this.analyser
        );


        this.animation =
            requestAnimationFrame(
                () => this.animate()
            );

    }

}


export default new AudioEngine();