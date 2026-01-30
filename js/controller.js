/**
 * CONTROLLER - Điều phối giữa Model và View, xử lý sự kiện người dùng
 */

import { QuizModel } from './model.js';
import { QuizView, Selectors } from './view.js';
import { QuizSounds } from './sounds.js';

export const QuizController = {
    /** Đề thi đang được chọn trên trang index (id hoặc null) */
    selectedExamId: null,

    /** ID setInterval đồng hồ đếm ngược (clear khi hết giờ hoặc kết thúc bài) */
    timerIntervalId: null,

    init() {
        QuizSounds.init();
        this.renderStartScreen();
        QuizView.updateSoundToggle(QuizSounds.isMuted());
        this.bindStartButton();
        this.bindNextButton();
        this.bindRestartButton();
        this.bindSoundToggle();
    },

    bindSoundToggle() {
        const btn = document.querySelector('.sound-toggle');
        if (btn) {
            btn.addEventListener('click', () => {
                const muted = QuizSounds.toggleMuted();
                QuizView.updateSoundToggle(muted);
            });
        }
    },

    /** Render màn hình bắt đầu: danh sách đề thi */
    renderStartScreen() {
        const exams = QuizModel.getExams();
        QuizView.renderExamList(exams, this.selectedExamId, (examId) => this.onSelectExam(examId));
    },

    /** Khi user chọn một đề thi */
    onSelectExam(examId) {
        this.selectedExamId = examId;
        QuizView.renderExamList(QuizModel.getExams(), this.selectedExamId, (id) => this.onSelectExam(id));
    },

    bindStartButton() {
        const startBtn = document.querySelector(Selectors.startBtn);
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startQuiz());
        }
    },

    bindNextButton() {
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }
    },

    bindRestartButton() {
        const restartBtn = document.querySelector('.restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.restartQuiz());
        }
    },

    startQuiz() {
        if (!this.selectedExamId) {
            alert('Vui lòng chọn một đề thi trước khi bắt đầu!');
            return;
        }
        if (!QuizModel.loadExam(this.selectedExamId)) {
            alert('Không tìm thấy đề thi. Vui lòng chọn lại.');
            return;
        }
        QuizModel.reset();
        QuizView.showScreen('quiz');
        this.showCurrentQuestion();
        this.startTimer();
        QuizSounds.playStart();
        QuizSounds.startBackgroundMusic();
    },

    startTimer() {
        this.stopTimer();
        QuizView.updateTimerDisplay(QuizModel.getRemainingSeconds());
        this.timerIntervalId = setInterval(() => {
            const remaining = QuizModel.decrementTime();
            if (remaining === 60) QuizSounds.playWarning();
            if (remaining > 0 && remaining <= 10) QuizSounds.playTick();
            QuizView.updateTimerDisplay(remaining);
            if (QuizModel.isTimeUp()) {
                this.stopTimer();
                this.showResult();
            }
        }, 1000);
    },

    stopTimer() {
        if (this.timerIntervalId !== null) {
            clearInterval(this.timerIntervalId);
            this.timerIntervalId = null;
        }
    },

    showCurrentQuestion() {
        const question = QuizModel.getCurrentQuestion();
        if (!question) return;

        QuizView.renderQuestion(
            question,
            QuizModel.state.currentQuestionIndex,
            QuizModel.getQuestionCount(),
            (index) => this.onAnswerSelect(index)
        );
    },

    onAnswerSelect(index) {
        if (QuizModel.getSelectedAnswer() !== null) return;

        QuizModel.setSelectedAnswer(index);
        const question = QuizModel.getCurrentQuestion();

        QuizView.updateAnswerFeedback(question.correct, index);

        if (QuizModel.isCorrectAnswer(index)) {
            QuizModel.addScore(10);
            QuizSounds.playCorrect();
        } else {
            QuizSounds.playWrong();
        }
    },

    nextQuestion() {
        QuizModel.nextQuestion();

        if (QuizModel.hasMoreQuestions()) {
            this.showCurrentQuestion();
        } else {
            this.showResult();
        }
    },

    showResult() {
        this.stopTimer();
        QuizSounds.stopBackgroundMusic();
        QuizView.showScreen('result');
        const resultInfo = QuizModel.getResultInfo();
        QuizView.renderResult(resultInfo);
        if (resultInfo.timeUp) {
            QuizSounds.playTimeUp();
        } else {
            const maxScore = QuizModel.getMaxScore();
            const pct = maxScore > 0 ? (resultInfo.score / maxScore) * 100 : 0;
            if (pct >= 70) QuizSounds.playResultGood();
            else QuizSounds.playResultOkay();
        }
    },

    restartQuiz() {
        this.stopTimer();
        QuizSounds.stopBackgroundMusic();
        QuizView.showScreen('start');
        this.renderStartScreen();
    }
};
