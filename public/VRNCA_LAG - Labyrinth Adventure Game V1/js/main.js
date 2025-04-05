// Variables globales
let playerName = '';
let playerPosition = { x: 1, y: 1 };
let batteryLevel = 100;
let maze = [];
let gameStarted = false;
let isMusicEnabled = true;
let isSoundEnabled = true;
let currentLevel = 1;
const maxLevel = 10;
let totalScore = 0;

// Variables pour le déplacement
let lastMoveTime = 0;
const moveCooldown = 100; // ms entre chaque mouvement

// Variables pour le leaderboard
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
const leaderboardButton = document.getElementById('leaderboard-button');
const leaderboardElement = document.getElementById('leaderboard');
const leaderboardContent = document.getElementById('leaderboard-content');

// Éléments DOM
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const playerNameInput = document.getElementById('player-name');
const startButton = document.getElementById('start-button');
const mazeContainer = document.getElementById('maze-container');
const playerNameDisplay = document.getElementById('player-name-display');
const batteryLevelDisplay = document.getElementById('battery-level');
const notificationArea = document.getElementById('notification-area');
const musicToggle = document.getElementById('music-toggle');
const soundToggle = document.getElementById('sound-toggle');
const levelDisplay = document.getElementById('level-display');
const scoreDisplay = document.getElementById('score-display');
const restartButton = document.getElementById('restart-button');
const abandonButton = document.getElementById('abandon-button');
const gameLeaderboardButton = document.getElementById('game-leaderboard-button');

// Gestion du son
const audio = {
    powerUp: new Audio('assets/son/powerup.mp3'),
    teleport: new Audio('assets/son/teleport.mp3'),
    malware: new Audio('assets/son/malware.mp3'),
    quiz: new Audio('assets/son/click.mp3'),
    gameOver: new Audio('assets/son/game_over.mp3'),
    gameOver2: new Audio('assets/son/game-over2.mp3'),
    victory: new Audio('assets/son/victory.mp3'),
    error: new Audio('assets/son/error.mp3'),
    success: new Audio('assets/son/success.mp3'),
    levelComplete: new Audio('assets/son/level_complete.mp3'),
    click: new Audio('assets/son/click.mp3')
};

// Questions du quiz
const quizQuestions = [
    {
        question: "Qu'est-ce qu'un VPN ?",
        choices: [
            "Un réseau privé virtuel",
            "Un virus informatique",
            "Un type de malware",
            "Un protocole de communication"
        ],
        correct: 0
    },
    {
        question: "Quelle est la meilleure pratique pour les mots de passe ?",
        choices: [
            "Utiliser le même mot de passe partout",
            "Utiliser des mots de passe complexes et uniques",
            "Écrire ses mots de passe sur un post-it",
            "Utiliser son nom comme mot de passe"
        ],
        correct: 1
    },
    {
        question: "Qu'est-ce que le phishing ?",
        choices: [
            "Un sport nautique",
            "Une technique de pêche aux données",
            "Un type de virus",
            "Un protocole de sécurité"
        ],
        correct: 1
    }
];

let currentQuestionIndex = 0;

// Fonction de logging
async function log(message, level = 'info') {
    try {
        await fetch('http://localhost:5000/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                level: level
            })
        });
    } catch (error) {
        console.error('Erreur lors de l\'envoi du log:', error);
    }
}

// Sauvegarder la progression
function saveProgress() {
    const gameState = {
        playerName,
        currentLevel,
        totalScore,
        batteryLevel
    };
    localStorage.setItem('gameProgress', JSON.stringify(gameState));
}

// Charger la progression
function loadProgress() {
    const savedState = localStorage.getItem('gameProgress');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        playerName = gameState.playerName;
        currentLevel = gameState.currentLevel;
        totalScore = gameState.totalScore;
        batteryLevel = gameState.batteryLevel;
        return true;
    }
    return false;
}

