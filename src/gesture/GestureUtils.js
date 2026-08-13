class GestureUtils {

    isFingerOpen(hand, tip, pip) {

        const wrist = hand[0];

        const tipPoint = hand[tip];

        const pipPoint = hand[pip];

        if (!wrist || !tipPoint || !pipPoint) {
            return false;
        }

        const tipDistance =
            this.distance(
                wrist,
                tipPoint
            );

        const pipDistance =
            this.distance(
                wrist,
                pipPoint
            );

        return (
            tipDistance >
            pipDistance * 1.08
        );

    }


    isFingerClosed(hand, tip, pip) {

        const wrist = hand[0];

        const tipPoint = hand[tip];

        const pipPoint = hand[pip];

        if (!wrist || !tipPoint || !pipPoint) {
            return true;
        }

        const tipDistance =
            this.distance(
                wrist,
                tipPoint
            );

        const pipDistance =
            this.distance(
                wrist,
                pipPoint
            );

        return (
            tipDistance <=
            pipDistance * 1.08
        );

    }


    distance(a, b) {

        const dx =
            a.x - b.x;

        const dy =
            a.y - b.y;

        const dz =
            (a.z || 0) -
            (b.z || 0);

        return Math.sqrt(
            dx * dx +
            dy * dy +
            dz * dz
        );

    }

}


export default new GestureUtils();