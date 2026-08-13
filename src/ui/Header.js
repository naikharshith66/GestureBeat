export default class Header {

    render() {

        return `

        <header class="header">

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

        `;

    }

}