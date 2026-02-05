// Courses data
const courses = [
    {
        id: 1,
        category: "programming",
        title: "Python - Основы программирования",
        icon: "🐍",
        color: "#2d7eff",
        duration: "12 занятий по 60 минут",
        price: "20 рублей за занятие",
        description: "Дети знакомятся с основами программирования и создают небольшие консольные программы.",
        requirements: "",
        nextCourses: "После курса можно выбрать: Создание Telegram ботов или Создание 2D игр на Python"
    },
    {
        id: 2,
        category: "programming",
        title: "Python - Создание Telegram ботов",
        icon: "🤖",
        color: "#930184",
        duration: "12 занятий по 60 минут",
        price: "20 рублей за занятие",
        description: "Ребята научатся создавать простых Telegram ботов и управлять ими.",
        requirements: "Требуется: Перед этим необходимо пройти курс 'Python - Основы программирования' "
    },
    {
        id: 3,
        category: "programming",
        title: "Python - Создание 2D игр",
        icon: "🎮",
        color: "#00ba13",
        duration: "12 занятий по 60 минут",
        price: "20 рублей за занятие",
        description: "Ребята научатся создавать три игры: 1. Змейка, 2. Игра про зомби, 3. Игра по уничтожению кирпичиков с помощью мячика.",
        requirements: "Требуется: Перед этим необходимо пройти курс 'Python - Основы программирования' "
    },
    {
        id: 4,
        category: "programming",
        title: "Unity - 2D игры",
        icon: "🎯",
        color: "#2d7eff",
        duration: "12 занятий по 90 минут",
        price: "30 рублей за занятие",
        description: "Знакомство с Unity и создание 2D игр.",
        requirements: "",
        nextCourses: "После курса можно выбрать: Unity - 3D игры"
    },
    {
        id: 5,
        category: "programming",
        title: "Unity - 3D игры",
        icon: "🌍",
        color: "#930184",
        duration: "12 занятий по 90 минут",
        price: "30 рублей за занятие",
        description: "Создание 3D игр с диалогами и прокачкой персонажей.",
        requirements: "Требуется: Перед этим необходимо пройти курс 'Unity - 2D игры'"
    },
    {
        id: 6,
        category: "english",
        title: "Английский - Школьная программа",
        icon: "📚",
        color: "#00ba13",
        duration: "Индивидуальный план",
        price: "20 рублей за 60 минут",
        description: "Изучение школьной программы английского языка.",
        requirements: ""
    },
    {
        id: 7,
        category: "english",
        title: "Английский - Разговорная речь",
        icon: "💬",
        color: "#2d7eff",
        duration: "Индивидуальный план",
        price: "20 рублей за 60 минут",
        description: "Тренировка разговорной речи и коммуникации.",
        requirements: ""
    }
];

// Pricing data
const pricing = [
    { 
        course: "Python - Основы программирования", 
        lessonDuration: "60 минут", 
        lessonsCount: "12", 
        lessonPrice: "20 рублей за занятие", 
        totalPrice: "240 рублей" 
    },
    { 
        course: "Python - Создание Telegram ботов", 
        lessonDuration: "60 минут", 
        lessonsCount: "12", 
        lessonPrice: "20 рублей за занятие", 
        totalPrice: "240 рублей" 
    },
    { 
        course: "Python - Создание 2D игр", 
        lessonDuration: "60 минут", 
        lessonsCount: "12", 
        lessonPrice: "20 рублей за занятие", 
        totalPrice: "240 рублей" 
    },
    { 
        course: "Unity - 2D игры", 
        lessonDuration: "90 минут", 
        lessonsCount: "12", 
        lessonPrice: "30 рублей за занятие", 
        totalPrice: "360 рублей" 
    },
    { 
        course: "Unity - 3D игры", 
        lessonDuration: "90 минут", 
        lessonsCount: "12", 
        lessonPrice: "30 рублей за занятие", 
        totalPrice: "360 рублей" 
    },
    { 
        course: "Английский - Школьная программа", 
        lessonDuration: "60 минут", 
        lessonsCount: "Индивидуально", 
        lessonPrice: "20 рублей за 60 минут", 
        totalPrice: "Индивидуально" 
    },
    { 
        course: "Английский - Разговорная речь", 
        lessonDuration: "60 минут", 
        lessonsCount: "Индивидуально", 
        lessonPrice: "20 рублей за 60 минут", 
        totalPrice: "Индивидуально" 
    }
];

