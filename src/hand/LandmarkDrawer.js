const HAND_CONNECTIONS = [
    [0,1],[1,2],[2,3],[3,4],
    [0,5],[5,6],[6,7],[7,8],
    [5,9],[9,10],[10,11],[11,12],
    [9,13],[13,14],[14,15],[15,16],
    [13,17],[17,18],[18,19],[19,20],
    [0,17]
];

class LandmarkDrawer {

    constructor() {

        this.canvas = null;
        this.ctx = null;

    }

    initialize() {

        console.log("Initializing drawer...");

        this.canvas = document.getElementById("canvas");

        console.log("Canvas:", this.canvas);

        if (!this.canvas) {
            console.error("Canvas not found!");
            return;
        }

        this.ctx = this.canvas.getContext("2d");

    }

    
    draw(result, video) {

        this.initialize();

        if (!this.canvas || !this.ctx) return;

        if (!result.landmarks) return;

        this.canvas.width = video.videoWidth;
        this.canvas.height = video.videoHeight;

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        for (const hand of result.landmarks) {

            this.ctx.strokeStyle = "white";
            this.ctx.lineWidth = 3;

            for (const [a, b] of HAND_CONNECTIONS) {

                const p1 = hand[a];
                const p2 = hand[b];

                this.ctx.beginPath();

                this.ctx.moveTo(
                    p1.x * this.canvas.width,
                    p1.y * this.canvas.height
                );

                this.ctx.lineTo(
                    p2.x * this.canvas.width,
                    p2.y * this.canvas.height
                );

                this.ctx.stroke();
            }

            this.ctx.fillStyle = "#00FFFF";

            for (const p of hand) {

                this.ctx.beginPath();

                this.ctx.arc(
                    p.x * this.canvas.width,
                    p.y * this.canvas.height,
                    5,
                    0,
                    Math.PI * 2
                );

                this.ctx.fill();

            }
        }
    }

}

export default new LandmarkDrawer();