// Réinitialiser le niveau actuel
function restartLevel() {
    playerPosition = { x: 1, y: 1 };
    batteryLevel = 100;
    updateBatteryDisplay();
    generateMaze();
    showNotification('Niveau redémarré', 'info');
}

// Abandonner la partie
function abandonGame() {
    saveProgress();
    gameScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
    gameStarted = false;
}

// Initialiser les contrôles audio
function initAudioControls() {
    const volumeSlider = document.getElementById('volume-slider');
    let previousVolume = volumeSlider.value / 100;

    // Mettre à jour le volume de tous les sons
    function updateVolume(value) {
        const volume = value / 100;
        Object.values(audio).forEach(sound => {
            sound.volume = volume;
        });
        // Mettre à jour l'apparence du slider avec un dégradé précis
        volumeSlider.style.background = `linear-gradient(to right, 
            var(--primary-color) 0%, 
            var(--primary-color) ${value}%, 
            #333 ${value}%, 
            #333 100%)`;
    }

    // Initialiser le volume
    updateVolume(volumeSlider.value);

    // Gérer le changement de volume
    volumeSlider.addEventListener('input', (e) => {
        updateVolume(e.target.value);
        if (e.target.value > 0) {
            isSoundEnabled = true;
            soundToggle.textContent = '🔊';
            previousVolume = e.target.value / 100;
        } else {
            isSoundEnabled = false;
            soundToggle.textContent = '🔈';
        }
    });

    // Gérer le bouton mute
    soundToggle.addEventListener('click', () => {
        isSoundEnabled = !isSoundEnabled;
        if (isSoundEnabled) {
            soundToggle.textContent = '🔊';
            volumeSlider.value = previousVolume * 100;
            updateVolume(volumeSlider.value);
        } else {
            soundToggle.textContent = '🔈';
            previousVolume = volumeSlider.value / 100;
            volumeSlider.value = 0;
            updateVolume(0);
        }
    });
}

// Initialiser les contrôles de la souris
function initMouseControls() {
    mazeContainer.addEventListener('click', handleMazeClick);
}

// Jouer un son
function playSound(sound) {
    if (isSoundEnabled) {
        sound.currentTime = 0;
        sound.play();
    }
}

// Générer un nom de joueur par défaut
function generateDefaultPlayerName() {
    let playerNumber = 1;
    while (leaderboard.some(entry => entry.name === `Player_${playerNumber}`)) {
        playerNumber++;
    }
    return `Player_${playerNumber}`;
}

