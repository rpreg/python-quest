// Python Quest Space Game - Main Game Engine
// Educational space shooter game for learning Python programming

class SpaceQuestGame {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.gameState = 'loading'; // loading, menu, playing, paused, gameOver
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.currentQuestion = null;
        this.questionsPool = [];
        this.currentQuestionIndex = 0;
        
        // Game objects
        this.spaceship = { x: 380, y: 500, width: 40, height: 40 };
        this.asteroids = [];
        this.lasers = [];
        this.explosions = [];
        this.stars = [];
        
        // Input handling
        this.keysPressed = new Set();
        
        // Game timing
        this.lastTime = 0;
        this.animationId = null;
        
        // Initialize game
        this.init();
    }
    
    async init() {
        // Simulate loading
        await this.simulateLoading();
        
        // Get DOM elements
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Initialize stars
        this.initStars();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Start game loop
        this.gameState = 'menu';
        this.updateUI();
        this.gameLoop();
    }
    
    async simulateLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressBar = document.querySelector('.loading-progress');
        const loadingText = document.querySelector('.loading-text');
        
        const loadingSteps = [
            'Inicializando motores...',
            'Cargando arsenal láser...',
            'Conectando con base espacial...',
            'Calibrando sensores...',
            'Preparando preguntas de Python...',
            '¡Sistema listo!'
        ];
        
        for (let i = 0; i < loadingSteps.length; i++) {
            loadingText.textContent = loadingSteps[i];
            progressBar.style.width = `${((i + 1) / loadingSteps.length) * 100}%`;
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        loadingScreen.classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
    }
    
    initStars() {
        this.stars = [];
        for (let i = 0; i < 100; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.5 + 0.1,
                opacity: Math.random() * 0.8 + 0.2
            });
        }
    }
    
    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // Button events
        document.getElementById('start-button').addEventListener('click', () => this.startGame());
        document.getElementById('continue-button').addEventListener('click', () => this.continueGame());
        document.getElementById('restart-button').addEventListener('click', () => this.restartGame());
        document.getElementById('menu-button').addEventListener('click', () => this.returnToMenu());
    }
    
    handleKeyDown(e) {
        this.keysPressed.add(e.code);
        
        switch (e.code) {
            case 'Space':
                e.preventDefault();
                if (this.gameState === 'playing') {
                    this.fireLaser();
                }
                break;
            case 'Escape':
                if (this.gameState === 'playing') {
                    this.pauseGame();
                } else if (this.gameState === 'paused') {
                    this.continueGame();
                }
                break;
            case 'Enter':
                if (this.gameState === 'menu') {
                    this.startGame();
                } else if (this.gameState === 'paused') {
                    this.continueGame();
                } else if (this.gameState === 'gameOver') {
                    this.restartGame();
                }
                break;
        }
    }
    
    handleKeyUp(e) {
        this.keysPressed.delete(e.code);
    }
    
    startGame() {        
        if (this.gameState === 'menu' || this.gameState === 'gameOver') {
            this.score = 0;
            this.lives = 3;
            this.level = 1;
            this.currentQuestionIndex = 0;
            this.initializeLevel();
        }
        this.gameState = 'playing';
        this.updateUI();
    }
    
    pauseGame() {
        this.gameState = 'paused';
        this.showToast('Juego pausado', 'info');
        this.updateUI();
    }
    
    continueGame() {
        this.gameState = 'playing';
        this.showToast('Juego reanudado', 'info');
        this.updateUI();
    }
    
    restartGame() {
        this.gameState = 'menu';
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.currentQuestion = null;
        this.questionsPool = [];
        this.currentQuestionIndex = 0;
        this.asteroids = [];
        this.lasers = [];
        this.explosions = [];
        this.spaceship = { x: 380, y: 500, width: 40, height: 40 };
        this.updateUI();
    }
    
    returnToMenu() {
        this.restartGame();
    }
    
    initializeLevel() {
        // Single level with 12 questions
        if (this.level === 1) {
            this.questionsPool = getRandomQuestions(12);
            this.currentQuestionIndex = 0;
            this.currentQuestion = this.questionsPool[0] || null;
            
            if (this.currentQuestion) {
                this.currentQuestion = shuffleQuestionOptions(this.currentQuestion);
                this.createAsteroids();
            } else {
                this.showToast('No hay preguntas disponibles', 'error');
            }
            
            this.showToast(`🚀 Misión iniciada! ${this.questionsPool.length} preguntas por responder`, 'success');
        }
    }
    
    createAsteroids() {
        if (!this.currentQuestion) return;
        
        this.asteroids = [];
        const baseSpeed = 0.5 + (this.level * 0.2);
        
        this.currentQuestion.options.forEach((option, index) => {
            const asteroid = {
                id: `asteroid-${index}`,
                x: Math.random() * 600 + 100,
                y: -100 - (index * 50),
                width: 80,
                height: 80,
                vx: (Math.random() - 0.5) * 0.5,
                vy: baseSpeed + Math.random() * 0.3,
                option,
                isCorrect: index === this.currentQuestion.correctAnswer,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 2
            };
            this.asteroids.push(asteroid);
        });
    }
    
    fireLaser() {
        const laser = {
            id: `laser-${Date.now()}`,
            x: this.spaceship.x + this.spaceship.width / 2 - 2,
            y: this.spaceship.y,
            width: 4,
            height: 20,
            vy: -8
        };
        this.lasers.push(laser);
    }
    
    update(deltaTime) {
        if (this.gameState !== 'playing') return;
        
        this.updateSpaceship();
        this.updateAsteroids();
        this.updateLasers();
        this.updateExplosions();
        this.updateStars();
        this.checkCollisions();
    }
    
    updateSpaceship() {
        if (this.keysPressed.has('ArrowLeft') && this.spaceship.x > 0) {
            this.spaceship.x -= 5;
        }
        if (this.keysPressed.has('ArrowRight') && this.spaceship.x < this.canvas.width - this.spaceship.width) {
            this.spaceship.x += 5;
        }
    }
    
    updateAsteroids() {
        this.asteroids = this.asteroids.map(asteroid => ({
            ...asteroid,
            x: asteroid.x + asteroid.vx,
            y: asteroid.y + asteroid.vy,
            rotation: asteroid.rotation + asteroid.rotationSpeed
        })).filter(asteroid => asteroid.y < this.canvas.height + 100);
    }
    
    updateLasers() {
        this.lasers = this.lasers.map(laser => ({
            ...laser,
            y: laser.y + laser.vy
        })).filter(laser => laser.y > -20);
    }
    
    updateExplosions() {
        this.explosions = this.explosions.map(explosion => ({
            ...explosion,
            life: explosion.life - 1,
            scale: explosion.scale + 0.1
        })).filter(explosion => explosion.life > 0);
    }
    
    updateStars() {
        this.stars.forEach(star => {
            star.y += star.speed;
            if (star.y > this.canvas.height) {
                star.y = -5;
                star.x = Math.random() * this.canvas.width;
            }
        });
    }
    
    checkCollisions() {
        for (let i = this.lasers.length - 1; i >= 0; i--) {
            const laser = this.lasers[i];
            
            for (let j = this.asteroids.length - 1; j >= 0; j--) {
                const asteroid = this.asteroids[j];
                
                if (this.isColliding(laser, asteroid)) {
                    // Create explosion
                    this.createExplosion(asteroid.x + asteroid.width / 2, asteroid.y + asteroid.height / 2);
                    
                    // Remove laser and asteroid
                    this.lasers.splice(i, 1);
                    this.asteroids.splice(j, 1);
                    
                    // Handle answer
                    this.handleAnswerSelected(asteroid.isCorrect);
                    break;
                }
            }
        }
    }
    
    isColliding(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    createExplosion(x, y) {
        this.explosions.push({
            x: x - 25,
            y: y - 25,
            width: 50,
            height: 50,
            life: 30,
            scale: 0.1
        });
    }
    
    handleAnswerSelected(isCorrect) {
        // Show explanation first
        this.showExplanation(isCorrect);
        
        // Continue with the rest after a delay
        setTimeout(() => {
            if (isCorrect) {
                const pointsEarned = 100 * this.level;
                this.score += pointsEarned;
                this.showToast(`¡Correcto! +${pointsEarned} puntos`, 'success');
            } else {
                this.lives--;
                if (this.lives <= 0) {
                    this.gameState = 'gameOver';
                    this.showToast('¡Misión fallida! Se acabaron las vidas', 'error');
                    this.updateUI();
                    return;
                } else {
                    this.showToast(`¡Respuesta incorrecta! Vidas restantes: ${this.lives}`, 'error');
                }
            }
            
            // Move to next question
            const nextIndex = this.currentQuestionIndex + 1;
            if (nextIndex < this.questionsPool.length) {
                this.currentQuestionIndex = nextIndex;
                this.currentQuestion = shuffleQuestionOptions(this.questionsPool[nextIndex]);
                this.createAsteroids();
            } else {
                if (isCorrect) {
                    // Game completed - all 12 questions answered
                    const bonusPoints = 500;
                    this.score += bonusPoints;
                    this.showToast(`¡Juego completado! Bonus final: +${bonusPoints} puntos`, 'success');
                } else {
                    // Game completed - all 12 questions presented
                    this.showToast('Juego completado - Has respondido todas las preguntas', 'info');
                }
                
                setTimeout(() => {
                    this.gameState = 'gameOver';
                    this.updateUI();
                }, 2000);
            }
            
            this.updateUI();
        }, 5000); // Wait 5 seconds for explanation to be read
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#0a0a0f';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw stars
        this.drawStars();
        
        // Draw game objects
        this.drawSpaceship();
        this.drawAsteroids();
        this.drawLasers();
        this.drawExplosions();
    }
    
    drawStars() {
        this.stars.forEach(star => {
            this.ctx.save();
            this.ctx.globalAlpha = star.opacity;
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(star.x, star.y, star.size, star.size);
            this.ctx.restore();
        });
    }
    
    drawSpaceship() {
        this.ctx.save();
        
        // Spaceship glow effect
        this.ctx.shadowColor = '#00ffff';
        this.ctx.shadowBlur = 10;
        this.ctx.fillStyle = '#00ffff';
        this.ctx.fillRect(this.spaceship.x, this.spaceship.y, this.spaceship.width, this.spaceship.height);
        
        // Spaceship details
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(this.spaceship.x + 15, this.spaceship.y - 5, 10, 10);
        
        this.ctx.restore();
    }
    
    drawAsteroids() {
        this.asteroids.forEach(asteroid => {
            this.ctx.save();
            this.ctx.translate(asteroid.x + asteroid.width / 2, asteroid.y + asteroid.height / 2);
            this.ctx.rotate(asteroid.rotation * Math.PI / 180);
            
            // Asteroid body
            this.ctx.fillStyle = '#4a5568';
            this.ctx.strokeStyle = '#a0aec0';
            this.ctx.lineWidth = 2;
            this.ctx.fillRect(-asteroid.width / 2, -asteroid.height / 2, asteroid.width, asteroid.height);
            this.ctx.strokeRect(-asteroid.width / 2, -asteroid.height / 2, asteroid.width, asteroid.height);
            
            this.ctx.restore();
            
            // Draw option text
            this.ctx.save();
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '12px Orbitron, monospace';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            // Text with outline for better visibility
            this.ctx.strokeStyle = '#000000';
            this.ctx.lineWidth = 3;
            this.ctx.strokeText(asteroid.option, asteroid.x + asteroid.width / 2, asteroid.y + asteroid.height / 2);
            this.ctx.fillText(asteroid.option, asteroid.x + asteroid.width / 2, asteroid.y + asteroid.height / 2);
            
            this.ctx.restore();
        });
    }
    
    drawLasers() {
        this.ctx.save();
        this.ctx.fillStyle = '#ff6600';
        this.ctx.shadowColor = '#ff6600';
        this.ctx.shadowBlur = 5;
        
        this.lasers.forEach(laser => {
            this.ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
        });
        
        this.ctx.restore();
    }
    
    drawExplosions() {
        this.explosions.forEach(explosion => {
            this.ctx.save();
            this.ctx.globalAlpha = explosion.life / 30;
            this.ctx.translate(explosion.x + explosion.width / 2, explosion.y + explosion.height / 2);
            this.ctx.scale(explosion.scale, explosion.scale);
            
            const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, explosion.width / 2);
            gradient.addColorStop(0, '#ff6600');
            gradient.addColorStop(0.5, '#ff9900');
            gradient.addColorStop(1, 'rgba(255, 153, 0, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(-explosion.width / 2, -explosion.height / 2, explosion.width, explosion.height);
            
            this.ctx.restore();
        });
    }
    
    updateUI() {
        // Update score, lives, level
        document.getElementById('score').textContent = this.score.toLocaleString();
        document.getElementById('lives').textContent = '❤️'.repeat(Math.max(0, this.lives));
        document.getElementById('level').textContent = this.level;
        
        // Update status
        const statusDot = document.getElementById('status-dot');
        const statusText = document.getElementById('status-text');
        
        statusDot.className = 'status-dot';
        if (this.gameState === 'playing') {
            statusDot.classList.add('status-playing');
            statusText.textContent = 'EN LÍNEA';
        } else if (this.gameState === 'paused') {
            statusDot.classList.add('status-paused');
            statusText.textContent = 'PAUSA';
        } else if (this.gameState === 'gameOver') {
            statusDot.classList.add('status-game-over');
            statusText.textContent = 'DESCONECTADO';
        }
        
        // Update question panel
        const questionPanel = document.getElementById('question-panel');
        if (this.currentQuestion && (this.gameState === 'playing' || this.gameState === 'paused')) {
            questionPanel.classList.remove('hidden');
            document.getElementById('question-text').textContent = this.currentQuestion.question;
            
            const optionsGrid = document.getElementById('options-grid');
            optionsGrid.innerHTML = '';
            this.currentQuestion.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option-item';
                optionDiv.innerHTML = `
                    <div class="option-label">ASTEROIDE ${String.fromCharCode(65 + index)}</div>
                    <div class="option-text">${option}</div>
                `;
                optionsGrid.appendChild(optionDiv);
            });
        } else {
            questionPanel.classList.add('hidden');
        }
        
        // Update game over panel
        const gameOverPanel = document.getElementById('game-over-panel');
        if (this.gameState === 'gameOver') {
            gameOverPanel.classList.remove('hidden');
            document.getElementById('final-score').textContent = this.score.toLocaleString();
            document.getElementById('final-level').textContent = this.level;
        } else {
            gameOverPanel.classList.add('hidden');
        }
        
        // Update instructions
        const instructions = document.getElementById('instructions');
        if (this.gameState === 'playing' && this.score === 0) {
            instructions.classList.remove('hidden');
        } else {
            instructions.classList.add('hidden');
        }
        
        // Update pause overlay
        const pauseOverlay = document.getElementById('pause-overlay');
        if (this.gameState === 'paused') {
            pauseOverlay.classList.remove('hidden');
        } else {
            pauseOverlay.classList.add('hidden');
        }
        
        // Update menu
        this.updateMenu();
    }
    
    updateMenu() {
        const gameMenu = document.getElementById('game-menu');
        const missionBrief = document.getElementById('mission-brief');
        const pauseInfo = document.getElementById('pause-info');
        const finalInfo = document.getElementById('final-info');
        const controlsInfo = document.getElementById('controls-info');
        
        const startButton = document.getElementById('start-button');
        const continueButton = document.getElementById('continue-button');
        const restartButton = document.getElementById('restart-button');
        const menuButton = document.getElementById('menu-button');
        
        if (this.gameState === 'playing') {
            gameMenu.classList.add('hidden');
            return;
        }
        
        gameMenu.classList.remove('hidden');
        
        // Hide all info sections first
        [missionBrief, pauseInfo, finalInfo].forEach(el => el.classList.add('hidden'));
        [startButton, continueButton, restartButton, menuButton].forEach(el => el.classList.add('hidden'));
        
        if (this.gameState === 'menu') {
            missionBrief.classList.remove('hidden');
            controlsInfo.classList.remove('hidden');
            startButton.classList.remove('hidden');
        } else if (this.gameState === 'paused') {
            pauseInfo.classList.remove('hidden');
            document.getElementById('pause-score').textContent = this.score.toLocaleString();
            document.getElementById('pause-level').textContent = this.level;
            continueButton.classList.remove('hidden');
            menuButton.classList.remove('hidden');
            controlsInfo.classList.add('hidden');
        } else if (this.gameState === 'gameOver') {
            finalInfo.classList.remove('hidden');
            document.getElementById('menu-final-score').textContent = this.score.toLocaleString();
            document.getElementById('menu-final-level').textContent = this.level;
            
            // Update final message based on score
            const finalMessage = document.getElementById('final-message');
            if (this.score >= 1000) {
                finalMessage.textContent = "¡Excelente trabajo, comandante! Eres un verdadero maestro del Python espacial.";
            } else if (this.score >= 500) {
                finalMessage.textContent = "¡Buen trabajo, piloto! Sigues mejorando tus habilidades de programación.";
            } else {
                finalMessage.textContent = "¡No te rindas, cadete! Cada misión te hace más fuerte en Python.";
            }
            
            restartButton.classList.remove('hidden');
            menuButton.classList.remove('hidden');
            controlsInfo.classList.add('hidden');
        }
    }
    
    showExplanation(isCorrect) {
        if (!this.currentQuestion || !this.currentQuestion.explanation) return;
        
        // Create explanation overlay
        const overlay = document.createElement('div');
        overlay.className = 'explanation-overlay';
        overlay.innerHTML = `
            <div class="explanation-content">
                <div class="explanation-header">
                    <div class="explanation-icon ${isCorrect ? 'correct' : 'incorrect'}">
                        ${isCorrect ? '✅' : '❌'}
                    </div>
                    <h3>${isCorrect ? '¡Correcto!' : 'Respuesta Incorrecta'}</h3>
                </div>
                <div class="explanation-text">
                    <h4>Explicación:</h4>
                    <p>${this.currentQuestion.explanation}</p>
                </div>
                <div class="explanation-footer">
                    <p>Continuando automáticamente en 5 segundos...</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Remove overlay after 5 seconds
        setTimeout(() => {
            overlay.remove();
        }, 5000);
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
        toast.textContent = `${icon} ${message}`;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, type === 'success' ? 2000 : type === 'error' ? 4000 : 3000);
    }
    
    gameLoop(timestamp = 0) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        this.update(deltaTime);
        this.draw();
        
        this.animationId = requestAnimationFrame((t) => this.gameLoop(t));
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new SpaceQuestGame();
});