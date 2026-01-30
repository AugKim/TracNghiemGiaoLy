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

export const QuizSounds = {
    _muted: false,

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
        return this._muted;
    },

    /** Kích hoạt AudioContext (gọi sau lần click đầu – chính sách trình duyệt) */
    resume() {
        try {
            const ctx = getContext();
            if (ctx.state === 'suspended') ctx.resume();
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
