import GestureUtils from "./GestureUtils.js";

class GestureClassifier {

    classify(hand) {

        if (this.isOpenPalm(hand))
            return "Open Palm";

        if (this.isFist(hand))
            return "Fist";

        if (this.isPeace(hand))
            return "Peace";

        return "Unknown";
    }

    isOpenPalm(hand) {

        return (
            GestureUtils.isFingerOpen(hand,8,6) &&
            GestureUtils.isFingerOpen(hand,12,10) &&
            GestureUtils.isFingerOpen(hand,16,14) &&
            GestureUtils.isFingerOpen(hand,20,18)
        );

    }

    isFist(hand) {

        return (
            GestureUtils.isFingerClosed(hand,8,6) &&
            GestureUtils.isFingerClosed(hand,12,10) &&
            GestureUtils.isFingerClosed(hand,16,14) &&
            GestureUtils.isFingerClosed(hand,20,18)
        );

    }

    isPeace(hand) {

        return (

            GestureUtils.isFingerOpen(hand,8,6) &&
            GestureUtils.isFingerOpen(hand,12,10) &&

            GestureUtils.isFingerClosed(hand,16,14) &&
            GestureUtils.isFingerClosed(hand,20,18)

        );

    }

}

export default new GestureClassifier();