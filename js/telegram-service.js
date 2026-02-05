// Telegram Bot Service
class TelegramService {
    constructor() {
        // В реальном приложении здесь был бы токен бота
        this.botToken = 'YOUR_BOT_TOKEN_HERE';
        this.botUsername = '@TwinSkill_Bot';
        this.teachers = {
            programming: '@Alexandria_K22',
            english: '@MaiMyMay'
        };
    }
    
    // Метод для отправки заявки преподавателю
    async sendApplicationToTeacher(application) {
        try {
            // Определяем тип курса
            const courseType = application.courseId.includes('english') ? 'english' : 'programming';
            const teacherUsername = this.teachers[courseType];
            
            // Формируем сообщение
            const message = this.formatApplicationMessage(application);
            
            // В реальном приложении здесь был бы код отправки в Telegram
            console.log(`Отправка заявки преподавателю: ${teacherUsername}`);
            console.log('Сообщение:', message);
            
            // Симуляция отправки
            await this.simulateTelegramSend(teacherUsername, message);
            
            // Также отправляем копию в общий бот
            await this.sendToAdminBot(application);
            
            return true;
        } catch (error) {
            console.error('Ошибка отправки в Telegram:', error);
            return false;
        }
    }
    
    formatApplicationMessage(application) {
        const emoji = application.courseId.includes('english') ? '🇬🇧' : '💻';
        const date = new Date().toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        return `
${emoji} *НОВАЯ ЗАЯВКА НА ПРОБНЫЙ УРОК*

*Курс:* ${application.courseName}
*Ученик:* ${application.childName} (${application.childAge} лет)
*Родитель:* ${application.parentName}
*Контакты:* ${application.phone}, ${application.email}
*Время подачи:* ${date}

_Заявка №${Date.now().toString().slice(-6)}_
        `.trim();
    }
    
    async simulateTelegramSend(username, message) {
        // Симуляция задержки сети
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log(`✅ Сообщение отправлено ${username}`);
        console.log('📝 Содержание:', message);
        
        // В реальном приложении здесь был бы код:
        /*
        const response = await fetch(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: username,
                text: message,
                parse_mode: 'Markdown'
            })
        });
        
        return await response.json();
        */
    }
    
    async sendToAdminBot(application) {
        // Отправка копии в основной бот для админов
        const adminMessage = `
📊 *СТАТИСТИКА: НОВАЯ ЗАЯВКА*

*Тип:* ${application.courseId.includes('english') ? 'Английский' : 'Программирование'}
*Курс:* ${application.courseName}
*Ученик:* ${application.childName}
*Возраст:* ${application.childAge}
*Контакты:* ${application.phone}

*Преподаватель:* ${application.teacherName}
*Telegram:* ${application.teacherTelegram}

_${new Date().toLocaleString('ru-RU')}_
        `.trim();
        
        await this.simulateTelegramSend(this.botUsername, adminMessage);
    }
    
    // Метод для получения статистики
    async getStatistics() {
        const applications = JSON.parse(localStorage.getItem('twinSkillApplications') || '[]');
        
        const stats = {
            total: applications.length,
            programming: applications.filter(app => !app.courseId.includes('english')).length,
            english: applications.filter(app => app.courseId.includes('english')).length,
            today: applications.filter(app => {
                const appDate = new Date(app.timestamp);
                const today = new Date();
                return appDate.toDateString() === today.toDateString();
            }).length
        };
        
        return stats;
    }
}

// Создаем глобальный экземпляр
const telegramService = new TelegramService();
window.telegramService = telegramService;