// Mettre à jour le leaderboard
function updateLeaderboard() {
    leaderboardContent.innerHTML = '';
    leaderboard.sort((a, b) => b.score - a.score);
    
    leaderboard.forEach((entry, index) => {
        const entryElement = document.createElement('div');
        entryElement.className = 'leaderboard-entry';
        entryElement.innerHTML = `
            <span class="leaderboard-rank">#${index + 1}</span>
            <span>${entry.name}</span>
            <span>${entry.score} points</span>
        `;
        leaderboardContent.appendChild(entryElement);
    });
    
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Afficher/masquer le leaderboard
leaderboardButton.addEventListener('click', () => {
    updateLeaderboard();
    leaderboardElement.classList.toggle('active');
});

// Modifier la fonction startGame
function startGame() {
    const hasProgress = loadProgress();
    
    if (!hasProgress) {
        playerName = playerNameInput.value.trim();
        if (!playerName) {
            playerName = generateDefaultPlayerName();
            showNotification(`Nom par défaut attribué : ${playerName}`, 'info');
        }
        currentLevel = 1;
        totalScore = 0;
        batteryLevel = 100;
    }

    log(`Démarrage du jeu pour ${playerName}`);
    welcomeScreen.classList.remove('active');
    gameScreen.classList.add('active');
    playerNameDisplay.textContent = playerName;
    scoreDisplay.textContent = totalScore;
    updateLevelDisplay();
    updateBatteryDisplay();
    generateMaze();
    gameStarted = true;
}

// Générer les murs intérieurs
function getDifficultyParams(level) {
    // Paramètres de base
    const params = {
        wallCount: 15,
        wallLength: 3,
        powerUpCount: 5,
        teleporterCount: 3,
        malwareCount: 4
    };

    // Ajuster les paramètres en fonction du niveau
    switch(level) {
        case 1: // Niveau tutoriel - légèrement plus difficile mais toujours accessible
            params.wallCount = 12;
            params.wallLength = 3;
            params.powerUpCount = 5;
            params.teleporterCount = 1;
            params.malwareCount = 2;
            break;
        case 2: // Introduction des murs plus longs
            params.wallCount = 15;
            params.wallLength = 4;
            params.powerUpCount = 4;
            params.teleporterCount = 2;
            params.malwareCount = 3;
            break;
        case 3: // Augmentation de la densité des murs
            params.wallCount = 18;
            params.wallLength = 4;
            params.powerUpCount = 4;
            params.teleporterCount = 2;
            params.malwareCount = 3;
            break;
        case 4: // Plus de malwares, moins de power-ups
            params.wallCount = 20;
            params.wallLength = 4;
            params.powerUpCount = 3;
            params.teleporterCount = 2;
            params.malwareCount = 4;
            break;
        case 5: // Labyrinthe dense avec murs longs
            params.wallCount = 22;
            params.wallLength = 5;
            params.powerUpCount = 3;
            params.teleporterCount = 3;
            params.malwareCount = 4;
            break;
        case 6: // Complexification significative
            params.wallCount = 25;
            params.wallLength = 5;
            params.powerUpCount = 3;
            params.teleporterCount = 3;
            params.malwareCount = 5;
            break;
        case 7: // Très dense avec peu de ressources
            params.wallCount = 28;
            params.wallLength = 5;
            params.powerUpCount = 2;
            params.teleporterCount = 3;
            params.malwareCount = 5;
            break;
        case 8: // Extrêmement complexe
            params.wallCount = 30;
            params.wallLength = 6;
            params.powerUpCount = 2;
            params.teleporterCount = 4;
            params.malwareCount = 6;
            break;
        case 9: // Presque labyrinthique
            params.wallCount = 32;
            params.wallLength = 6;
            params.powerUpCount = 2;
            params.teleporterCount = 4;
            params.malwareCount = 6;
            break;
        case 10: // Niveau final ultra difficile
            params.wallCount = 35;
            params.wallLength = 7;
            params.powerUpCount = 1;
            params.teleporterCount = 4;
            params.malwareCount = 7;
            break;
    }
    return params;
}

// Fonction pour vérifier s'il existe un chemin vers la sortie
function hasPathToExit() {
    const visited = Array(21).fill().map(() => Array(21).fill(false));
    const queue = [{x: 1, y: 1}];
    visited[1][1] = true;

    while (queue.length > 0) {
        const current = queue.shift();
        
        // Si on atteint la sortie
        if (current.x === 19 && current.y === 20) {
            return true;
        }

        // Vérifier les 4 directions
        const directions = [
            {x: 0, y: -1}, // haut
            {x: 0, y: 1},  // bas
            {x: -1, y: 0}, // gauche
            {x: 1, y: 0}   // droite
        ];

        for (const dir of directions) {
            const newX = current.x + dir.x;
            const newY = current.y + dir.y;

            if (newX >= 0 && newX < 21 && newY >= 0 && newY < 21 && 
                !visited[newY][newX] && maze[newY][newX] !== 'wall') {
                queue.push({x: newX, y: newY});
                visited[newY][newX] = true;
            }
        }
    }
    return false;
}

// Modifier generateInnerWalls pour utiliser les paramètres de difficulté
function generateInnerWalls() {
    const params = getDifficultyParams(currentLevel);
    let attempts = 0;
    const maxAttempts = 100;
    
    while (attempts < maxAttempts) {
        // Sauvegarder l'état actuel du labyrinthe
        const tempMaze = maze.map(row => [...row]);
        let wallsPlaced = 0;
        
        for (let i = 0; i < params.wallCount && wallsPlaced < params.wallCount; i++) {
            let startX, startY;
            let isHorizontal;
            let validPosition = false;
            let positionAttempts = 0;
            
            while (!validPosition && positionAttempts < 20) {
                startX = Math.floor(Math.random() * 19) + 1;
                startY = Math.floor(Math.random() * 19) + 1;
                isHorizontal = Math.random() > 0.5;
                
                // Éviter de placer des murs trop près du départ ou de la sortie
                if ((startX <= 2 && startY <= 2) || 
                    (startX >= 18 && startY >= 18)) {
                    positionAttempts++;
                    continue;
                }
                
                if (isValidWallPosition(startX, startY, isHorizontal, params.wallLength)) {
                    validPosition = true;
                }
                positionAttempts++;
            }
            
            if (validPosition) {
                const length = Math.floor(Math.random() * params.wallLength) + 1;
                
                // Placer temporairement le mur
                for (let j = 0; j < length; j++) {
                    const x = isHorizontal ? startX + j : startX;
                    const y = isHorizontal ? startY : startY + j;
                    
                    if (x < 20 && y < 20) {
                        maze[y][x] = 'wall';
                    }
                }
                
                // Vérifier si un chemin existe toujours
                if (hasPathToExit()) {
                    wallsPlaced++;
                } else {
                    // Restaurer l'état précédent si le mur bloque le chemin
                    maze = tempMaze.map(row => [...row]);
                }
            }
        }
        
        // Si on a réussi à placer suffisamment de murs avec un chemin valide
        if (wallsPlaced >= params.wallCount * 0.7) {
            return;
        }
        
        // Restaurer l'état initial pour une nouvelle tentative
        maze = tempMaze.map(row => [...row]);
        attempts++;
    }
    
    // Si on n'a pas réussi après plusieurs tentatives, réduire le nombre de murs
    const reducedParams = {...params};
    reducedParams.wallCount = Math.floor(params.wallCount * 0.7);
    generateInnerWalls();
}

// Vérifier si une position est valide pour un mur
function isValidWallPosition(x, y, isHorizontal, length) {
    // Vérifier les limites
    if (isHorizontal && x + length >= 20) return false;
    if (!isHorizontal && y + length >= 20) return false;

    // Vérifier que la position n'est pas déjà occupée
    for (let i = 0; i < length; i++) {
        const checkX = isHorizontal ? x + i : x;
        const checkY = isHorizontal ? y : y + i;
        
        if (maze[checkY][checkX] === 'wall') return false;
        
        // Vérifier que le mur ne bloque pas complètement un passage
        if (i === 0) {
            const prevX = isHorizontal ? x - 1 : x;
            const prevY = isHorizontal ? y : y - 1;
            if (prevX >= 0 && prevY >= 0 && maze[prevY][prevX] === 'wall') return false;
        }
        if (i === length - 1) {
            const nextX = isHorizontal ? x + length : x;
            const nextY = isHorizontal ? y : y + length;
            if (nextX < 21 && nextY < 21 && maze[nextY][nextX] === 'wall') return false;
        }
    }
    
    return true;
}

// Modifier la fonction generateMaze pour inclure les murs intérieurs
function generateMaze() {
    log('Génération du labyrinthe...');
    mazeContainer.innerHTML = '';
    maze = [];

    // Initialiser la grille avec des chemins
    for (let y = 0; y < 21; y++) {
        maze[y] = [];
        for (let x = 0; x < 21; x++) {
            maze[y][x] = 'path';
        }
    }

    // Ajouter les murs de bordure
    for (let i = 0; i < 21; i++) {
        maze[0][i] = 'wall';  // Mur supérieur
        maze[20][i] = 'wall'; // Mur inférieur
        maze[i][0] = 'wall';  // Mur gauche
        maze[i][20] = 'wall'; // Mur droit
    }

    // Créer un chemin garanti vers la sortie
    createGuaranteedPath();

    // Ajouter des murs supplémentaires
    addAdditionalWalls();

    // Créer les cellules visuelles
    for (let y = 0; y < 21; y++) {
        for (let x = 0; x < 21; x++) {
            const cell = document.createElement('div');
            cell.className = 'maze-cell';
            cell.classList.add(maze[y][x]);
            mazeContainer.appendChild(cell);
        }
    }

    // Placer le joueur et la sortie
    updatePlayerPosition(1, 1);
    const exitCell = mazeContainer.children[20 * 21 + 19];
    exitCell.classList.add('exit');
    maze[20][19] = 'exit';

    // Placer les éléments
    placePowerUps();
    placeTeleporters();
    placeMalwares();
}

function createGuaranteedPath() {
    // Créer un chemin garanti du début à la fin
    let currentX = 1;
    let currentY = 1;
    const path = [];

    while (currentY < 20 || currentX < 19) {
        path.push([currentY, currentX]);
        
        if (currentY < 20 && Math.random() < 0.6) {
            currentY++;
        } else if (currentX < 19) {
            currentX++;
        }
    }

    // Ajouter le dernier segment vers la sortie
    while (currentY < 20) {
        path.push([currentY, currentX]);
        currentY++;
    }

    // Marquer le chemin comme sûr
    path.forEach(([y, x]) => {
        maze[y][x] = 'path';
    });
}

function addAdditionalWalls() {
    const params = getDifficultyParams(currentLevel);
    const maxWalls = Math.min(params.wallCount, 100); // Limite de sécurité
    let wallsAdded = 0;

    for (let i = 0; i < maxWalls * 2 && wallsAdded < maxWalls; i++) {
        const x = Math.floor(Math.random() * 17) + 2;
        const y = Math.floor(Math.random() * 17) + 2;
        
        // Éviter de bloquer le chemin garanti
        if (maze[y][x] !== 'path' || isNearGuaranteedPath(x, y)) {
            continue;
        }

        // Ajouter un mur court (2-3 cases maximum)
        const length = Math.min(Math.floor(Math.random() * 3) + 2, params.wallLength);
        const isHorizontal = Math.random() < 0.5;

        let canPlaceWall = true;
        for (let j = 0; j < length; j++) {
            const newX = isHorizontal ? x + j : x;
            const newY = isHorizontal ? y : y + j;
            
            if (newX >= 19 || newY >= 19 || maze[newY][newX] !== 'path') {
                canPlaceWall = false;
                break;
            }
        }

        if (canPlaceWall) {
            for (let j = 0; j < length; j++) {
                const newX = isHorizontal ? x + j : x;
                const newY = isHorizontal ? y : y + j;
                maze[newY][newX] = 'wall';
            }
            wallsAdded++;
        }
    }
}

function isNearGuaranteedPath(x, y) {
    // Vérifier si une position est proche du chemin garanti
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            const newY = y + dy;
            const newX = x + dx;
            if (newY >= 0 && newY < 21 && newX >= 0 && newX < 21) {
                if (maze[newY][newX] === 'path' && 
                    ((newX === 1 && newY === 1) || (newX === 19 && newY === 20))) {
                    return true;
                }
            }
        }
    }
    return false;
}

