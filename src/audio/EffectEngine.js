class EffectEngine {

    constructor() {

        this.audioContext = null;

        this.source = null;

        this.analyser = null;

        this.input = null;

        this.echo = null;

        this.bassFilter = null;

        this.currentEffect = "Normal";

    }


    initialize(
        audioContext,
        source,
        analyser
    ) {

        this.audioContext = audioContext;

        this.source = source;

        this.analyser = analyser;


        this.input =
            this.audioContext.createGain();



        this.source.connect(
            this.input
        );


        this.createEcho();

        this.createBassBoost();


      
        this.setNormal();


        console.log(
            "🎛️ EffectEngine Ready"
        );

    }



    createEcho() {

        const ctx =
            this.audioContext;


        const delay =
            ctx.createDelay(5);

        delay.delayTime.value =
            0.28;


        const feedback =
            ctx.createGain();

        feedback.gain.value =
            0.35;


        const wet =
            ctx.createGain();

        wet.gain.value =
            0;


        const dry =
            ctx.createGain();

        dry.gain.value =
            1;


   

        this.input.connect(
            dry
        );


        

        this.input.connect(
            delay
        );



        delay.connect(
            feedback
        );


  

        feedback.connect(
            delay
        );



        delay.connect(
            wet
        );



        dry.connect(
            this.analyser
        );

        wet.connect(
            this.analyser
        );


        this.echo = {

            delay,

            feedback,

            wet,

            dry

        };

    }



    createBassBoost() {

        const ctx =
            this.audioContext;




        this.bassFilter =
            ctx.createBiquadFilter();


        this.bassFilter.type =
            "lowshelf";


        this.bassFilter.frequency.value =
            180;



        this.bassFilter.gain.value =
            0;



        this.input.connect(
            this.bassFilter
        );


        this.bassFilter.connect(
            this.analyser
        );

    }



    setNormal() {

        if (!this.echo) return;

   
        this.echo.dry.gain.value =
            1;

        this.echo.wet.gain.value =
            0;


      

        if (this.bassFilter) {

            this.bassFilter.gain.value =
                0;

        }


        this.currentEffect =
            "Normal";


        console.log(
            "◉ Effect: NORMAL"
        );

    }


    setEcho() {

        if (!this.echo) return;


     

        this.echo.dry.gain.value =
            0.85;


    

        this.echo.wet.gain.value =
            0.5;



        if (this.bassFilter) {

            this.bassFilter.gain.value =
                0;

        }


        this.currentEffect =
            "Echo";


        console.log(
            "✌️ Effect: ECHO"
        );

    }


    setBassBoost() {

        if (!this.bassFilter) return;


        this.bassFilter.gain.value =
            12;


        

        if (this.echo) {

            this.echo.dry.gain.value =
                1;

            this.echo.wet.gain.value =
                0;

        }


        this.currentEffect =
            "Bass Boost";


        console.log(
            "👍 Effect: BASS BOOST"
        );

    }



    reset() {

        this.setNormal();

        console.log(
            "👌 Effects reset"
        );

    }

}


export default new EffectEngine();