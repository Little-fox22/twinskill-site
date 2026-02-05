// Animation utilities
class Animations {
    static init() {
        // Initialize all animations
        this.addButtonAnimations();
        this.addIconAnimations();
        this.addFormAnimations();
        this.addScrollAnimations();
        this.addHoverAnimations();
    }
    
    static addButtonAnimations() {
        // Add click animation to all buttons
        const buttons = document.querySelectorAll('button, .cta-button, .nav-link, .footer-link, .social-icon');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Add click animation class
                this.classList.add('btn-click');
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    this.classList.remove('btn-click');
                }, 200);
                
                // Add bounce animation to icons inside buttons
                const icon = this.querySelector('.button-icon, i');
                if (icon) {
                    icon.classList.add('bounce-animation');
                    setTimeout(() => {
                        icon.classList.remove('bounce-animation');
                    }, 1000);
                }
            });
            
            // Add hover animation for scale-on-hover elements
            if (button.classList.contains('scale-on-hover')) {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.1)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            }
        });
    }
    
    static addIconAnimations() {
        // Add hover animations to all icons
        const icons = document.querySelectorAll('i, .course-icon, .teacher-avatar i, .form-icon');
        
        icons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                if (!this.classList.contains('floating')) {
                    this.style.transform = 'scale(1.2)';
                }
            });
            
            icon.addEventListener('mouseleave', function() {
                if (!this.classList.contains('floating')) {
                    this.style.transform = 'scale(1)';
                }
            });
            
            // Add click animation for interactive icons
            icon.addEventListener('click', function() {
                this.classList.add('bounce-animation');
                setTimeout(() => {
                    this.classList.remove('bounce-animation');
                }, 1000);
            });
        });
        
        // Make course cards icons bounce on hover
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.course-icon');
                if (icon) {
                    icon.classList.add('bounce-animation');
                    setTimeout(() => {
                        icon.classList.remove('bounce-animation');
                    }, 1000);
                }
            });
        });
    }
    
    static addFormAnimations() {
        const form = document.getElementById('free-lesson-form');
        if (form) {
            const inputs = form.querySelectorAll('input, select');
            
            inputs.forEach(input => {
                // Add focus animation
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                    const icon = this.parentElement.querySelector('.form-icon');
                    if (icon) {
                        icon.style.transform = 'scale(1.2)';
                        icon.style.color = '#2d7eff';
                    }
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.classList.remove('focused');
                    const icon = this.parentElement.querySelector('.form-icon');
                    if (icon) {
                        icon.style.transform = 'scale(1)';
                        icon.style.color = '';
                    }
                });
                
                // Add validation animation
                input.addEventListener('input', function() {
                    if (this.checkValidity()) {
                        this.classList.remove('invalid-input');
                        this.classList.add('valid-input');
                    } else {
                        this.classList.remove('valid-input');
                    }
                });
                
                input.addEventListener('invalid', function() {
                    this.classList.add('invalid-input');
                    setTimeout(() => {
                        this.classList.remove('invalid-input');
                    }, 500);
                });
            });
        }
    }
    
    static addScrollAnimations() {
        // Animate elements when they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation classes based on element type
                    if (entry.target.classList.contains('course-card')) {
                        entry.target.classList.add('slide-up');
                    } else if (entry.target.classList.contains('teacher-card')) {
                        entry.target.classList.add('slide-up');
                    } else if (entry.target.classList.contains('section-title')) {
                        entry.target.classList.add('fade-in');
                    }
                    
                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate on scroll
        const elementsToAnimate = document.querySelectorAll('.course-card, .teacher-card, .section-title, .category-title');
        elementsToAnimate.forEach(el => observer.observe(el));
    }
    
    static addHoverAnimations() {
        // Add hover animation to table rows
        const tableRows = document.querySelectorAll('tbody tr');
        tableRows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
        
        // Add hover animation to course cards
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const header = this.querySelector('.course-header');
                if (header) {
                    header.style.transform = 'scale(1.02)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const header = this.querySelector('.course-header');
                if (header) {
                    header.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    static animatePageTransition(pageElement) {
        // Add entrance animation for page
        pageElement.style.opacity = '0';
        pageElement.style.transform = 'translateY(20px)';
        pageElement.style.display = 'block';
        
        // Trigger reflow
        void pageElement.offsetWidth;
        
        // Animate in
        pageElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        pageElement.style.opacity = '1';
        pageElement.style.transform = 'translateY(0)';
        
        // Animate elements within page
        setTimeout(() => {
            const animatedElements = pageElement.querySelectorAll('.slide-up, .fade-in, .scale-in');
            animatedElements.forEach((el, index) => {
                el.style.animationDelay = `${index * 0.1}s`;
                el.classList.add('animate');
            });
        }, 300);
    }
    
    static showSuccessAnimation(element) {
        // Create success animation
        const successDiv = document.createElement('div');
        successDiv.className = 'success-checkmark';
        successDiv.innerHTML = '<div class="check-icon"></div>';
        
        // Insert after the element
        element.parentNode.insertBefore(successDiv, element.nextSibling);
        
        // Remove after animation
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    Animations.init();
});