import GestureClassifier from "./GestureClassifier.js";

class GestureEngine {

    detect(result) {

        if (!result.landmarks || result.landmarks.length === 0) {
            return "None";
        }

        const hand = result.landmarks[0];

        return GestureClassifier.classify(hand);
    }

}

export default new GestureEngine();