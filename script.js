// Audio elements
const keySound = document.getElementById('keySound');
const enterSound = document.getElementById('enterSound');
const successSound = document.getElementById('successSound');

// Scroll Progress Bar
const progressBar = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
    progressBar.style.width = `${scrollPercentage}%`;
});

// Terminal functionality
const terminal = {
    commands: {
        help: () => `Available commands:
- about: Learn more about Martin
- skills: View technical skills
- projects: List current projects
- contact: Get contact information
- clear: Clear the terminal
- help: Show this help message`,
        
        about: () => `Martin Härtel
=============
A passionate software developer focused on creating interactive and accessible web applications.
Currently working on various projects involving automation and web development.

Experience:
- Test automation and test coverage
- REST API development
- Agile team collaboration
- Full-stack development`,
        
        skills: () => `Technical Skills
===============
Languages: PHP, JavaScript, Python, Go
Frontend: HTML5, CSS3, Playwright
Backend: Symfony, Laminas, Node.js
Testing: PHPUnit, Codeception
Tools: Git, Docker, Jenkins
Databases: MySQL, MSSQL, SQLite`,
        
        projects: () => `Current Projects
===============
1. Greenhouse Control - Automated greenhouse control system
2. Weather Bot - Discord weather information bot
3. LoL Ranker Bot - League of Legends ranking profile checker`,
        
        contact: () => `Contact Information
==================
Email: contact@martinhaertel.dev
GitHub: github.com/tethos
LinkedIn: linkedin.com/in/martin-härtel-603877349`,
        
        clear: () => {
            terminalOutput.innerHTML = '';
            return '';
        }
    },
    
    history: [],
    historyIndex: -1
};

const terminalInput = document.getElementById('terminal-command');
const terminalOutput = document.querySelector('.terminal-output');

// Add welcome message
function addWelcomeMessage() {
    const welcomeMessage = `Welcome to Martin's Portfolio Terminal! 🚀
Type 'help' to see available commands.

visitor@portfolio:~$ `;
    
    const welcomeLine = document.createElement('div');
    welcomeLine.className = 'terminal-line welcome-message';
    welcomeLine.textContent = welcomeMessage;
    terminalOutput.appendChild(welcomeLine);
}

// Add command to terminal output
function addToTerminal(input, output) {
    const inputLine = document.createElement('div');
    inputLine.className = 'terminal-line';
    inputLine.innerHTML = `<span class="terminal-prompt">visitor@portfolio:~$</span> ${input}`;
    
    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-line';
    outputLine.innerText = output;
    
    terminalOutput.appendChild(inputLine);
    if (output) terminalOutput.appendChild(outputLine);
    
    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Play sound with volume adjustment
function playSound(sound) {
    const clone = sound.cloneNode();
    clone.volume = 0.3;
    clone.play();
}

// Handle terminal input
terminalInput.addEventListener('keydown', (e) => {
    // Play key sound for any key press
    if (e.key.length === 1) {
        playSound(keySound);
    }

    if (e.key === 'Enter') {
        playSound(enterSound);
        const command = terminalInput.value.toLowerCase().trim();
        
        if (command) {
            terminal.history.push(command);
            terminal.historyIndex = terminal.history.length;
            
            const output = terminal.commands[command] 
                ? terminal.commands[command]() 
                : `Command not found: ${command}. Type 'help' for available commands.`;
            
            if (terminal.commands[command]) {
                playSound(successSound);
            }
            
            addToTerminal(command, output);
            terminalInput.value = '';
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (terminal.historyIndex > 0) {
            terminal.historyIndex--;
            terminalInput.value = terminal.history[terminal.historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (terminal.historyIndex < terminal.history.length - 1) {
            terminal.historyIndex++;
            terminalInput.value = terminal.history[terminal.historyIndex];
        } else {
            terminal.historyIndex = terminal.history.length;
            terminalInput.value = '';
        }
    }
});

// Focus terminal input when clicking anywhere in the terminal
document.querySelector('.terminal').addEventListener('click', () => {
    terminalInput.focus();
});

// Initialize terminal with welcome message
document.addEventListener('DOMContentLoaded', () => {
    addWelcomeMessage();
    terminalInput.focus();
});

// Prevent initial scroll to bottom
window.onload = () => {
    window.scrollTo(0, 0);
};

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Add typing effect to hero section
const heroText = document.querySelector('.hero-content h1');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    typeWriter();
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    }
});

// Animate skill bars on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.progress;
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-fill').forEach(bar => {
    observer.observe(bar);
});

// Dynamic Background
document.addEventListener('mousemove', (e) => {
    const mouseY = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-y', `${mouseY}%`);
});

// Add parallax effect to background grid
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const grid = document.querySelector('.background-grid');
    if (grid) {
        grid.style.transform = `translateY(${scrolled * 0.1}px) rotate(${scrolled * 0.01}deg)`;
    }
}); 