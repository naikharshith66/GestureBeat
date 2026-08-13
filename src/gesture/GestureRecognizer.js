import GestureUtils from "./GestureUtils.js";

class GestureRecognizer {

    recognize(hand) {

        return {

            thumbOpen:
                this.isThumbOpen(hand),

            indexOpen:
                GestureUtils.isFingerOpen(
                    hand,
                    8,
                    6
                ),

            middleOpen:
                GestureUtils.isFingerOpen(
                    hand,
                    12,
                    10
                ),

            ringOpen:
                GestureUtils.isFingerOpen(
                    hand,
                    16,
                    14
                ),

            pinkyOpen:
                GestureUtils.isFingerOpen(
                    hand,
                    20,
                    18
                )

        };

    }


    isThumbOpen(hand) {

        const wrist = hand[0];

        const thumbTip = hand[4];

        const thumbIP = hand[3];

        const indexMCP = hand[5];


        const handSize =
            GestureUtils.distance(
                wrist,
                hand[9]
            );


        const tipToIndex =
            GestureUtils.distance(
                thumbTip,
                indexMCP
            );


        const tipToWrist =
            GestureUtils.distance(
                thumbTip,
                wrist
            );


        const ipToWrist =
            GestureUtils.distance(
                thumbIP,
                wrist
            );


        return (

            tipToWrist >
            ipToWrist * 1.10

            &&

            tipToIndex >
            handSize * 0.45

        );

    }


    isOKGesture(hand) {

        const thumbTip = hand[4];

        const indexTip = hand[8];


        const handSize =
            GestureUtils.distance(
                hand[0],
                hand[9]
            );


        const distance =
            GestureUtils.distance(
                thumbTip,
                indexTip
            );


        return (
            distance <
            handSize * 0.30
        );

    }

}


export default new GestureRecognizer();