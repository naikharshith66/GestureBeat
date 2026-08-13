import GestureRecognizer from "./GestureRecognizer.js";
import GestureTypes from "./GestureTypes.js";

class GestureClassifier {

    classify(hand) {

        const g =
            GestureRecognizer.recognize(hand);


        if (
            GestureRecognizer.isOKGesture(hand) &&
            g.middleOpen &&
            g.ringOpen &&
            g.pinkyOpen
        ) {

            return GestureTypes.OK;

        }


        
        if (
            g.thumbOpen &&
            g.indexOpen &&
            g.middleOpen &&
            g.ringOpen &&
            g.pinkyOpen
        ) {

            return GestureTypes.OPEN_PALM;

        }


        if (
            g.thumbOpen &&
            !g.indexOpen &&
            !g.middleOpen &&
            !g.ringOpen &&
            !g.pinkyOpen
        ) {

            return GestureTypes.THUMBS_UP;

        }


        if (
            g.indexOpen &&
            g.middleOpen &&
            !g.ringOpen &&
            !g.pinkyOpen
        ) {

            return GestureTypes.PEACE;

        }


        if (
            !g.thumbOpen &&
            !g.indexOpen &&
            !g.middleOpen &&
            !g.ringOpen &&
            !g.pinkyOpen
        ) {

            return GestureTypes.FIST;

        }


        return GestureTypes.UNKNOWN;

    }

}

export default new GestureClassifier();