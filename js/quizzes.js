function loadQuiz(quizData) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    quizData.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('quiz-question');

        const questionText = document.createElement('h3');
        questionText.textContent = `Question ${index + 1}: ${question.question}`;
        questionElement.appendChild(questionText);

        question.answers.forEach((answer, i) => {
            const answerLabel = document.createElement('label');
            const answerInput = document.createElement('input');
            answerInput.type = 'radio';
            answerInput.name = `question-${index}`;
            answerInput.value = answer;

            answerLabel.appendChild(answerInput);
            answerLabel.appendChild(document.createTextNode(answer));
            questionElement.appendChild(answerLabel);
        });

        quizContainer.appendChild(questionElement);
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Answers';
    submitButton.onclick = () => validateQuiz(quizData);
    quizContainer.appendChild(submitButton);
}

function validateQuiz(quizData) {
    const results = [];
    quizData.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="question-${index}"]:checked`);
        if (selectedAnswer) {
            results.push({
                question: question.question,
                selected: selectedAnswer.value,
                correct: question.correctAnswer
            });
        } else {
            results.push({
                question: question.question,
                selected: null,
                correct: question.correctAnswer
            });
        }
    });

    displayResults(results);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.classList.add('quiz-result');

        const questionText = document.createElement('p');
        questionText.textContent = `Question: ${result.question}`;
        resultElement.appendChild(questionText);

        const answerText = document.createElement('p');
        answerText.textContent = `Your Answer: ${result.selected || 'No answer selected'}`;
        resultElement.appendChild(answerText);

        const correctText = document.createElement('p');
        correctText.textContent = `Correct Answer: ${result.correct}`;
        resultElement.appendChild(correctText);

        resultsContainer.appendChild(resultElement);
    });
}