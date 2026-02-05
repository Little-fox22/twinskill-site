class TwinSkillApp {
    constructor() {
        this.currentPage = 'home';
        this.telegramToken = '8574260715:AAEzZFTgZRWulpXbRYH5efNFYtOxqhzLOVM';
        
        // ИСПРАВЛЕНО: Используем только групповой chat_id
        this.groupChatId = '-1003584067797';
        
        this.currentTest = null; // Инициализация для тестов
        
        this.init();
    }
    
    init() {
        // Initialize event listeners
        this.setupEventListeners();
        this.setupTestListeners(); // Инициализация обработчиков тестов
        
        // Render initial content
        this.renderCourseCards();
        this.renderPricingTable();
        
        // Show home page
        this.showPage('home');
    }
    
    setupTestListeners() {
        // Обработчики для кнопок начала теста
        document.addEventListener('click', (e) => {
            if (e.target.closest('.start-test-btn')) {
                const testType = e.target.closest('.start-test-btn').getAttribute('data-test');
                this.startTest(testType);
            }
            
            if (e.target.closest('.next-question-btn')) {
                this.nextQuestion();
            }
            
            if (e.target.closest('.prev-question-btn')) {
                this.prevQuestion();
            }
            
            if (e.target.closest('.finish-test-btn')) {
                this.finishTest();
            }
            
            if (e.target.closest('.retake-test-btn')) {
                this.showTestSelection();
            }
            
            if (e.target.closest('.book-course-btn')) {
                this.showPage('free-lesson');
            }
        });
        
        // Обработчики для выбора ответов
        document.addEventListener('change', (e) => {
            if (e.target.type === 'radio' && e.target.name === 'test-option') {
                const optionId = e.target.value;
                this.selectAnswer(optionId);
            }
        });
    }
    
    startTest(testType) {
        this.currentTest = {
            type: testType,
            questions: tests[testType].questions,
            currentQuestion: 0,
            answers: [],
            startTime: new Date()
        };
        
        // Показываем контейнер теста
        document.getElementById('test-container').style.display = 'block';
        document.querySelector('.tests-grid').style.display = 'none';
        document.getElementById('test-results').style.display = 'none';
        
        // Показываем первый вопрос
        this.showQuestion(0);
    }
    
    showQuestion(questionIndex) {
        this.currentTest.currentQuestion = questionIndex;
        const question = this.currentTest.questions[questionIndex];
        
        const testContainer = document.getElementById('test-container');
        testContainer.innerHTML = `
            <div class="test-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(questionIndex + 1) / this.currentTest.questions.length * 100}%"></div>
                </div>
                <div class="progress-text">
                    Вопрос ${questionIndex + 1} из ${this.currentTest.questions.length}
                </div>
            </div>
            
            <div class="test-question">
                <h3>${question.question}</h3>
                <div class="test-options">
                    ${question.options.map((option, index) => `
                        <div class="test-option ${this.currentTest.answers[questionIndex] === index ? 'selected' : ''}">
                            <input type="radio" name="test-option" id="option-${index}" value="${index}" 
                                   ${this.currentTest.answers[questionIndex] === index ? 'checked' : ''}>
                            <label for="option-${index}">${option.text}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="test-navigation">
                <button class="cta-button prev-question-btn" ${questionIndex === 0 ? 'disabled style="opacity:0.5"' : ''}>
                    <i class="fas fa-arrow-left button-icon"></i>
                    <span>Назад</span>
                </button>
                
                ${questionIndex === this.currentTest.questions.length - 1 ? 
                    `<button class="cta-button finish-test-btn">
                        <span>Завершить тест</span>
                        <i class="fas fa-flag-checkered button-icon"></i>
                    </button>` :
                    `<button class="cta-button next-question-btn">
                        <span>Далее</span>
                        <i class="fas fa-arrow-right button-icon"></i>
                    </button>`
                }
            </div>
        `;
    }
    
    selectAnswer(optionIndex) {
        const currentQuestion = this.currentTest.currentQuestion;
        this.currentTest.answers[currentQuestion] = parseInt(optionIndex);
        
        // Обновляем визуальное выделение
        document.querySelectorAll('.test-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        if (document.querySelector(`#option-${optionIndex}`)) {
            document.querySelector(`#option-${optionIndex}`).closest('.test-option').classList.add('selected');
        }
    }
    
    nextQuestion() {
        if (this.currentTest.currentQuestion < this.currentTest.questions.length - 1) {
            this.showQuestion(this.currentTest.currentQuestion + 1);
        }
    }
    
    prevQuestion() {
        if (this.currentTest.currentQuestion > 0) {
            this.showQuestion(this.currentTest.currentQuestion - 1);
        }
    }
    
    finishTest() {
        // Рассчитываем результаты
        const results = this.calculateResults();
        
        // Показываем результаты
        this.showResults(results);
    }
    
    calculateResults() {
        const testType = this.currentTest.type;
        const testData = tests[testType];
        
        // Простая логика для демо - в реальном приложении будет сложнее
        if (testType === 'english') {
            // Для английского теста
            const scores = {
                beginner: 0,
                elementary: 0,
                intermediate: 0
            };
            
            this.currentTest.answers.forEach((answerIndex, questionIndex) => {
                if (answerIndex !== undefined) {
                    const optionValue = testData.questions[questionIndex].options[answerIndex].value;
                    scores[optionValue]++;
                }
            });
            
            // Определяем максимальный балл
            let maxScore = 0;
            let resultLevel = 'beginner';
            
            for (const [level, score] of Object.entries(scores)) {
                if (score > maxScore) {
                    maxScore = score;
                    resultLevel = level;
                }
            }
            
            return testData.results[resultLevel];
        } else if (testType === 'course') {
            // Для теста выбора курса
            // Здесь будет более сложная логика определения курса
            return testData.results['young_none_games']; // Демо результат
        }
        
        return testData.results.beginner; // По умолчанию
    }
    
    showResults(results) {
        document.getElementById('test-container').style.display = 'none';
        
        const resultsContainer = document.getElementById('test-results');
        resultsContainer.style.display = 'block';
        resultsContainer.innerHTML = `
            <div class="result-icon">
                <i class="fas fa-medal"></i>
            </div>
            
            <h2 class="result-title">Результаты теста</h2>
            
            <div class="result-level">${results.title}</div>
            
            <p class="result-description">${results.description}</p>
            
            <div class="result-recommendations">
                <h4><i class="fas fa-lightbulb"></i> Рекомендации:</h4>
                <ul>
                    <li>Рекомендуемый курс: <strong>${results.course}</strong></li>
                    <li>Продолжительность: 12 занятий по 60 минут</li>
                    <li>Формат: Индивидуальные онлайн-занятия</li>
                </ul>
            </div>
            
            <div class="result-actions">
                <button class="cta-button book-course-btn">
                    <i class="fas fa-calendar-check button-icon"></i>
                    <span>Записаться на курс</span>
                </button>
                
                <button class="cta-button retake-test-btn" style="background-color: var(--primary-blue);">
                    <i class="fas fa-redo button-icon"></i>
                    <span>Пройти другой тест</span>
                </button>
            </div>
        `;
        
        // Прокручиваем к результатам
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    showTestSelection() {
        document.getElementById('test-container').style.display = 'none';
        document.getElementById('test-results').style.display = 'none';
        document.querySelector('.tests-grid').style.display = 'grid';
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mainMenu = document.getElementById('main-menu');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                mainMenu.classList.toggle('show');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
            });
        }
        
        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.showPage(page);
                
                // Close mobile menu if open
                if (window.innerWidth <= 768 && mainMenu) {
                    mainMenu.classList.remove('show');
                    const icon = mobileMenuBtn?.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
        
        // Footer links
        const footerLinks = document.querySelectorAll('.footer-link');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Extract page from onclick attribute
                const onclickAttr = link.getAttribute('onclick');
                if (onclickAttr) {
                    const pageMatch = onclickAttr.match(/showPage\('(.+?)'\)/);
                    if (pageMatch) {
                        this.showPage(pageMatch[1]);
                    }
                }
            });
        });
        
        // Form submission
        const form = document.getElementById('free-lesson-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
        
        // Add click animation to all CTA buttons
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', function() {
                this.classList.add('btn-click');
                setTimeout(() => {
                    this.classList.remove('btn-click');
                }, 200);
            });
        });
        
        // Add animation to course action buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.course-action .cta-button')) {
                this.showPage('free-lesson');
            }
        });
    }
    
    renderCourseCards() {
        const programmingContainer = document.getElementById('programming-courses');
        const englishContainer = document.getElementById('english-courses');
        const allCoursesContainer = document.getElementById('all-courses');
        
        if (programmingContainer) programmingContainer.innerHTML = '';
        if (englishContainer) englishContainer.innerHTML = '';
        if (allCoursesContainer) allCoursesContainer.innerHTML = '';
        
        // Filter courses
        const programmingCourses = courses.filter(course => course.category === 'programming');
        const englishCourses = courses.filter(course => course.category === 'english');
        
        // Render programming courses
        programmingCourses.forEach((course, index) => {
            const card = this.createCourseCard(course);
            card.style.animationDelay = `${index * 0.1}s`;
            
            if (programmingContainer) programmingContainer.appendChild(card.cloneNode(true));
            if (allCoursesContainer) allCoursesContainer.appendChild(card);
        });
        
        // Render english courses
        englishCourses.forEach((course, index) => {
            const card = this.createCourseCard(course);
            card.style.animationDelay = `${(programmingCourses.length + index) * 0.1}s`;
            
            if (englishContainer) englishContainer.appendChild(card.cloneNode(true));
            if (allCoursesContainer) allCoursesContainer.appendChild(card);
        });
    }
    
    createCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'course-card slide-up';
        card.setAttribute('data-animate', 'true');
        
        // Форматируем информацию о продолжительности и цене
        const durationParts = course.duration.split(' ');
        const priceParts = course.price.split(' ');
        
        card.innerHTML = `
            <div class="course-header" style="background-color: ${course.color}">
                <div class="course-icon">${course.icon}</div>
                <h3 class="course-title">${course.title}</h3>
            </div>
            <div class="course-details">
                <div class="course-info">
                    <span class="course-duration">${durationParts.join(' ')}</span>
                    <span class="course-price">${priceParts.join(' ')}</span>
                </div>
                <p class="course-description">${course.description}</p>
                ${course.requirements ? `<div class="requirements">${course.requirements}</div>` : ''}
                ${course.nextCourses ? `<div class="requirements">${course.nextCourses}</div>` : ''}
                <div class="course-action">
                    <button class="cta-button small">
                        <span>Записаться</span>
                        <i class="fas fa-arrow-right button-icon"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Add hover animation
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.course-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.course-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
        
        return card;
    }
    
    renderPricingTable() {
        const tableBody = document.getElementById('pricing-table-body');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        pricing.forEach((item, index) => {
            const row = document.createElement('tr');
            row.className = 'slide-up';
            row.style.animationDelay = `${index * 0.1}s`;
            
            row.innerHTML = `
                <td><strong>${item.course}</strong></td>
                <td>${item.lessonDuration}</td>
                <td>${item.lessonsCount}</td>
                <td>
                    <div class="price-cell">
                        ${item.lessonPrice}
                    </div>
                </td>
                <td><strong>${item.totalPrice}</strong></td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    
    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = 'none';
            page.classList.remove('active');
        });
        
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Show selected page
        const pageElement = document.getElementById(`${pageId}-page`);
        if (pageElement) {
            this.currentPage = pageId;
            
            // Apply page transition animation
            if (typeof Animations !== 'undefined') {
                Animations.animatePageTransition(pageElement);
            }
            
            // Update active nav link
            const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
            
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // If showing courses page, ensure cards are rendered
            if (pageId === 'courses') {
                setTimeout(() => {
                    this.renderCourseCards();
                }, 100);
            }
        }
    }
    
    handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            childName: document.getElementById('child-name').value,
            childAge: document.getElementById('child-age').value,
            parentName: document.getElementById('parent-name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            courseId: document.getElementById('course-interest').value,
            courseName: document.getElementById('course-interest').options[document.getElementById('course-interest').selectedIndex].text
        };
        
        // Validate form
        if (!this.validateForm(formData)) {
            return;
        }
        
        // Show loading animation
        const submitButton = document.querySelector('.submit-button');
        const originalContent = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Определяем преподавателя для уведомления
            const teacherInfo = this.getTeacherInfo(formData.courseId);
            
            // Сохраняем заявку и отправляем уведомления
            this.saveApplication(formData, teacherInfo);
            
            // Show success message to user
            const alertBox = document.createElement('div');
            alertBox.className = 'custom-alert';
            alertBox.innerHTML = `
                <div class="alert-content">
                    <div class="alert-header">
                        <i class="fas fa-check-circle" style="color: var(--primary-green); font-size: 2rem;"></i>
                        <h3>Заявка отправлена!</h3>
                    </div>
                    <div class="alert-body">
                        <p><strong>Спасибо, ${formData.parentName}!</strong></p>
                        <p>Вы записали <strong>${formData.childName}</strong> на бесплатный пробный урок по курсу:</p>
                        <p class="course-highlight">"${formData.courseName}"</p>
                        
                        <div class="success-info">
                            <p><i class="fas fa-check"></i> Заявка успешно отправлена</p>
                            <p><i class="fas fa-clock"></i> Наш преподаватель свяжется с вами в течение 24 часов</p>
                            <p><i class="fab fa-telegram"></i> Вопросы можно задать в <a href="https://t.me/TwinSkill_Bot" target="_blank">@TwinSkill_Bot</a></p>
                        </div>
                    </div>
                    <div class="alert-footer">
                        <button class="cta-button alert-ok-btn">Отлично!</button>
                    </div>
                </div>
            `;
            
            // Add custom alert styles
            const style = document.createElement('style');
            style.textContent = `
                .custom-alert {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    animation: fadeIn 0.3s ease;
                }
                
                .alert-content {
                    background-color: white;
                    border-radius: 15px;
                    padding: 30px;
                    max-width: 500px;
                    width: 90%;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    animation: slideUp 0.4s ease;
                }
                
                .alert-header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                
                .alert-header h3 {
                    color: var(--primary-blue);
                    margin-top: 10px;
                }
                
                .alert-body {
                    margin-bottom: 25px;
                }
                
                .course-highlight {
                    background-color: var(--light-blue);
                    padding: 10px 15px;
                    border-radius: 8px;
                    border-left: 4px solid var(--primary-blue);
                    font-weight: 600;
                    margin: 10px 0;
                }
                
                .success-info {
                    background-color: var(--light-green);
                    padding: 15px;
                    border-radius: 10px;
                    margin: 15px 0;
                    border-left: 4px solid var(--primary-green);
                }
                
                .success-info a {
                    color: var(--primary-blue);
                    text-decoration: none;
                    font-weight: 600;
                }
                
                .success-info a:hover {
                    text-decoration: underline;
                }
                
                .alert-footer {
                    text-align: center;
                }
                
                .alert-ok-btn {
                    padding: 12px 30px;
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(alertBox);
            
            // Add handler for close button
            const okBtn = alertBox.querySelector('.alert-ok-btn');
            okBtn.addEventListener('click', () => {
                document.body.removeChild(alertBox);
                document.head.removeChild(style);
                
                // Show success animation
                if (typeof Animations !== 'undefined') {
                    Animations.showSuccessAnimation(submitButton);
                }
                
                // Reset form and button
                document.getElementById('free-lesson-form').reset();
                submitButton.innerHTML = originalContent;
                submitButton.disabled = false;
                
                // Return to home page after success
                setTimeout(() => {
                    this.showPage('home');
                }, 500);
            });
            
        }, 1500);
    }
    
    getTeacherInfo(courseId) {
        // Возвращаем только имя преподавателя, не username
        if (courseId.includes('english')) {
            return {
                name: 'Петрашевич Майя (английский язык)',
                type: 'english'
            };
        } else {
            return {
                name: 'Каркота Александра (программирование)',
                type: 'programming'
            };
        }
    }
    
    saveApplication(formData, teacherInfo) {
        // Сохраняем заявку в localStorage
        const applications = JSON.parse(localStorage.getItem('twinSkillApplications') || '[]');
        
        const application = {
            ...formData,
            teacherName: teacherInfo.name,
            timestamp: new Date().toISOString(),
            status: 'pending',
            applicationId: 'TS-' + Date.now().toString().slice(-8)
        };
        
        applications.push(application);
        localStorage.setItem('twinSkillApplications', JSON.stringify(applications));
        
        // Отправляем в Telegram группу
        this.sendTelegramToGroup(application);
        
        // Логируем email
        this.sendEmailNotification(application);
        
        // Логируем в консоль
        console.log('📋 Заявка сохранена в localStorage');
        console.log('📊 Всего заявок:', applications.length);
    }
    
    async sendTelegramToGroup(application) {
        try {
            const message = this.formatTelegramMessage(application);
            const url = `https://api.telegram.org/bot${this.telegramToken}/sendMessage`;
            
            console.log('📨 Отправка в группу...');
            console.log('Chat ID:', this.groupChatId);
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.groupChatId,
                    text: message,
                    parse_mode: 'HTML',
                    disable_web_page_preview: true
                })
            });
            
            const result = await response.json();
            
            if (result.ok) {
                console.log('✅ Сообщение успешно отправлено в группу!');
                console.log('Message ID:', result.result.message_id);
            } else {
                console.error('❌ Ошибка отправки в группу:', result.description);
                
                // Показываем ссылку для ручной отправки в группу
                const groupLink = `https://t.me/c/${this.groupChatId.replace('-100', '')}`;
                console.log('Ссылка на группу:', groupLink);
            }
        } catch (error) {
            console.error('❌ Ошибка сети:', error);
        }
    }
    
    formatTelegramMessage(application) {
        const isEnglish = application.courseId.includes('english');
        const emoji = isEnglish ? '🇬🇧' : '💻';
        
        return `
<b>${emoji} НОВАЯ ЗАЯВКА НА ПРОБНЫЙ УРОК!</b>

<b>📚 Курс:</b> ${application.courseName}
<b>👨‍🏫 Преподаватель:</b> ${application.teacherName}
<b>👶 Ученик:</b> ${application.childName} (${application.childAge} лет)
<b>👨‍👩‍👧 Родитель:</b> ${application.parentName}
<b>📱 Телефон:</b> ${application.phone}
<b>📧 Email:</b> ${application.email}

<b>⏰ Время заявки:</b> ${new Date(application.timestamp).toLocaleString('ru-RU')}
<b>🆔 ID заявки:</b> <code>${application.applicationId}</code>

<i>📍 Заявка отправлена через сайт TwinSkill</i>
    `.trim();
    }
    
    sendEmailNotification(application) {
        // Создаем ссылку для отправки email через mailto:
        const subject = encodeURIComponent(`Новая заявка: ${application.courseName}`);
        const body = encodeURIComponent(`
Заявка ID: ${application.applicationId}
Курс: ${application.courseName}
Преподаватель: ${application.teacherName}
Ученик: ${application.childName}, ${application.childAge} лет
Родитель: ${application.parentName}
Телефон: ${application.phone}
Email: ${application.email}
Время: ${new Date(application.timestamp).toLocaleString()}

---
Отправлено через сайт TwinSkill
    `);
        
        const mailtoLink = `mailto:wearesomecompany@gmail.com?subject=${subject}&body=${body}`;
        
        // Показываем пользователю опцию отправки email
        setTimeout(() => {
            if (confirm('Отправить копию заявки на email компании?')) {
                window.open(mailtoLink, '_blank');
            }
        }, 2000);
        
        // Логируем в консоль
        console.log('📧 Ссылка для отправки email:', mailtoLink);
    }
    
    validateForm(formData) {
        let isValid = true;
        
        // Очищаем предыдущие ошибки
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.invalid-input').forEach(el => el.classList.remove('invalid-input'));
        
        // Simple validation
        if (!formData.childName || formData.childName.length < 2) {
            this.showValidationError('child-name', 'Введите имя ребенка (минимум 2 символа)');
            isValid = false;
        }
        
        if (!formData.childAge || formData.childAge < 6 || formData.childAge > 17) {
            this.showValidationError('child-age', 'Возраст должен быть от 6 до 17 лет');
            isValid = false;
        }
        
        if (!formData.parentName || formData.parentName.length < 2) {
            this.showValidationError('parent-name', 'Введите ваше имя (минимум 2 символа)');
            isValid = false;
        }
        
        if (!formData.phone || formData.phone.replace(/\D/g, '').length < 7) {
            this.showValidationError('phone', 'Введите корректный номер телефона');
            isValid = false;
        }
        
        if (!formData.email || !this.validateEmail(formData.email)) {
            this.showValidationError('email', 'Введите корректный email адрес');
            isValid = false;
        }
        
        if (!formData.courseId) {
            this.showValidationError('course-interest', 'Выберите курс из списка');
            isValid = false;
        }
        
        return isValid;
    }
    
    showValidationError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.classList.add('invalid-input');
            
            // Создаем элемент с ошибкой
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.color = '#ff4444';
            errorDiv.style.fontSize = '0.8rem';
            errorDiv.style.marginTop = '5px';
            errorDiv.style.animation = 'fadeIn 0.3s ease';
            
            field.parentElement.appendChild(errorDiv);
            
            // Добавляем анимацию встряски
            field.style.animation = 'shake 0.5s';
            setTimeout(() => {
                field.style.animation = '';
            }, 500);
            
            // Удаляем ошибку при вводе
            const removeError = () => {
                field.classList.remove('invalid-input');
                if (errorDiv.parentElement) {
                    errorDiv.remove();
                }
                field.removeEventListener('input', removeError);
                field.removeEventListener('change', removeError);
            };
            
            field.addEventListener('input', removeError);
            field.addEventListener('change', removeError);
            
            // Прокручиваем к первой ошибке
            if (!document.querySelector('.error-message:first-child')) {
                field.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
    
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Метод для получения статистики заявок
    getApplicationStats() {
        const applications = JSON.parse(localStorage.getItem('twinSkillApplications') || '[]');
        
        const stats = {
            total: applications.length,
            programming: applications.filter(app => !app.courseId.includes('english')).length,
            english: applications.filter(app => app.courseId.includes('english')).length,
            pending: applications.filter(app => app.status === 'pending').length,
            completed: applications.filter(app => app.status === 'completed').length,
            today: applications.filter(app => {
                const appDate = new Date(app.timestamp);
                const today = new Date();
                return appDate.toDateString() === today.toDateString();
            }).length,
            thisWeek: applications.filter(app => {
                const appDate = new Date(app.timestamp);
                const now = new Date();
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                return appDate >= weekAgo;
            }).length
        };
        
        return stats;
    }
    
    // Метод для отображения статистики
    showAdminStats() {
        const stats = this.getApplicationStats();
        
        console.log('📊 СТАТИСТИКА ЗАЯВОК:');
        console.log('===================');
        console.log(`📈 Всего заявок: ${stats.total}`);
        console.log(`💻 Программирование: ${stats.programming}`);
        console.log(`🇬🇧 Английский: ${stats.english}`);
        console.log(`⏳ Ожидают: ${stats.pending}`);
        console.log(`✅ Завершены: ${stats.completed}`);
        console.log(`📅 Сегодня: ${stats.today}`);
        console.log(`📆 За неделю: ${stats.thisWeek}`);
        console.log('===================');
        
        return stats;
    }
}