// Placer les power-ups
function placePowerUps() {
    const params = getDifficultyParams(currentLevel);
    for (let i = 0; i < params.powerUpCount; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 19) + 1;
            y = Math.floor(Math.random() * 19) + 1;
        } while (maze[y][x] !== 'path');

        const cell = mazeContainer.children[y * 21 + x];
        cell.classList.add('power');
        maze[y][x] = 'power';
    }
}

// Placer les téléporteurs
function placeTeleporters() {
    const params = getDifficultyParams(currentLevel);
    for (let i = 0; i < params.teleporterCount; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 19) + 1;
            y = Math.floor(Math.random() * 19) + 1;
        } while (maze[y][x] !== 'path');

        const cell = mazeContainer.children[y * 21 + x];
        cell.classList.add('teleport');
        maze[y][x] = 'teleport';
    }
}

// Placer les malwares
function placeMalwares() {
    const params = getDifficultyParams(currentLevel);
    for (let i = 0; i < params.malwareCount; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 19) + 1;
            y = Math.floor(Math.random() * 19) + 1;
        } while (maze[y][x] !== 'path');

        const cell = mazeContainer.children[y * 21 + x];
        cell.classList.add('malware');
        maze[y][x] = 'malware';
    }
}

// Mettre à jour la position du joueur
function updatePlayerPosition(newX, newY) {
    // Supprimer l'ancienne position
    const oldCell = mazeContainer.children[playerPosition.y * 21 + playerPosition.x];
    oldCell.classList.remove('player', 'fade-out', 'fade-in');

    // Mettre à jour la nouvelle position
    playerPosition = { x: newX, y: newY };
    const newCell = mazeContainer.children[newY * 21 + newX];
    newCell.classList.add('player');
    newCell.classList.remove('fade-out', 'fade-in');

    // Vérifier les interactions
    checkCellInteraction(newX, newY);
}

