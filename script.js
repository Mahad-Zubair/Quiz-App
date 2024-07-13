const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const questionCounterElement = document.getElementById('question-counter');
let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 10);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    quizScore = 0;
    document.getElementById('right-answers').innerText = quizScore;
    updateQuestionCounter();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    updateQuestionCounter();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    setStatusClass(selectedButton, correct);

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            setStatusClass(button, true); // Highlight correct answer
        } else if (button === selectedButton && !correct) {
            setStatusClass(button, false); // Highlight selected wrong answer
        }
    });

    if (correct) {
        quizScore++;
        document.getElementById('right-answers').innerText = quizScore;
    }

    setTimeout(() => {
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            currentQuestionIndex++;
            setNextQuestion();
        } else {
            startButton.innerText = 'Restart';
            startButton.classList.remove('hide');
        }
    }, 1000); // Delay to show the status change before moving to the next question
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function updateQuestionCounter() {
    questionCounterElement.innerText = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
}

const questions = [
    {
        question: 'Which one of these is a Javascript Framework?',
        answers: [
            { text: 'Python', correct: false },
            { text: 'Django', correct: false },
            { text: 'React', correct: true },
            { text: 'Ruby', correct: false }
        ]
    },
    {
        question: 'Which language is used for styling web pages?',
        answers: [
            { text: 'HTML', correct: false },
            { text: 'JQuery', correct: false },
            { text: 'CSS', correct: true },
            { text: 'XML', correct: false }
        ]
    },
    {
        question: 'Which is not a programming language?',
        answers: [
            { text: 'TypeScript', correct: false },
            { text: 'Python', correct: false },
            { text: 'Anaconda', correct: true },
            { text: 'Java', correct: false }
        ]
    },
    {
        question: 'Which language runs in a web browser?',
        answers: [
            { text: 'Java', correct: false },
            { text: 'C', correct: false },
            { text: 'Python', correct: false },
            { text: 'JavaScript', correct: true }
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Central Style Sheets', correct: false },
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Cascading Simple Sheets', correct: false },
            { text: 'Cars SUVs Sailboats', correct: false }
        ]
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hypertext Markup Language', correct: true },
            { text: 'Hypertext Markdown Language', correct: false },
            { text: 'Hyperloop Machine Language', correct: false },
            { text: 'Helicopters Terminals Motorboats Lamborghinis', correct: false }
        ]
    },
    {
        question: 'What year was JavaScript launched?',
        answers: [
            { text: '1996', correct: false },
            { text: '1995', correct: true },
            { text: '1994', correct: false },
            { text: 'None of the above', correct: false }
        ]
    },
    {
        question: 'Which company developed the React library?',
        answers: [
            { text: 'Google', correct: false },
            { text: 'Microsoft', correct: false },
            { text: 'Facebook', correct: true },
            { text: 'Apple', correct: false }
        ]
    },
    {
        question: 'Which HTML attribute is used to define inline styles?',
        answers: [
            { text: 'class', correct: false },
            { text: 'style', correct: true },
            { text: 'font', correct: false },
            { text: 'styles', correct: false }
        ]
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            { text: 'js', correct: false },
            { text: 'script', correct: true },
            { text: 'scripting', correct: false },
            { text: 'javascript', correct: false }
        ]
    },
    {
        question: 'Which of the following is not a data type in Python?',
        answers: [
            { text: 'Integer', correct: false },
            { text: 'Float', correct: false },
            { text: 'Boolean', correct: false },
            { text: 'Scalar', correct: true }
        ]
    },
    {
        question: 'What is the output of `print("Hello, " + "World!")` in Python?',
        answers: [
            { text: 'Hello, World!', correct: true },
            { text: 'Hello, + World!', correct: false },
            { text: 'Hello, \n World!', correct: false },
            { text: 'Hello, World!', correct: false }
        ]
    },
    {
        question: 'Which keyword is used for function definition in Python?',
        answers: [
            { text: 'define', correct: false },
            { text: 'function', correct: false },
            { text: 'def', correct: true },
            { text: 'fun', correct: false }
        ]
    },
    {
        question: 'What will be the output of `2 * 3 ** 3` in Python?',
        answers: [
            { text: '54', correct: true },
            { text: '162', correct: false },
            { text: '48', correct: false },
            { text: '6', correct: false }
        ]
    },
    {
        question: 'Which of the following is used to comment multiple lines in Python?',
        answers: [
            { text: '/* */', correct: false },
            { text: '<!-- -->', correct: false },
            { text: '""" """', correct: true },
            { text: '//', correct: false }
        ]
    },
    {
        question: 'What is the output of `len([1, 2, 3, 4, 5])` in Python?',
        answers: [
            { text: '5', correct: true },
            { text: '1', correct: false },
            { text: '15', correct: false },
            { text: '6', correct: false }
        ]
    },
    {
        question: 'Which method is used to remove an element from a list in Python?',
        answers: [
            { text: 'delete()', correct: false },
            { text: 'pop()', correct: true },
            { text: 'remove()', correct: false },
            { text: 'erase()', correct: false }
        ]
    },
    {
        question: 'What does the `range()` function in Python return?',
        answers: [
            { text: 'A list of numbers', correct: false },
            { text: 'A generator object', correct: true },
            { text: 'A tuple of numbers', correct: false },
            { text: 'An array of numbers', correct: false }
        ]
    },
    {
        question: 'Which of the following is a Python library used for data manipulation and analysis?',
        answers: [
            { text: 'Pygame', correct: false },
            { text: 'Pandas', correct: true },
            { text: 'Requests', correct: false },
            { text: 'Tkinter', correct: false }
        ]
    },
    {
        question: 'What is the result of `3 + 2 * 4 / 2` in Python?',
        answers: [
            { text: '10.0', correct: true },
            { text: '5.0', correct: false },
            { text: '11.0', correct: false },
            { text: '4.0', correct: false }
        ]
    },
    {
        question: 'Which of the following is not a valid variable type in C++?',
        answers: [
            { text: 'int', correct: false },
            { text: 'string', correct: false },
            { text: 'real', correct: true },
            { text: 'char', correct: false }
        ]
    },
    {
        question: 'What symbol is used to indicate a single-line comment in C++?',
        answers: [
            { text: '//', correct: true },
            { text: '#', correct: false },
            { text: '/* */', correct: false },
            { text: '--', correct: false }
        ]
    },
    {
        question: 'Which header file should be included to use input and output operations in C++?',
        answers: [
            { text: '<iostream>', correct: true },
            { text: '<stdio.h>', correct: false },
            { text: '<math.h>', correct: false },
            { text: '<fstream>', correct: false }
        ]
    },
    {
        question: 'What is the correct way to declare a pointer in C++?',
        answers: [
            { text: 'int* ptr;', correct: true },
            { text: 'pointer ptr;', correct: false },
            { text: 'ptr int;', correct: false },
            { text: 'int ptr;', correct: false }
        ]
    },
    {
        question: 'What does the `cin` object do in C++?',
        answers: [
            { text: 'Output to the console', correct: false },
            { text: 'Read input from the console', correct: true },
            { text: 'Define a constant', correct: false },
            { text: 'Allocate memory', correct: false }
        ]
    },
    {
        question: 'Which keyword is used to define a class in C++?',
        answers: [
            { text: 'class', correct: true },
            { text: 'struct', correct: false },
            { text: 'type', correct: false },
            { text: 'define', correct: false }
        ]
    },
    {
        question: 'What is the operator used to access members of a structure or union in C++?',
        answers: [
            { text: '.', correct: true },
            { text: '->', correct: false },
            { text: ':', correct: false },
            { text: '::', correct: false }
        ]
    },
    {
        question: 'Which of the following is not a valid loop structure in C++?',
        answers: [
            { text: 'for', correct: false },
            { text: 'foreach', correct: true },
            { text: 'while', correct: false },
            { text: 'do-while', correct: false }
        ]
    },
    {
        question: 'What is the output of `cout << 5 / 2` in C++?',
        answers: [
            { text: '2.5', correct: false },
            { text: '2', correct: true },
            { text: '2.0', correct: false },
            { text: '2.25', correct: false }
        ]
    },
    {
        question: 'Which operator is used to allocate memory dynamically in C++?',
        answers: [
            { text: 'new', correct: true },
            { text: 'malloc', correct: false },
            { text: 'allocate', correct: false },
            { text: 'mallocate', correct: false }
        ]
    }
    
];
