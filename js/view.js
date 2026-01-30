/**
 * VIEW - Hiển thị và cập nhật giao diện (DOM)
 * Chỉ chịu trách nhiệm render, không chứa logic nghiệp vụ
 */

// Selectors - tập trung ID/class để dễ bảo trì
export const Selectors = {
    startScreen: '.start-screen',
    quizScreen: '.quiz-screen',
    resultScreen: '.result-screen',
    examList: '#examList',
    startBtn: '.start-btn',
    progressBar: '#progressBar',
    timerDisplay: '#timerDisplay',
    questionNumber: '#questionNumber',
    questionText: '#question',
    answers: '#answers',
    nextBtn: '#nextBtn',
    resultEmoji: '#resultEmoji',
    scoreNumber: '#scoreNumber',
    resultMessage: '#resultMessage',
    soundToggle: '.sound-toggle'
};

export const QuizView = {
    /**
     * Render danh sách đề thi trên màn hình bắt đầu
     * @param {Array} exams - [{ id, name, description, questionCount }]
     * @param {string|null} selectedExamId - id đề đang chọn
     * @param {function} onSelect - callback(examId) khi user chọn đề
     */
    renderExamList(exams, selectedExamId, onSelect) {
        const container = document.querySelector(Selectors.examList);
        if (!container) return;
        container.innerHTML = '';
        exams.forEach(exam => {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'exam-card' + (exam.id === selectedExamId ? ' selected' : '');
            card.dataset.examId = exam.id;
            const timeLabel = exam.timeLabel || '5 phút';
            card.innerHTML = `
                <span class="exam-name">${exam.name}</span>
                <span class="exam-meta">${exam.questionCount} câu · ${timeLabel} · ${exam.description}</span>
            `;
            card.addEventListener('click', () => onSelect(exam.id));
            container.appendChild(card);
        });
    },

    /**
     * Hiển thị màn hình: start | quiz | result
     */
    showScreen(screenName) {
        document.querySelector(Selectors.startScreen).classList.remove('active');
        document.querySelector(Selectors.quizScreen).classList.remove('active');
        document.querySelector(Selectors.resultScreen).classList.remove('active');

        const screenMap = {
            start: Selectors.startScreen,
            quiz: Selectors.quizScreen,
            result: Selectors.resultScreen
        };
        const el = document.querySelector(screenMap[screenName]);
        if (el) el.classList.add('active');
    },

    /**
     * Cập nhật đồng hồ đếm ngược (giây còn lại). Format M:SS. Cảnh báo khi < 60s.
     */
    updateTimerDisplay(remainingSeconds) {
        const el = document.querySelector(Selectors.timerDisplay);
        if (!el) return;
        if (remainingSeconds <= 0) {
            el.textContent = '0:00';
            el.classList.add('timer-up');
            el.classList.remove('timer-warning');
            return;
        }
        el.classList.remove('timer-up');
        const m = Math.floor(remainingSeconds / 60);
        const s = remainingSeconds % 60;
        el.textContent = `${m}:${String(s).padStart(2, '0')}`;
        if (remainingSeconds <= 60) {
            el.classList.add('timer-warning');
        } else {
            el.classList.remove('timer-warning');
        }
    },

    /**
     * Render câu hỏi hiện tại lên DOM
     */
    renderQuestion(question, currentIndex, totalCount, onAnswerClick) {
        const progressPercent = ((currentIndex + 1) / totalCount) * 100;

        const progressEl = document.querySelector(Selectors.progressBar);
        if (progressEl) progressEl.style.width = progressPercent + '%';

        const numEl = document.querySelector(Selectors.questionNumber);
        if (numEl) numEl.textContent = `Câu hỏi ${currentIndex + 1}/${totalCount}`;

        const questionEl = document.querySelector(Selectors.questionText);
        if (questionEl) questionEl.textContent = question.question;

        const answersDiv = document.querySelector(Selectors.answers);
        if (!answersDiv) return;
        answersDiv.innerHTML = '';

        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer;
            button.dataset.index = index;
            button.addEventListener('click', () => onAnswerClick(index));
            answersDiv.appendChild(button);
        });

        const nextBtn = document.querySelector(Selectors.nextBtn);
        if (nextBtn) nextBtn.style.display = 'none';
    },

    /**
     * Cập nhật trạng thái đáp án (đúng/sai) sau khi chọn
     */
    updateAnswerFeedback(correctIndex, selectedIndex) {
        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach((btn, i) => {
            btn.disabled = true;
            if (i === correctIndex) {
                btn.classList.add('correct');
            } else if (i === selectedIndex && i !== correctIndex) {
                btn.classList.add('wrong');
            }
        });

        const nextBtn = document.querySelector(Selectors.nextBtn);
        if (nextBtn) nextBtn.style.display = 'inline-block';
    },

    /**
     * Hiển thị nút "Câu tiếp theo"
     */
    showNextButton() {
        const nextBtn = document.querySelector(Selectors.nextBtn);
        if (nextBtn) nextBtn.style.display = 'inline-block';
    },

    /**
     * Render màn hình kết quả
     */
    renderResult(resultInfo) {
        const { score, emoji, message } = resultInfo;
        const emojiEl = document.querySelector(Selectors.resultEmoji);
        const scoreEl = document.querySelector(Selectors.scoreNumber);
        const messageEl = document.querySelector(Selectors.resultMessage);
        if (emojiEl) emojiEl.textContent = emoji;
        if (scoreEl) scoreEl.textContent = score;
        if (messageEl) messageEl.textContent = message;
    },

    /**
     * Cập nhật nút bật/tắt âm thanh (icon + aria-label)
     */
    updateSoundToggle(muted) {
        const btn = document.querySelector(Selectors.soundToggle);
        if (!btn) return;
        btn.classList.toggle('muted', muted);
        btn.setAttribute('aria-label', muted ? 'Bật âm thanh' : 'Tắt âm thanh');
        btn.title = muted ? 'Bật âm thanh' : 'Tắt âm thanh';
        const icon = btn.querySelector('.sound-toggle-icon');
        if (icon) icon.textContent = muted ? '🔇' : '🔊';
    }
};