// Global app instance
let app;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations first
    if (typeof Animations !== 'undefined') {
        Animations.init();
    }
    
    // Initialize main app
    app = new TwinSkillApp();
    
    // Make app available globally for onclick handlers
    window.app = app;
    window.showPage = (pageId) => app.showPage(pageId);
    
    // Add animation to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            const icons = this.querySelectorAll('.logo-icon i');
            icons.forEach((icon, index) => {
                icon.style.animationDelay = `${index * 0.1}s`;
                icon.classList.add('bounce-animation');
                setTimeout(() => {
                    icon.classList.remove('bounce-animation');
                }, 1000);
            });
        });
    }
    
    // Add click handler to Telegram bot link
    const botLinks = document.querySelectorAll('a[href*="t.me/TwinSkill_Bot"]');
    botLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Анимация при клике
            this.classList.add('btn-click');
            setTimeout(() => {
                this.classList.remove('btn-click');
            }, 200);
            
            console.log('🔗 Переход к Telegram боту: @TwinSkill_Bot');
        });
    });
    
    // Add form field auto-formatting
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = '+' + value;
                } else if (value.length <= 5) {
                    value = '+' + value.substring(0, 3) + ' (' + value.substring(3);
                } else if (value.length <= 8) {
                    value = '+' + value.substring(0, 3) + ' (' + value.substring(3, 5) + ') ' + value.substring(5);
                } else if (value.length <= 10) {
                    value = '+' + value.substring(0, 3) + ' (' + value.substring(3, 5) + ') ' + value.substring(5, 8) + '-' + value.substring(8);
                } else {
                    value = '+' + value.substring(0, 3) + ' (' + value.substring(3, 5) + ') ' + value.substring(5, 8) + '-' + value.substring(8, 10) + '-' + value.substring(10, 12);
                }
            }
            this.value = value;
        });
    }
    
    // Show welcome message in console
    console.log('%c🎓 TwinSkill - Детские курсы', 'color: #2d7eff; font-size: 18px; font-weight: bold;');
    console.log('%c📧 Email компании: wearesomecompany@gmail.com', 'color: #930184;');
    console.log('%c🤖 Основной Telegram бот: @TwinSkill_Bot', 'color: #00ba13;');
    console.log('%c👥 Уведомления отправляются в группу:', 'color: #00ba13; font-weight: bold;');
    console.log(`%c   • ID группы: ${app.groupChatId}`, 'color: #2d7eff;');
    console.log('%c   • Убедитесь, что бот добавлен в группу как администратор', 'color: #930184;');
    
    // Check for existing applications
    const applications = JSON.parse(localStorage.getItem('twinSkillApplications') || '[]');
    if (applications.length > 0) {
        console.log(`%c📋 Всего сохраненных заявок: ${applications.length}`, 'color: #00ba13; font-weight: bold;');
    }
});