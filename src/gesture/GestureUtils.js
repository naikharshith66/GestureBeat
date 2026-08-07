class GestureUtils {

    isFingerOpen(hand, tip, pip) {

        return hand[tip].y < hand[pip].y;

    }

    isFingerClosed(hand, tip, pip) {

        return hand[tip].y > hand[pip].y;

    }

    distance(a, b) {

        return Math.sqrt(

            (a.x - b.x) ** 2 +

            (a.y - b.y) ** 2 +

            (a.z - b.z) ** 2

        );

    }

}

export default new GestureUtils();