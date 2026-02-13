// Функція переходу між сценами з анімацією
function showScene(sceneId) {
    const scenes = document.querySelectorAll('.scene');
    scenes.forEach(scene => {
        scene.classList.remove('active');
    });
    
    const targetScene = document.getElementById(sceneId);
    if (targetScene) {
        setTimeout(() => {
            targetScene.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    }
}

// Функція створення анімованих сердечок на фоні
function createFloatingHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'hearts-background';
    document.body.appendChild(heartsContainer);
    
    const heartTypes = ['💕', '❤️', '💖', '💗', '💝', '💘', '💓', '💞'];
    
    for (let i = 0; i < 700; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        
        if (i % 3 === 0) {
            heart.classList.add('wave');
        } else if (i % 3 === 1) {
            heart.classList.add('diagonal');
        }
        
        heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        heart.style.left = Math.random() * 100 + '%';
        
        const size = Math.random() * 15 + 15;
        heart.style.fontSize = size + 'px';
        heart.style.animationDelay = Math.random() * 10 + 's';
        
        const duration = Math.random() * 10 + 10;
        heart.style.animationDuration = duration + 's';
        
        const colors = [
            'rgba(255, 107, 157)',
            'rgba(196, 69, 105)',
            'rgba(255, 182, 193)',
            'rgba(255, 105, 180)',
            'rgba(219, 112, 147)'
        ];
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        heartsContainer.appendChild(heart);
    }
}

// ============================================
// АВТОСТАРТ МУЗИКИ
// ============================================
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

// Функція старту музики
function startMusic() {
    music.play().then(() => {
        isPlaying = true;
        musicToggle.textContent = '🔊';
        musicToggle.classList.add('playing');
        console.log('Музика почалась! 🎵');
    }).catch(error => {
        console.log('Клікни на сторінку щоб почати музику');
        // Якщо браузер блокує автостарт, чекаємо першого кліку
        document.addEventListener('click', function() {
            if (!isPlaying) {
                music.play();
                isPlaying = true;
                musicToggle.textContent = '🔊';
                musicToggle.classList.add('playing');
            }
        }, { once: true });
    });
}

// Функція toggle музики
function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicToggle.textContent = '🎵';
        musicToggle.classList.remove('playing');
        isPlaying = false;
    } else {
        music.play();
        musicToggle.textContent = '🔊';
        musicToggle.classList.add('playing');
        isPlaying = true;
    }
}

// Обробник кнопки музики
if (musicToggle) {
    musicToggle.addEventListener('click', toggleMusic);
}

// ============================================
// ІНІЦІАЛІЗАЦІЯ
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Гра для Анаіди завантажена! 💕');
    
    // Створюємо сердечка
    createFloatingHearts();
    
    // АВТОСТАРТ МУЗИКИ
    setTimeout(startMusic, 500); // Невелика затримка для надійності
    
    // Секретна кнопка
    const secretBtn = document.querySelector('.secret-button');
    if (secretBtn) {
        secretBtn.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    }
});

// Спалах сердечок при кліку
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') return;
    
    for (let i = 0; i < 7; i++) {
        const miniHeart = document.createElement('div');
        miniHeart.textContent = '💕';
        miniHeart.style.position = 'fixed';
        miniHeart.style.left = e.clientX + 'px';
        miniHeart.style.top = e.clientY + 'px';
        miniHeart.style.fontSize = '40px';
        miniHeart.style.pointerEvents = 'none';
        miniHeart.style.zIndex = '9999';
        miniHeart.style.animation = 'burstHeart 1s ease-out forwards';
        
        const angle = (Math.PI * 2 * i) / 3;
        miniHeart.style.setProperty('--tx', Math.cos(angle) * 100 + 'px');
        miniHeart.style.setProperty('--ty', Math.sin(angle) * 100 + 'px');
        
        document.body.appendChild(miniHeart);
        setTimeout(() => miniHeart.remove(), 1000);
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes burstHeart {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);