// Vérifier les interactions avec les cellules
function checkCellInteraction(x, y) {
    const cellType = maze[y][x];
    
    switch (cellType) {
        case 'power':
            handlePowerUp(x, y);
            break;
        case 'exit':
            handleExit();
            break;
        case 'teleport':
            handleTeleport(x, y);
            break;
        case 'malware':
            handleMalware(x, y);
            break;
    }
}

// Afficher une notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Ajouter une icône selon le type
    const icon = document.createElement('span');
    icon.className = 'notification-icon';
    
    switch (type) {
        case 'success':
            icon.textContent = '✓';
            playSound(audio.success);
            break;
        case 'error':
            icon.textContent = '✕';
            playSound(audio.error);
            break;
        case 'warning':
            icon.textContent = '⚠';
            playSound(audio.malware);
            break;
        default:
            icon.textContent = 'ℹ';
    }
    
    notification.prepend(icon);
    notificationArea.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Gérer les power-ups
function handlePowerUp(x, y) {
    log(`Power-up collecté en position (${x}, ${y})`);
    batteryLevel = Math.min(100, batteryLevel + 20);
    updateBatteryDisplay();
    
    const cell = mazeContainer.children[y * 21 + x];
    cell.classList.remove('power');
    maze[y][x] = 'path';
    
    showNotification('Power-up collecté ! +20% de batterie', 'success');
    playSound(audio.powerUp);
}

