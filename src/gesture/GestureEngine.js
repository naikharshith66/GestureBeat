import GestureClassifier from "./GestureClassifier.js";

class GestureEngine {

    constructor() {

        this.currentGesture = "None";

        this.candidateGesture = "None";

        this.candidateFrames = 0;

        // Gesture must remain stable for this many
        // frames before changing.
        this.requiredFrames = 5;

        // Fist gets extra protection because it
        // controls PAUSE.
        this.fistRequiredFrames = 8;

    }


    detect(result) {

        // No hand detected
        if (
            !result ||
            !result.landmarks ||
            result.landmarks.length === 0
        ) {

            return this.currentGesture;

        }


        const hand =
            result.landmarks[0];


        const detected =
            GestureClassifier.classify(hand);


        // =====================================
        // SAME AS CURRENT GESTURE
        // =====================================

        if (
            detected === this.currentGesture
        ) {

            this.candidateGesture =
                detected;

            this.candidateFrames = 0;

            return this.currentGesture;

        }


        // =====================================
        // NEW CANDIDATE
        // =====================================

        if (
            detected !==
            this.candidateGesture
        ) {

            this.candidateGesture =
                detected;

            this.candidateFrames = 1;

            return this.currentGesture;

        }


        // =====================================
        // SAME CANDIDATE → COUNT FRAMES
        // =====================================

        this.candidateFrames++;


        const requiredFrames =
            detected === "Fist"
                ? this.fistRequiredFrames
                : this.requiredFrames;


        // =====================================
        // GESTURE IS NOW STABLE
        // =====================================

        if (
            this.candidateFrames >=
            requiredFrames
        ) {

            this.currentGesture =
                detected;

            this.candidateFrames = 0;

        }


        return this.currentGesture;

    }


    reset() {

        this.currentGesture =
            "None";

        this.candidateGesture =
            "None";

        this.candidateFrames =
            0;

    }

}


export default new GestureEngine();