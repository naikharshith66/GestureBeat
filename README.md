# GestureSongs

GestureSongs is a browser-based music player that lets you control music using **hand gestures** through your webcam.

It combines:

- Webcam hand tracking
- MediaPipe hand landmarks
- Web Audio API
- Audio effects
- Live audio waveform
- Beat-reactive visualization
- Gesture-based UI feedback

The goal is to create a hands-free and interactive music experience.

---

## Features

### Gesture Controls

| Gesture | Action |
|---|---|
| ✋ Open Palm | Play |
| ✊ Fist | Pause |
| ✌️ Peace | Echo |
| 👍 Thumbs Up | Bass Boost |
| 👌 OK | Reset effects |

Gesture detection includes stabilization to prevent accidental actions when moving between gestures.

---

## 🎛️ Audio Effects

### Normal
Returns the audio to its normal state.

### Echo
Adds a delay and feedback effect to the music.

### Bass Boost
Boosts low frequencies using a low-shelf audio filter.

---

## Live Waveform

GestureSongs includes a live waveform that reacts to the currently playing audio.

The waveform:

- Moves with the music
- Uses the Web Audio analyser
- Reacts more strongly to bass/beat energy
- Changes its visual intensity depending on the active effect
- Includes a moving playback indicator

---

## Beat-Reactive Visualization

The waveform also performs basic beat detection using frequency data from the Web Audio analyser.

When stronger bass energy is detected:

- The waveform expands
- The glow increases
- The line becomes slightly stronger

This creates a visual pulse that follows the music.

---

## Camera

The webcam view is mirrored to behave like a normal selfie camera.

MediaPipe Hand Landmarker tracks the hand and provides the landmarks used by the gesture recognition system.

---

## How It Works

The application follows this general pipeline:

```text
Webcam
   ↓
MediaPipe Hand Landmarker
   ↓
Hand Landmarks
   ↓
Gesture Classifier
   ↓
Gesture Engine
   ↓
Gesture Actions
   ↓
┌─────────────────┬─────────────────┐
│                 │                 │
▼                 ▼                 ▼
AudioEngine    EffectEngine     UI Updates
│                 │
▼                 ▼
Web Audio API → Analyser
                  │
                  ▼
              Waveform
                  │
                  ▼
          Beat Visualization