// Modifier handleExit pour sauvegarder la progression
function handleExit() {
    log(`Le joueur ${playerName} a trouvé la sortie !`);
    
    totalScore += batteryLevel;
    scoreDisplay.textContent = totalScore;
    showNotification(`+${batteryLevel} points ! Score total : ${totalScore}`, 'success');
    
    if (currentLevel < maxLevel) {
        currentLevel++;
        batteryLevel = Math.min(100, batteryLevel + 99);
        updateBatteryDisplay();
        updateLevelDisplay();
        showNotification(`+99 points de batterie ! Niveau de batterie : ${batteryLevel}%`, 'success');
        saveProgress();
        generateMaze();
    } else {
        leaderboard.push({ name: playerName, score: totalScore });
        updateLeaderboard();
        showNotification(`Bravo ! Jeu terminé ! Score final : ${totalScore} points !`, 'success');
        localStorage.removeItem('gameProgress');
        setTimeout(() => {
            gameScreen.classList.remove('active');
            welcomeScreen.classList.add('active');
            gameStarted = false;
            currentLevel = 1;
            totalScore = 0;
            updateLevelDisplay();
        }, 2000);
    }
}

// Gérer les téléporteurs
function handleTeleport(x, y) {
    log(`Téléportation du joueur depuis (${x}, ${y})`);
    let newX, newY;
    do {
        newX = Math.floor(Math.random() * 19) + 1;
        newY = Math.floor(Math.random() * 19) + 1;
    } while (maze[newY][newX] !== 'path' || (newX === x && newY === y));

    showNotification('Téléportation !', 'warning');
    updatePlayerPosition(newX, newY);
    playSound(audio.teleport);
}

