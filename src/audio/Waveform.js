class Waveform {

    constructor() {

        this.canvas = null;
        this.ctx = null;

        this.buffer = null;

        this.playhead = 0;

        this.analyser = null;

        this.timeData = null;
        this.frequencyData = null;

        this.lastValues = [];

        this.effect = "Normal";

        // Beat detection

        this.beatEnergy = 0;

        this.averageEnergy = 0;

        this.beatPulse = 0;

        this.lastBeatTime = 0;

    }



    initialize() {

        if (this.canvas) return;

        this.canvas =
            document.getElementById(
                "waveform"
            );

        if (!this.canvas) {

            console.error(
                "❌ Waveform canvas not found."
            );

            return;

        }

        this.ctx =
            this.canvas.getContext("2d");

    }


 
    async load(file) {

        this.initialize();

        if (
            !this.canvas ||
            !this.ctx
        ) {

            return;

        }

        try {

            const arrayBuffer =
                await file.arrayBuffer();


            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;


            const audioContext =
                new AudioContext();


            this.buffer =
                await audioContext.decodeAudioData(
                    arrayBuffer
                );


            await audioContext.close();


            this.playhead = 0;

            this.lastValues = [];

            this.beatEnergy = 0;

            this.averageEnergy = 0;

            this.beatPulse = 0;

            this.lastBeatTime = 0;


            this.draw();

        }
        catch (error) {

            console.error(
                "❌ Waveform loading failed:",
                error
            );

        }

    }


   
    setEffect(effect) {

        this.effect =
            effect || "Normal";

        this.draw();

    }



    update(
        progress,
        analyser = null
    ) {

        this.playhead =
            Math.max(
                0,
                Math.min(
                    1,
                    Number(progress) || 0
                )
            );


        if (analyser) {

            this.analyser =
                analyser;


            if (
                !this.timeData ||
                this.timeData.length !==
                analyser.fftSize
            ) {

                this.timeData =
                    new Uint8Array(
                        analyser.fftSize
                    );

            }


            if (
                !this.frequencyData ||
                this.frequencyData.length !==
                analyser.frequencyBinCount
            ) {

                this.frequencyData =
                    new Uint8Array(
                        analyser.frequencyBinCount
                    );

            }

        }


        this.draw();

    }


  
    detectBeat() {

        if (
            !this.analyser ||
            !this.frequencyData
        ) {

            return 0;

        }


        this.analyser.getByteFrequencyData(
            this.frequencyData
        );


     
        const bassEnd =
            Math.floor(
                this.frequencyData.length *
                0.15
            );


        let energy = 0;


        for (
            let i = 0;
            i < bassEnd;
            i++
        ) {

            energy +=
                this.frequencyData[i];

        }


        energy /=
            Math.max(
                1,
                bassEnd
            );


    
        this.averageEnergy =
            this.averageEnergy * 0.94 +
            energy * 0.06;


        const threshold =
            Math.max(
                45,
                this.averageEnergy * 1.35
            );


        const now =
            performance.now();


       
        if (
            energy > threshold &&
            now - this.lastBeatTime > 180
        ) {

            this.lastBeatTime =
                now;

            this.beatPulse =
                1;

        }


        this.beatPulse *=
            0.94;


        this.beatEnergy =
            energy;


        return this.beatPulse;

    }


   
    draw() {

        if (
            !this.canvas ||
            !this.ctx
        ) {

            return;

        }


        const width =
            this.canvas.clientWidth;


        const height =
            this.canvas.clientHeight;


        if (
            width <= 0 ||
            height <= 0
        ) {

            return;

        }


        const dpr =
            window.devicePixelRatio || 1;


        if (
            this.canvas.width !==
                Math.floor(width * dpr) ||
            this.canvas.height !==
                Math.floor(height * dpr)
        ) {

            this.canvas.width =
                Math.floor(
                    width * dpr
                );


            this.canvas.height =
                Math.floor(
                    height * dpr
                );

        }


        this.ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );


        this.ctx.clearRect(
            0,
            0,
            width,
            height
        );


        // =================================
        // BASIC SETTINGS
        // =================================

        const center =
            height / 2;


        let amplitude =
            height * 0.55;


        let glow =
            10;


        let lineWidth =
            2;


      
        if (
            this.effect === "Echo"
        ) {

            amplitude =
                height * 0.60;


            glow =
                13;


            lineWidth =
                2;

        }


        if (
            this.effect === "Bass Boost"
        ) {

            amplitude =
                height * 0.72;


            glow =
                15;


            lineWidth =
                2.2;

        }


       
        const pulse =
            this.detectBeat();


        /*
         * Beat expands the wave,
         * but more gently.
         */

        amplitude *=
            1 +
            pulse * 0.35;


        glow +=
            pulse * 12;


        lineWidth +=
            pulse * 1.2;


        
        if (
            this.analyser &&
            this.timeData
        ) {

            this.analyser.getByteTimeDomainData(
                this.timeData
            );


            const pointCount =
                Math.min(
                    Math.max(
                        2,
                        Math.floor(width)
                    ),
                    600
                );


            const points = [];


            for (
                let x = 0;
                x < pointCount;
                x++
            ) {

                const index =
                    Math.floor(
                        (
                            x /
                            (pointCount - 1)
                        ) *
                        (
                            this.timeData.length -
                            1
                        )
                    );


                const value =
                    (
                        this.timeData[index] -
                        128
                    ) / 128;


                const targetY =
                    center +
                    value * amplitude;


                const previous =
                    this.lastValues[x] ??
                    targetY;


              

                const smoothY =
                    previous +
                    (
                        targetY -
                        previous
                    ) * 0.12;


                this.lastValues[x] =
                    smoothY;


                points.push({

                    x:
                        (
                            x /
                            (pointCount - 1)
                        ) *
                        width,


                    y:
                        smoothY

                });

            }


            this.ctx.beginPath();


            if (
                points.length > 0
            ) {

                this.ctx.moveTo(
                    points[0].x,
                    points[0].y
                );


                for (
                    let i = 1;
                    i < points.length - 1;
                    i++
                ) {

                    const current =
                        points[i];


                    const next =
                        points[i + 1];


                    const midX =
                        (
                            current.x +
                            next.x
                        ) / 2;


                    const midY =
                        (
                            current.y +
                            next.y
                        ) / 2;


                    this.ctx.quadraticCurveTo(

                        current.x,
                        current.y,

                        midX,
                        midY

                    );

                }


                if (
                    points.length > 1
                ) {

                    const last =
                        points[
                            points.length - 1
                        ];


                    this.ctx.lineTo(
                        last.x,
                        last.y
                    );

                }

            }


            this.ctx.shadowBlur =
                glow;


            this.ctx.shadowColor =
                "#C66BFF";


            this.ctx.strokeStyle =
                "#C66BFF";


            this.ctx.lineWidth =
                lineWidth;


            this.ctx.lineCap =
                "round";


            this.ctx.lineJoin =
                "round";


            this.ctx.stroke();


            this.ctx.shadowBlur =
                0;

        }


       
        this.ctx.beginPath();


        this.ctx.strokeStyle =
            "rgba(255,255,255,0.08)";


        this.ctx.lineWidth =
            1;


        this.ctx.moveTo(
            0,
            center
        );


        this.ctx.lineTo(
            width,
            center
        );


        this.ctx.stroke();


        
        const playheadX =
            width *
            Math.max(
                0,
                Math.min(
                    1,
                    this.playhead
                )
            );


        this.ctx.beginPath();


        this.ctx.strokeStyle =
            "#FF4D8D";


        this.ctx.shadowBlur =
            8;


        this.ctx.shadowColor =
            "#FF4D8D";


        this.ctx.lineWidth =
            2;


        this.ctx.moveTo(
            playheadX,
            center - 32
        );


        this.ctx.lineTo(
            playheadX,
            center + 32
        );


        this.ctx.stroke();


    
        this.ctx.beginPath();


        this.ctx.shadowBlur =
            0;


        this.ctx.fillStyle =
            "#FF4D8D";


        this.ctx.arc(
            playheadX,
            center,
            4,
            0,
            Math.PI * 2
        );


        this.ctx.fill();

    }


   
    clear() {

        this.initialize();


        if (
            !this.ctx ||
            !this.canvas
        ) {

            return;

        }


        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );


        this.playhead = 0;

        this.lastValues = [];

        this.buffer = null;

        this.beatEnergy = 0;

        this.averageEnergy = 0;

        this.beatPulse = 0;

        this.lastBeatTime = 0;

    }

}


export default new Waveform();