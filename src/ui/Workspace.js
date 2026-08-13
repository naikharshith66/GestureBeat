export default class Workspace {

    render() {

        return `

        <section class="workspace">

            <div class="camera-container">

                <!-- CAMERA -->

                <video
                    id="video"
                    autoplay
                    playsinline
                    muted
                ></video>


                <!-- HAND LANDMARKS -->

                <canvas id="canvas"></canvas>


                <!-- LEFT EFFECT PANEL -->

                <div class="effects-panel">

                    <div class="panel-title">
                        🎚️ Effects
                    </div>


                    <div
                        class="effect-item active"
                        id="effectNormal"
                    >
                        ◉ Normal
                    </div>


                    <div
                        class="effect-item"
                        id="effectEcho"
                    >
                        ♫ Echo
                    </div>


                    <div
                        class="effect-item"
                        id="effectBass"
                    >
                        ≋ Bass
                    </div>


                    <div
                        class="effect-item"
                        id="effectReverb"
                    >
                        ✦ Reverb
                    </div>

                </div>


                <!-- RIGHT GESTURE PANEL -->

                <div class="gestures-panel">

                    <div class="panel-title">
                        🖐 Gestures
                    </div>


                    <div class="gesture-item">

                        <span>✋</span>

                        <div>
                            <strong>Open Palm</strong>
                            <small>Play</small>
                        </div>

                    </div>


                    <div class="gesture-item">

                        <span>✊</span>

                        <div>
                            <strong>Fist</strong>
                            <small>Pause</small>
                        </div>

                    </div>


                    <div
                        class="gesture-item"
                        id="gestureEcho"
                    >

                        <span>✌️</span>

                        <div>
                            <strong>Peace</strong>
                            <small>Echo</small>
                        </div>

                    </div>


                    <div
                        class="gesture-item"
                        id="gestureBass"
                    >

                        <span>👍</span>

                        <div>
                            <strong>Thumbs Up</strong>
                            <small>Bass Boost</small>
                        </div>

                    </div>


                    <div class="gesture-item">

                        <span>👌</span>

                        <div>
                            <strong>OK</strong>
                            <small>Reset</small>
                        </div>

                    </div>

                </div>


                <!-- LIVE TRANSPARENT WAVEFORM -->

                <div class="waveform-overlay">

                    <canvas id="waveform"></canvas>

                </div>


                <!-- CURRENT EFFECT -->

                <div
                    class="effect-status"
                    id="effectStatus"
                >

                    <div
                        class="effect-gesture"
                        id="effectGesture"
                    >
                        ✋
                    </div>


                    <div
                        class="effect-name"
                        id="currentEffect"
                    >
                        NORMAL
                    </div>


                    <div class="effect-value">

                        Effect:

                        <span id="effectAmount">
                            0%
                        </span>

                    </div>

                </div>

            </div>

        </section>

        `;

    }

}