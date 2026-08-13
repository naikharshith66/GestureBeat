import AudioEngine from "../audio/AudioEngine.js";
import EffectEngine from "../audio/EffectEngine.js";
import Waveform from "../audio/Waveform.js";
import GestureTypes from "./GestureTypes.js";


class GestureActions {

    constructor() {

        this.lastActionGesture =
            GestureTypes.NONE;

    }


    handle(gesture) {

        if (!gesture) return;



        if (
            gesture === this.lastActionGesture
        ) {

            return;

        }


        this.lastActionGesture =
            gesture;


     

        this.updateGesturePanel(
            gesture
        );


 
        if (
            gesture === GestureTypes.OPEN_PALM
        ) {

            console.log(
                "✋ Open Palm → PLAY + NORMAL"
            );


            if (AudioEngine.song) {

                AudioEngine.play();

            }


            Waveform.setEffect(
                "Normal"
            );


            this.updateEffectPanel(
                "Normal"
            );


            this.updateEffectUI(
                "✋",
                "PLAY",
                0
            );

        }


        else if (
            gesture === GestureTypes.FIST
        ) {

            console.log(
                "✊ Fist → PAUSE"
            );


            if (AudioEngine.song) {

                AudioEngine.pause();

            }


            this.updateEffectUI(
                "✊",
                "PAUSED",
                0
            );

        }


        else if (
            gesture === GestureTypes.PEACE
        ) {

            console.log(
                "✌️ Peace → ECHO"
            );


            if (AudioEngine.song) {

                EffectEngine.setEcho();

            }



            Waveform.setEffect(
                "Echo"
            );


            this.updateEffectPanel(
                "Echo"
            );


            this.updateEffectUI(
                "✌️",
                "ECHO",
                50
            );

        }


        else if (
            gesture === GestureTypes.THUMBS_UP
        ) {

            console.log(
                "👍 Thumbs Up → BASS BOOST"
            );


            if (AudioEngine.song) {

                EffectEngine.setBassBoost();

            }


            Waveform.setEffect(
                "Bass Boost"
            );


            this.updateEffectPanel(
                "Bass Boost"
            );


            this.updateEffectUI(
                "👍",
                "BASS BOOST",
                70
            );

        }


     
        else if (
            gesture === GestureTypes.OK
        ) {

            console.log(
                "👌 OK → RESET"
            );


            if (AudioEngine.song) {


                EffectEngine.reset();


                AudioEngine.audio.volume =
                    1;

            }


           
            Waveform.setEffect(
                "Normal"
            );


            this.updateEffectPanel(
                "Normal"
            );


            this.updateEffectUI(
                "👌",
                "NORMAL",
                0
            );

        }


   
        else if (
            gesture === GestureTypes.NONE ||
            gesture === GestureTypes.UNKNOWN
        ) {

            console.log(
                "🤚 No active gesture"
            );

        }

    }


  
    updateGesturePanel(gesture) {

        const items =
            document.querySelectorAll(
                ".gesture-item"
            );


      
        items.forEach(item => {

            item.classList.remove(
                "active"
            );

        });


        let target = null;


        items.forEach(item => {

            const text =
                item.textContent
                    .trim()
                    .toLowerCase();


            if (
                gesture ===
                GestureTypes.OPEN_PALM &&
                text.includes("open palm")
            ) {

                target = item;

            }


            else if (
                gesture ===
                GestureTypes.FIST &&
                text.includes("fist")
            ) {

                target = item;

            }


            else if (
                gesture ===
                GestureTypes.PEACE &&
                text.includes("peace")
            ) {

                target = item;

            }


            else if (
                gesture ===
                GestureTypes.THUMBS_UP &&
                text.includes("thumbs up")
            ) {

                target = item;

            }


            else if (
                gesture ===
                GestureTypes.OK &&
                text.includes("ok")
            ) {

                target = item;

            }

        });


        if (target) {

            target.classList.add(
                "active"
            );

        }

    }


  
    updateEffectPanel(effect) {

        const items =
            document.querySelectorAll(
                ".effect-item"
            );


        // Remove previous highlight

        items.forEach(item => {

            item.classList.remove(
                "active"
            );

        });


        let target = null;


        items.forEach(item => {

            const text =
                item.textContent
                    .trim()
                    .toLowerCase();


            if (
                effect === "Normal" &&
                text.includes("normal")
            ) {

                target = item;

            }


            else if (
                effect === "Echo" &&
                text.includes("echo")
            ) {

                target = item;

            }


            else if (
                effect === "Bass Boost" &&
                text.includes("bass boost")
            ) {

                target = item;

            }


            else if (
                effect === "Reverb" &&
                text.includes("reverb")
            ) {

                target = item;

            }

        });


        if (target) {

            target.classList.add(
                "active"
            );

        }

    }


  
    updateEffectUI(
        icon,
        name,
        amount
    ) {

        const gestureElement =
            document.getElementById(
                "effectGesture"
            );


        const effectElement =
            document.getElementById(
                "currentEffect"
            );


        const amountElement =
            document.getElementById(
                "effectAmount"
            );


        const progressElement =
            document.getElementById(
                "effectProgress"
            );


        if (gestureElement) {

            gestureElement.textContent =
                icon;

        }


        if (effectElement) {

            effectElement.textContent =
                name;

        }


        if (amountElement) {

            amountElement.textContent =
                amount + "%";

        }


        if (progressElement) {

            progressElement.style.width =
                amount + "%";

        }

    }

}


export default new GestureActions();