// Gérer les malwares
function handleMalware(x, y) {
    log(`Malware rencontré en position (${x}, ${y})`, 'error');
    batteryLevel = Math.max(0, batteryLevel - 30);
    updateBatteryDisplay();
    
    const cell = mazeContainer.children[y * 21 + x];
    cell.classList.remove('malware');
    maze[y][x] = 'path';
    
    playSound(audio.malware);
    showQuiz();
    
    if (batteryLevel === 0) {
        log(`Game Over pour ${playerName} - Batterie épuisée par malware`, 'error');
        showNotification('Batterie épuisée ! Game Over', 'error');
        setTimeout(() => {
            gameScreen.classList.remove('active');
            welcomeScreen.classList.add('active');
            gameStarted = false;
        }, 2000);
        playSound(audio.gameOver2);
    }
}

// Gérer les mouvements
function handleKeyPress(e) {
    if (!gameStarted) return;

    const currentTime = Date.now();
    if (currentTime - lastMoveTime < moveCooldown) return;

    let newX = playerPosition.x;
    let newY = playerPosition.y;

    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            newY--;
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            newY++;
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            newX--;
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            newX++;
            break;
        default:
            return;
    }

    if (isValidMove(newX, newY)) {
        lastMoveTime = currentTime;
        log(`Mouvement du joueur de (${playerPosition.x}, ${playerPosition.y}) vers (${newX}, ${newY})`);
        playSound(audio.click);
        
        // Animation de déplacement
        const oldCell = mazeContainer.children[playerPosition.y * 21 + playerPosition.x];
        oldCell.classList.add('fade-out');
        
        setTimeout(() => {
            updatePlayerPosition(newX, newY);
            const newCell = mazeContainer.children[newY * 21 + newX];
            newCell.classList.add('fade-in');
            
            // Réduire la batterie
            batteryLevel = Math.max(0, batteryLevel - 1);
            updateBatteryDisplay();
            
            if (batteryLevel === 0) {
                log(`Game Over pour ${playerName} - Batterie épuisée`, 'error');
                showNotification('Batterie épuisée ! Game Over');
                setTimeout(() => {
                    gameScreen.classList.remove('active');
                    welcomeScreen.classList.add('active');
                    gameStarted = false;
                }, 2000);
                playSound(audio.gameOver2); // Utiliser le son alternatif de game over
            }
        }, 100);
    } else {
        log(`Mouvement invalide vers (${newX}, ${newY})`);
        // Effet de collision
        const cell = mazeContainer.children[playerPosition.y * 21 + playerPosition.x];
        cell.classList.add('shake');
        setTimeout(() => cell.classList.remove('shake'), 200);
        playSound(audio.error);
    }
}

// Vérifier si un mouvement est valide
function isValidMove(x, y) {
    return x >= 0 && x < 21 && y >= 0 && y < 21 && maze[y][x] !== 'wall';
}

// Écouter les touches du clavier
document.addEventListener('keydown', handleKeyPress);

// Initialiser le jeu au chargement
window.addEventListener('load', init);

// Afficher une question du quiz
function showQuiz() {
    const quizModal = document.getElementById('quiz-modal');
    const quizQuestion = document.getElementById('quiz-question');
    const quizChoices = document.getElementById('quiz-choices');
    
    const question = quizQuestions[currentQuestionIndex];
    quizQuestion.innerHTML = `
        <div class="malware-warning">⚠️ Malware détecté ! -30% de batterie</div>
        <div class="quiz-text">${question.question}</div>
    `;
    quizChoices.innerHTML = '';
    
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice';
        button.textContent = choice;
        button.addEventListener('click', () => handleQuizAnswer(index));
        quizChoices.appendChild(button);
    });
    
    quizModal.classList.add('active');
}

