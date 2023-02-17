const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz {
    constructor(type, questions, results) {
        this.type = type;

        this.questions = questions;

        this.results = results;

        this.score = 0;

        this.result = 0;

        this.current = 0;
    }

    Click(index) {
        let value = this.questions[this.current].Click(index);
        this.score += value;

        let correct = -1;

        if (value >= 1) {
            correct = index;
        }
        else {
            for (let i = 0; i < this.questions[this.current].answers.length; i++) {
                if (this.questions[this.current].answers[i].value >= 1) {
                    correct = i;
                    break;
                }
            }
        }

        this.Next();

        return correct;
    }

    Next() {
        this.current++;

        if (this.current >= this.questions.length) {
            this.End();
        }
    }

    End() {
        for (let i = 0; i < this.results.length; i++) {
            if (this.results[i].Check(this.score)) {
                this.result = i;
            }
        }
    }
}

class Question {
    constructor(text, answers) {
        this.text = text;
        this.answers = answers;
    }

    Click(index) {
        return this.answers[index].value;
    }
}

class Answer {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }
}

class Result {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }

    Check(value) {
        if (this.value <= value) {
            return true;
        }
        else {
            return false;
        }
    }
}

const results =
    [
        new Result("Полный провал", 0),
        new Result("В данной ситуации стоит подучить некоторые детали...", 2),
        new Result("Неплохо! Почти победа", 4),
        new Result("Идеальное прохождение! Вы молодец!", 7)
    ];

const questions =
    [
        new Question("Что такое парка?",
            [
                new Answer("Юбка", 0),
                new Answer("Рубашка", 0),
                new Answer("Шапка", 0),
                new Answer("Куртка", 1)
            ]),

        new Question("Какое сегодня имя носит советский город-герой Ленинград?",
            [
                new Answer("Астрахань", 0),
                new Answer("Москва", 0),
                new Answer("Санкт-Петербург", 1),
                new Answer("Батайск", 0)
            ]),

        new Question("К какому склонению относится слово «пуговка»?",
            [
                new Answer("Первое", 1),
                new Answer("Второе", 0),
                new Answer("Третье", 0),
                new Answer("Не склоняется", 0)
            ]),

        new Question("В чем заключается синдром Алисы в Стране чудес?",
            [
                new Answer("В искажении восприятия величины и пропорций собственного тела", 1),
                new Answer("В навязчивом ощущении, что животные и растения наблюдают за тобой", 0),
                new Answer("В безостановочном плаче", 0)
            ]),

        new Question("Человек поранил ногу. Куда надо наложить жгут?",
            [
                new Answer("На саму рану", 0),
                new Answer("Выше раны", 1),
                new Answer("Ниже раны", 0),
                new Answer("Не нужно ничего делать", 0)
            ]),

        new Question("С какой страной граничат на востоке Нидерланды?",
            [
                new Answer("Австрия", 0),
                new Answer("Италия", 0),
                new Answer("Германия", 1),
                new Answer("Бельгия", 0)
            ]),

        new Question("Будучи рожденным 13 января, человек по знаку зодиака..",
            [
                new Answer("Рыбы", 0),
                new Answer("Водолей", 0),
                new Answer("Козерог", 1),
                new Answer("Телец", 0)
            ])
    ];

const quiz = new Quiz(1, questions, results);

Update();

function Update() {
    if (quiz.current < quiz.questions.length) {
        headElem.innerHTML = quiz.questions[quiz.current].text;

        buttonsElem.innerHTML = "";

        for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
            let btn = document.createElement("button");
            btn.className = "button";

            btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

            btn.setAttribute("index", i);

            buttonsElem.appendChild(btn);
        }

        pagesElem.innerHTML = (quiz.current + 1) + " из " + quiz.questions.length;

        Init();
    }
    else {
        buttonsElem.innerHTML = "";
        headElem.innerHTML = quiz.results[quiz.result].text;
        pagesElem.innerHTML = "Правильных ответов: " + quiz.score;
    }
}

function Init() {
    let btns = document.getElementsByClassName("button");

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
    }
}

function Click(index) {
    let correct = quiz.Click(index);

    let btns = document.getElementsByClassName("button");

    for (let i = 0; i < btns.length; i++) {
        btns[i].className = "button but_passive";
    }

    if (quiz.type == 1) {
        if (correct >= 0) {
            btns[correct].className = "button but_correct";
        }

        if (index != correct) {
            btns[index].className = "button but_wrong";
        }
    }
    else {
        btns[index].className = "button but_correct";
    }

    setTimeout(Update, 1000);
}