// Teachers data
const teachers = [
    {
        name: "Каркота Александра",
        subject: "Программирование на Python и Unity",
        icon: "fa-laptop-code",
        skills: ["Python", "Unity", "C#", "Разработка игр"],
        description: "Высшее образование в области компьютерных наук. Опыт преподавания: 4 года. Специализируется на обучении детей программированию через создание игр и приложений.",
        education: "Высшее образование в области компьютерных наук"
    },
    {
        name: "Петрашевич Майя",
        subject: "Английский язык",
        icon: "fa-language",
        skills: ["CELTA", "Разговорный английский", "Подготовка к школе", "Business English"],
        description: "Высшее лингвистическое образование. Опыт преподавания: 4 лет. Сертифицированный преподаватель с опытом работы в языковых школах и индивидуальным подходом к каждому ученику.",
        education: "Высшее лингвистическое образование"
    }
];

// Tests data
const tests = {
    english: {
        title: "Тест на уровень английского",
        description: "Определите текущий уровень знания английского языка",
        questions: [
            {
                id: 1,
                question: "Как сказать 'Привет' по-английски?",
                options: [
                    { text: "Hello", value: "beginner" },
                    { text: "Goodbye", value: "beginner" },
                    { text: "Thank you", value: "beginner" },
                    { text: "Please", value: "beginner" }
                ]
            },
            {
                id: 2,
                question: "Выберите правильный перевод: 'Я учусь в школе'",
                options: [
                    { text: "I go to school", value: "elementary" },
                    { text: "I am a student", value: "elementary" },
                    { text: "I study at school", value: "elementary" },
                    { text: "I like school", value: "elementary" }
                ]
            },
            {
                id: 3,
                question: "Заполните пропуск: 'If I ___ more time, I would travel more.'",
                options: [
                    { text: "have", value: "intermediate" },
                    { text: "had", value: "intermediate" },
                    { text: "will have", value: "intermediate" },
                    { text: "would have", value: "intermediate" }
                ]
            }
            // Добавьте больше вопросов...
        ],
        results: {
            beginner: {
                title: "Beginner (Начинающий)",
                description: "Отличное начало! У вашего ребенка базовые знания английского языка. Рекомендуем начать с курса 'Английский - Школьная программа'.",
                course: "Английский - Школьная программа"
            },
            elementary: {
                title: "Elementary (Элементарный)",
                description: "Хорошие базовые знания! Ребенок понимает простые фразы и может общаться на основные темы. Рекомендуем курс 'Английский - Разговорная речь'.",
                course: "Английский - Разговорная речь"
            },
            intermediate: {
                title: "Intermediate (Средний)",
                description: "Отличный уровень! Ребенок может свободно общаться на многие темы. Рекомендуем углубленный курс или подготовку к экзаменам.",
                course: "Английский - Разговорная речь (продвинутый уровень)"
            }
        }
    },
    course: {
        title: "Тест для выбора курса программирования",
        description: "Поможем выбрать оптимальный курс программирования",
        questions: [
            {
                id: 1,
                question: "Возраст ребенка?",
                options: [
                    { text: "7-9 лет", value: "young" },
                    { text: "10-12 лет", value: "middle" },
                    { text: "13-15 лет", value: "teen" },
                    { text: "16+ лет", value: "senior" }
                ]
            },
            {
                id: 2,
                question: "Есть ли опыт в программировании?",
                options: [
                    { text: "Нет, никогда не программировал(а)", value: "none" },
                    { text: "Немного, пробовал(а) простые программы", value: "basic" },
                    { text: "Да, есть небольшой опыт", value: "some" },
                    { text: "Да, уже программирую", value: "experienced" }
                ]
            },
            {
                id: 3,
                question: "Что больше интересует?",
                options: [
                    { text: "Создание игр", value: "games" },
                    { text: "Создание сайтов и приложений", value: "web" },
                    { text: "Работа с искусственным интеллектом", value: "ai" },
                    { text: "Не знаю, хочу попробовать всё", value: "all" }
                ]
            }
        ],
        results: {
            young_none_games: {
                title: "Python - Основы программирования",
                description: "Идеальный старт для самых юных программистов! Начнем с основ через создание простых игр и анимаций.",
                course: "Python - Основы программирования"
            },
            middle_basic_games: {
                title: "Python - Создание 2D игр",
                description: "Отлично! Ребенок готов к созданию настоящих игр. Начнем с Python и постепенно перейдем к более сложным проектам.",
                course: "Python - Создание 2D игр"
            },
            teen_some_games: {
                title: "Unity - 2D игры (по типу Марио)",
                description: "Превосходно! Можно переходить к профессиональным инструментам. Unity позволит создавать игры как настоящие разработчики.",
                course: "Unity - 2D игры (по типу Марио)"
            }
        }
    }
};