// Gérer la réponse au quiz
function handleQuizAnswer(choiceIndex) {
    const quizModal = document.getElementById('quiz-modal');
    const isCorrect = choiceIndex === quizQuestions[currentQuestionIndex].correct;
    
    if (isCorrect) {
        log(`Réponse correcte à la question ${currentQuestionIndex + 1}`);
        batteryLevel = Math.min(100, batteryLevel + 15);
        updateBatteryDisplay();
        showNotification('Bonne réponse ! +15% de batterie');
        playSound(audio.success);
    } else {
        log(`Réponse incorrecte à la question ${currentQuestionIndex + 1}`, 'error');
        batteryLevel = Math.max(0, batteryLevel - 10);
        updateBatteryDisplay();
        showNotification('Mauvaise réponse ! -10% de batterie');
        playSound(audio.error);
    }
    
    currentQuestionIndex = (currentQuestionIndex + 1) % quizQuestions.length;
    quizModal.classList.remove('active');
    
    if (batteryLevel === 0) {
        log(`Game Over pour ${playerName} - Batterie épuisée par quiz`, 'error');
        showNotification('Batterie épuisée ! Game Over');
        setTimeout(() => {
            gameScreen.classList.remove('active');
            welcomeScreen.classList.add('active');
            gameStarted = false;
        }, 2000);
        playSound(audio.gameOver);
    }
}

// Gérer le clic sur le labyrinthe
function handleMazeClick(e) {
    if (!gameStarted) return;

    const cell = e.target;
    if (!cell.classList.contains('maze-cell')) return;

    const cellIndex = Array.from(mazeContainer.children).indexOf(cell);
    const clickedY = Math.floor(cellIndex / 21);
    const clickedX = cellIndex % 21;

    // Vérifier si la cellule cliquée est adjacente au joueur
    const dx = clickedX - playerPosition.x;
    const dy = clickedY - playerPosition.y;

    // Ne permettre que les mouvements d'une case à la fois
    if (Math.abs(dx) + Math.abs(dy) !== 1) return;

    // Simuler un mouvement avec les touches
    let key;
    if (dx === 1) key = 'ArrowRight';
    else if (dx === -1) key = 'ArrowLeft';
    else if (dy === 1) key = 'ArrowDown';
    else if (dy === -1) key = 'ArrowUp';

    handleKeyPress({ key });
    playSound(audio.click);
}

// Mettre à jour l'affichage du niveau
function updateLevelDisplay() {
    levelDisplay.textContent = `Niveau ${currentLevel}/${maxLevel}`;
}

// Mettre à jour l'affichage de la batterie
function updateBatteryDisplay() {
    const batteryLevelElement = document.getElementById('battery-level');
    const batteryPercentageElement = document.getElementById('battery-percentage');
    
    batteryLevelElement.style.width = `${batteryLevel}%`;
    batteryPercentageElement.textContent = `${batteryLevel}%`;
    
    // Changer la couleur selon le niveau
    if (batteryLevel <= 20) {
        batteryLevelElement.className = 'low';
    } else if (batteryLevel <= 50) {
        batteryLevelElement.className = 'medium';
    } else {
        batteryLevelElement.className = 'high';
    }
}

// Ajouter les écouteurs d'événements pour les nouveaux boutons
function initGameControls() {
    restartButton.addEventListener('click', restartLevel);
    abandonButton.addEventListener('click', abandonGame);
    gameLeaderboardButton.addEventListener('click', () => {
        updateLeaderboard();
        leaderboardElement.classList.toggle('active');
    });
}

// Modifier la fonction init pour inclure les nouveaux contrôles
function init() {
    log('Initialisation du jeu...');
    startButton.addEventListener('click', startGame);
    playerNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            startGame();
        }
    });
    initAudioControls();
    initMouseControls();
    initGameControls();
} 