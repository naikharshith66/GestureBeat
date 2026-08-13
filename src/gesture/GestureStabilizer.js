class GestureStabilizer {

    constructor() {

        this.currentGesture = "None";
        this.stableGesture = "None";

        this.count = 0;

        this.requiredFrames = 5;

    }

    update(gesture) {

        if (gesture === this.currentGesture) {

            this.count++;

        } else {

            
            this.currentGesture = gesture;

            this.count = 1;

        }

        if (
            this.count >= this.requiredFrames &&
            this.stableGesture !== gesture
        ) {

            this.stableGesture = gesture;

        }

        return this.stableGesture;

    }

}

export default new GestureStabilizer();