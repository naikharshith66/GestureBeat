export default class LandmarkDrawer {

    constructor(canvas){

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

    }

    clear(){

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

    }

    drawHand(landmarks){

        const ctx=this.ctx;

        const w=this.canvas.width;
        const h=this.canvas.height;

        const connections=[

            [0,1],[1,2],[2,3],[3,4],

            [0,5],[5,6],[6,7],[7,8],

            [5,9],[9,10],[10,11],[11,12],

            [9,13],[13,14],[14,15],[15,16],

            [13,17],[17,18],[18,19],[19,20],

            [0,17]

        ];

        ctx.strokeStyle="white";
        ctx.lineWidth=3;

        for(const [a,b] of connections){

            ctx.beginPath();

            ctx.moveTo(
                landmarks[a].x*w,
                landmarks[a].y*h
            );

            ctx.lineTo(
                landmarks[b].x*w,
                landmarks[b].y*h
            );

            ctx.stroke();

        }

        ctx.fillStyle="#00ffff";

        for(const point of landmarks){

            ctx.beginPath();

            ctx.arc(
                point.x*w,
                point.y*h,
                5,
                0,
                Math.PI*2
            );

            ctx.fill();

        }

    }

}