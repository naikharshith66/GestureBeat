export default class Dashboard {

    render() {

        return `
        
        <div class="dashboard">

            <header>

                <div class="logo">

                    🎵 GestureBeat

                </div>

                <div class="stats">

                    <div class="card">

                        <h3>FPS</h3>

                        <span id="fps">0</span>

                    </div>

                    <div class="card">

                        <h3>Hands</h3>

                        <span id="hands">0</span>

                    </div>

                    <div class="card">

                        <h3>Gesture</h3>

                        <span id="gesture">None</span>

                    </div>

                </div>

            </header>

            <main>

                <div class="camera-panel">

                    <video
                        id="video"
                        autoplay
                        playsinline
                        muted
                    ></video>

                    <canvas id="canvas"></canvas>

                </div>

                <div class="sidebar">

                    <button id="startCamera">
                        📷 Start Camera
                    </button>

                    <button id="loadSong">
                        🎵 Load Song
                    </button>

                    <button id="record">
                        ⏺ Record
                    </button>

                    <button id="export">
                        📤 Export
                    </button>

                </div>

            </main>

        </div>

        `;

    }

}