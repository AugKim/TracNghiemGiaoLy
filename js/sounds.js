/**
 * SOUNDS - Âm thanh kịch tính cho đề thi (Web Audio API, không cần file ngoài)
 */

const STORAGE_KEY = 'quizSoundMuted';

function getContext() {
    if (!getContext.ctx) {
        getContext.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return getContext.ctx;
}

/** Phát một nốt đơn */
function playTone(frequency, durationMs, type = 'sine', volume = 0.25) {
    try {
        const ctx = getContext();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = frequency;
        osc.type = type;
        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + durationMs / 1000);
        osc.start(now);
        osc.stop(now + durationMs / 1000);
    } catch (_) {}
}

/** Hai nốt nhanh (cao rồi cao hơn) */
function playTwoTones(f1, f2, durationMs = 120, volume = 0.22) {
    try {
        const ctx = getContext();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        const gap = durationMs / 1000;
        [f1, f2].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = freq;
            osc.type = 'sine';
            const t = now + i * gap * 0.6;
            gain.gain.setValueAtTime(volume, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + gap);
            osc.start(t);
            osc.stop(t + gap);
        });
    } catch (_) {}
}

/** Hai nốt ngắn liên tiếp (lub-dub) – hiệu ứng nhịp tim hồi hộp */
function playHeartbeat(volume = 0.12) {
    try {
        const ctx = getContext();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        const dur = 0.08;
        [[165, now], [140, now + 0.12]].forEach(([freq, t]) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.connect(g);
            g.connect(ctx.destination);
            osc.frequency.value = freq;
            osc.type = 'sine';
            g.gain.setValueAtTime(volume, t);
            g.gain.exponentialRampToValueAtTime(0.01, t + dur);
            osc.start(t);
            osc.stop(t + dur);
        });
    } catch (_) {}
}

/** Đường dẫn file nhạc nền kịch tính (đặt file MP3 vào thư mục audio/) */
const BG_MUSIC_URL = 'audio/background.mp3';

export const QuizSounds = {
    _muted: false,
    _bgMusic: null,
    _bgDrone: null,
    _bgDroneHigh: null,
    _bgPulseInterval: null,

    init() {
        try {
            this._muted = localStorage.getItem(STORAGE_KEY) === '1';
        } catch (_) {
            this._muted = false;
        }
    },

    isMuted() {
        return this._muted;
    },

    setMuted(muted) {
        this._muted = !!muted;
        try {
            localStorage.setItem(STORAGE_KEY, this._muted ? '1' : '0');
        } catch (_) {}
    },

    toggleMuted() {
        this.setMuted(!this._muted);
        if (this._muted) this.stopBackgroundMusic();
        return this._muted;
    },

    /** Kích hoạt AudioContext (gọi sau lần click đầu – chính sách trình duyệt) */
    resume() {
        try {
            const ctx = getContext();
            if (ctx.state === 'suspended') ctx.resume();
        } catch (_) {}
    },

    /** Nhạc nền khi làm bài: ưu tiên file MP3 kịch tính (audio/background.mp3), không có thì dùng nhạc tổng hợp. */
    startBackgroundMusic() {
        if (this._muted) return;
        this.stopBackgroundMusic();
        const self = this;
        if (!this._bgMusic) {
            this._bgMusic = new Audio(BG_MUSIC_URL);
            this._bgMusic.loop = true;
            this._bgMusic.volume = 0.45;
            this._bgMusic.addEventListener('error', () => {
                self._startSynthesizedBackground();
            });
        }
        this._bgMusic.currentTime = 0;
        const p = this._bgMusic.play();
        if (p && typeof p.catch === 'function') {
            p.catch(() => self._startSynthesizedBackground());
        }
    },

    /** Nhạc tổng hợp (drone + nhịp tim) khi không có file MP3. */
    _startSynthesizedBackground() {
        if (this._muted || this._bgDrone) return;
        try {
            this.resume();
            const ctx = getContext();
            const now = ctx.currentTime;
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.14, now);
            gain.connect(ctx.destination);
            const drone = ctx.createOscillator();
            drone.type = 'sine';
            drone.frequency.value = 55;
            drone.connect(gain);
            drone.start(now);
            this._bgDrone = { osc: drone, gain };
            const gainHigh = ctx.createGain();
            gainHigh.gain.setValueAtTime(0.06, now);
            gainHigh.connect(ctx.destination);
            const droneHigh = ctx.createOscillator();
            droneHigh.type = 'sine';
            droneHigh.frequency.value = 330;
            droneHigh.connect(gainHigh);
            droneHigh.start(now);
            this._bgDroneHigh = { osc: droneHigh, gain: gainHigh };
            const self = this;
            this._bgPulseInterval = setInterval(() => {
                if (self._muted) return;
                playHeartbeat(0.14);
            }, 1600);
        } catch (_) {}
    },

    stopBackgroundMusic() {
        try {
            if (this._bgMusic) {
                this._bgMusic.pause();
                this._bgMusic.currentTime = 0;
            }
            if (this._bgDrone) {
                this._bgDrone.osc.stop();
                this._bgDrone.osc.disconnect();
                this._bgDrone = null;
            }
            if (this._bgDroneHigh) {
                this._bgDroneHigh.osc.stop();
                this._bgDroneHigh.osc.disconnect();
                this._bgDroneHigh = null;
            }
            if (this._bgPulseInterval !== null) {
                clearInterval(this._bgPulseInterval);
                this._bgPulseInterval = null;
            }
        } catch (_) {}
    },

    /** Bắt đầu đề thi */
    playStart() {
        if (this._muted) return;
        this.resume();
        playTwoTones(523, 659, 150);
    },

    /** Đáp án đúng */
    playCorrect() {
        if (this._muted) return;
        this.resume();
        playTwoTones(523, 659, 130);
    },

    /** Đáp án sai */
    playWrong() {
        if (this._muted) return;
        this.resume();
        playTone(200, 180, 'sawtooth', 0.15);
    },

    /** Cảnh báo còn 1 phút */
    playWarning() {
        if (this._muted) return;
        this.resume();
        playTone(400, 200, 'sine', 0.2);
    },

    /** Tick khi còn ≤10 giây */
    playTick() {
        if (this._muted) return;
        this.resume();
        playTone(600, 60, 'sine', 0.12);
    },

    /** Hết giờ */
    playTimeUp() {
        if (this._muted) return;
        this.resume();
        playTone(250, 400, 'sawtooth', 0.18);
    },

    /** Kết thúc bài (làm xong hoặc nộp bài) – kết quả tốt */
    playResultGood() {
        if (this._muted) return;
        this.resume();
        playTwoTones(523, 784, 180);
    },

    /** Kết thúc bài – kết quả cần cố gắng */
    playResultOkay() {
        if (this._muted) return;
        this.resume();
        playTone(440, 200, 'sine', 0.2);
    }
};
