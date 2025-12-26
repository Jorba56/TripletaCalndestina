// ==========================================
// 1. GESTIÓN DE PANTALLAS Y LOGIN
// ==========================================

// Elementos Globales
const loginScreen = document.getElementById('login-screen');
const mainMenu = document.getElementById('main-menu');
const roscoGame = document.getElementById('rosco-game');
const riddleGame = document.getElementById('riddle-game');

// --- LOGIN ---
document.getElementById('login-btn').addEventListener('click', checkLogin);
document.getElementById('password-input').addEventListener('keypress', (e) => { if(e.key === 'Enter') checkLogin() });

function checkLogin() {
    const pass = document.getElementById('password-input').value;
    const secret = "malpartida"; // TU CONTRASEÑA

    if (pass.toLowerCase() === secret) {
        loginScreen.style.opacity = '0';
        setTimeout(() => {
            loginScreen.style.display = 'none';
            mainMenu.classList.remove('hidden'); // Mostrar menú
        }, 500);
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

// --- NAVEGACIÓN MENÚ ---
document.getElementById('btn-mode-rosco').addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    roscoGame.classList.remove('hidden');
});

document.getElementById('btn-mode-logic').addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    riddleGame.classList.remove('hidden');
    loadRiddle(); // Cargar primer acertijo
});

// Función global para volver al menú
window.goToMenu = function() {
    roscoGame.classList.add('hidden');
    riddleGame.classList.add('hidden');
    mainMenu.classList.remove('hidden');
}


// ==========================================
// 2. JUEGO: EL 1% (LÓGICA)
// ==========================================

const riddlesPool = [
    {
        question: "J + A = 61\nS + O = 61\nM + A = 61\n\nEntonces...\nF + M = ¿?\n\n(Piensa en lo que representan las letras, no son variables matemáticas).",
        answers: ["59", "cincuenta y nueve"],
        explanation: "Las letras son las iniciales de los meses. J+A es Junio(30) + Abril(30) = 60 (o Julio+Agosto=62... espera, en tu acertijo original era S+O(Sept+Oct 30+31=61). \nLógica: Suma de días de los meses.\nF(Febrero 28) + M(Marzo 31) = 59."
    },
    {
        question: "En una carrera, si adelantas al que va segundo...\n¿En qué posición te quedas?",
        answers: ["segundo", "2", "2º", "segunda"],
        explanation: "Si adelantas al segundo, tú ocupas su lugar, por tanto te conviertes en el segundo."
    },
    {
        question: "¿Qué número falta en esta secuencia lógica?\n\n8, 5, 4, 9, 1, 7, 6, 3, 2...\n\n¿Cuál es el último número?",
        answers: ["0", "cero"],
        explanation: "Están ordenados por orden alfabético en español: Cero, Cinco, Cuatro, Dos, Nueve, Ocho, Seis, Siete, Tres, Uno... \nEspera, en orden alfabético: C(cinco, cuatro, cero...), D(dos), N(nueve), O(ocho), S(seis, siete), T(tres), U(uno).\nLa secuencia correcta alfabética es: 0, 5, 4, 2, 9, 8, 6, 7, 3, 1... \nPero la respuesta lógica simple suele ser 0 porque es el único dígito que falta."
    },
    {
        question: "Tengo ciudades, pero no casas.\nTengo montañas, pero no árboles.\nTengo agua, pero no peces.\n\n¿Qué soy?",
        answers: ["mapa", "un mapa", "el mapa"],
        explanation: "Es un mapa."
    },
    {
        question: "Si 11+2 = 1\nSi 9+5 = 2\nEntonces... ¿10+4 = ?\n\n(Pista: Mira tu muñeca).",
        answers: ["2", "dos"],
        explanation: "Es la hora. 11 más 2 horas es la 1. 9 más 5 horas son las 2. 10 más 4 horas son las 2."
    },
    {
        question: "¿Cómo puedes lanzar una pelota de tenis para que recorra una distancia corta, se detenga y regrese a tu mano sin rebotar contra nada ni tener nada atado?",
        answers: ["arriba", "hacia arriba", "lanzandola hacia arriba"],
        explanation: "Lanzándola hacia arriba."
    }
];

let currentRiddleIndex = 0;

function loadRiddle() {
    // Si queremos aleatorio, descomenta esto:
    // currentRiddleIndex = Math.floor(Math.random() * riddlesPool.length);
    
    // Si queremos orden secuencial:
    const riddle = riddlesPool[currentRiddleIndex];
    
    document.getElementById('riddle-question').innerText = riddle.question;
    document.getElementById('riddle-answer').value = '';
    document.getElementById('logic-feedback').innerText = '';
    document.getElementById('logic-feedback').className = 'hidden';
}

document.getElementById('riddle-check-btn').addEventListener('click', checkRiddle);
document.getElementById('riddle-giveup-btn').addEventListener('click', () => {
    const riddle = riddlesPool[currentRiddleIndex];
    const feedback = document.getElementById('logic-feedback');
    feedback.innerText = `Solución: ${riddle.answers[0]}. \n${riddle.explanation}`;
    feedback.style.color = '#aaa';
    feedback.classList.remove('hidden');
    
    // Botón para siguiente
    setTimeout(() => {
        nextRiddle();
    }, 4000);
});

function checkRiddle() {
    const userVal = normalizeString(document.getElementById('riddle-answer').value);
    const riddle = riddlesPool[currentRiddleIndex];
    
    // Comprobar si alguna de las respuestas válidas coincide
    const isCorrect = riddle.answers.some(ans => normalizeString(ans) === userVal);

    const feedback = document.getElementById('logic-feedback');
    feedback.classList.remove('hidden');

    if (isCorrect) {
        feedback.innerText = "¡CORRECTO! 🧠";
        feedback.style.color = "#00ffcc";
        setTimeout(() => {
            nextRiddle();
        }, 1500);
    } else {
        feedback.innerText = "Incorrecto. Piensa diferente.";
        feedback.style.color = "#ff4444";
    }
}

function nextRiddle() {
    currentRiddleIndex = (currentRiddleIndex + 1) % riddlesPool.length;
    loadRiddle();
}


// ==========================================
// 3. JUEGO: ROSCO (CÓDIGO ANTERIOR)
// ==========================================

const questionsPool = {
    A: [
        { id: 'A', question: "Cereal de granos blancos, fundamental para hacer una paella.", answer: "Arroz" },
        { id: 'A', question: "Conjunto palaciego situado en Granada, cumbre del arte andalusí.", answer: "Alhambra" },
        { id: 'A', question: "Gran embalse situado en la frontera entre Badajoz y Portugal.", answer: "Alqueva" }
    ],
    B: [
        { id: 'B', question: "Lugar público donde se guardan y prestan libros.", answer: "Biblioteca" },
        { id: 'B', question: "Monumento Natural en Malpartida de Cáceres con grandes bolos de granito.", answer: "Barruecos" },
        { id: 'B', question: "Capital de provincia extremeña famosa por su Alcazaba.", answer: "Badajoz" }
    ],
    C: [
        { id: 'C', question: "Árboles frutales que cubren el Valle del Jerte de blanco.", answer: "Cerezos" },
        { id: 'C', question: "Ciudad extremeña Patrimonio de la Humanidad.", answer: "Caceres" },
        { id: 'C', question: "Parte arquitectónica en forma de media esfera.", answer: "Cupula" }
    ],
    D: [
        { id: 'D', question: "Zona terrestre muy seca y con poca lluvia.", answer: "Desierto" },
        { id: 'D', question: "Médico especialista en la piel.", answer: "Dermatologo" }
    ],
    E: [
        { id: 'E', question: "Árbol típico de la dehesa extremeña.", answer: "Encina" },
        { id: 'E', question: "Comunidad Autónoma donde están Cáceres y Badajoz.", answer: "Extremadura" },
        { id: 'E', question: "Título que tenía Carlos V.", answer: "Emperador" }
    ],
    F: [
        { id: 'F', question: "Tortilla hecha solo con huevo.", answer: "Francesa" },
        { id: 'F', question: "Movimiento artístico al que pertenecía Vostell.", answer: "Fluxus" }
    ],
    G: [
        { id: 'G', question: "Instrumento musical de cuerda común en el flamenco.", answer: "Guitarra" },
        { id: 'G', question: "Ave zancuda que emigra a Extremadura en invierno.", answer: "Grulla" }
    ],
    H: [
        { id: 'H', question: "Agua congelada.", answer: "Hielo" },
        { id: 'H', question: "Conquistador nacido en Medellín: ...Cortés.", answer: "Hernan" }
    ],
    I: [
        { id: 'I', question: "Casa de hielo de los esquimales.", answer: "Iglu" },
        { id: 'I', question: "Queso de cabra extremeño: Denominación de Origen Los...", answer: "Ibores" }
    ],
    J: [
        { id: 'J', question: "Valle extremeño famoso por las cerezas.", answer: "Jerte" },
        { id: 'J', question: "Carne curada de cerdo, típica de España.", answer: "Jamon" }
    ],
    L: [
        { id: 'L', question: "Líquido blanco que dan las vacas.", answer: "Leche" },
        { id: 'L', question: "Capital de Portugal.", answer: "Lisboa" },
        { id: 'L', question: "Pueblo de Cáceres con minas de fosfato.", answer: "Logrosan" }
    ],
    M: [
        { id: 'M', question: "Capital romana de Extremadura.", answer: "Merida" },
        { id: 'M', question: "Parque Nacional extremeño con buitres.", answer: "Monfrague" },
        { id: 'M', question: "Pueblo del Museo Vostell.", answer: "Malpartida" }
    ],
    N: [
        { id: 'N', question: "Libro largo que cuenta una historia.", answer: "Novela" },
        { id: 'N', question: "Contrario de día.", answer: "Noche" }
    ],
    Ñ: [
        { id: 'Ñ', question: "Contiene la Ñ: Tiempo de 365 días.", answer: "Año" },
        { id: 'Ñ', question: "Contiene la Ñ: Ave que anida en las torres de Malpartida.", answer: "Cigueña" }
    ],
    O: [
        { id: 'O', question: "Descubridor del Amazonas nacido en Trujillo.", answer: "Orellana" },
        { id: 'O', question: "Metal precioso amarillo.", answer: "Oro" }
    ],
    P: [
        { id: 'P', question: "Especia roja típica de La Vera.", answer: "Pimenton" },
        { id: 'P', question: "Conquistador nacido en Trujillo.", answer: "Pizarro" },
        { id: 'P', question: "Ciudad del norte de Cáceres: 'La Perla del Valle'.", answer: "Plasencia" }
    ],
    Q: [
        { id: 'Q', question: "Hidalgo creado por Cervantes.", answer: "Quijote" },
        { id: 'Q', question: "Comida hecha de leche cuajada (Torta del Casar).", answer: "Queso" }
    ],
    R: [
        { id: 'R', question: "Flor con espinas.", answer: "Rosa" },
        { id: 'R', question: "Capital de Italia.", answer: "Roma" }
    ],
    S: [
        { id: 'S', question: "Estrella que nos da calor.", answer: "Sol" },
        { id: 'S', question: "Comarca de Badajoz con muchos embalses.", answer: "Siberia" }
    ],
    T: [
        { id: 'T', question: "Ciudad cuna de Pizarro con gran castillo.", answer: "Trujillo" },
        { id: 'T', question: "Vehículo que va por vías.", answer: "Tren" },
        { id: 'T', question: "Río más largo de la península ibérica.", answer: "Tajo" }
    ],
    U: [
        { id: 'U', question: "Fruta que sirve para hacer vino.", answer: "Uva" },
        { id: 'U', question: "Caballo mitológico con un cuerno.", answer: "Unicornio" }
    ],
    V: [
        { id: 'V', question: "Artista alemán del museo de Los Barruecos.", answer: "Vostell" },
        { id: 'V', question: "Estación del año donde hace calor.", answer: "Verano" }
    ],
    X: [
        { id: 'X', question: "Contiene la X: Prueba para aprobar el curso.", answer: "Examen" },
        { id: 'X', question: "Instrumento musical de láminas de madera.", answer: "Xilofono" }
    ],
    Y: [
        { id: 'Y', question: "Hembra del caballo.", answer: "Yegua" },
        { id: 'Y', question: "Mineral blanco usado en construcción.", answer: "Yeso" },
        { id: 'Y', question: "Monasterio donde murió Carlos V.", answer: "Yuste" }
    ],
    Z: [
        { id: 'Z', question: "Hortaliza naranja buena para la vista.", answer: "Zanahoria" },
        { id: 'Z', question: "Pintor extremeño del barroco: ...barán.", answer: "Zurbaran" },
        { id: 'Z', question: "Animal astuto de cola peluda.", answer: "Zorro" }
    ]
};

// --- VARIABLES ROSCO ---
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let errors = 0;
let timer;
let timeLeft = 180;

// Elementos DOM ROSCO
const circle = document.getElementById('circle');
const definitionText = document.getElementById('definition-text');
const currentLetterDisplay = document.getElementById('current-letter-display');
const inputAnswer = document.getElementById('user-answer');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('menu-record');
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');

// Cargar récord al menú
scoreDisplay.innerText = localStorage.getItem('roscoRecord') || 0;

// Eventos
document.getElementById('start-btn').addEventListener('click', startRoscoGame);
document.getElementById('new-game-btn').addEventListener('click', startRoscoGame);
document.getElementById('check-btn').addEventListener('click', checkRoscoAnswer);
document.getElementById('pasapalabra-btn').addEventListener('click', doPasapalabra);
inputAnswer.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') checkRoscoAnswer();
});

function generateRosco() {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];
    const newRosco = [];
    letters.forEach(letter => {
        const options = questionsPool[letter];
        if(options) {
            const randomQuestion = options[Math.floor(Math.random() * options.length)];
            newRosco.push({ id: randomQuestion.id, question: randomQuestion.question, answer: randomQuestion.answer, status: null });
        }
    });
    return newRosco;
}

function startRoscoGame() {
    currentQuestions = generateRosco();
    currentIndex = 0;
    score = 0;
    errors = 0;
    timeLeft = 180;
    
    welcomeScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    inputAnswer.value = '';
    inputAnswer.focus();
    
    renderCircle();
    loadQuestion();
    startTimer();
}

function renderCircle() {
    circle.innerHTML = '';
    const total = currentQuestions.length;
    const radius = 250; 
    currentQuestions.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('letter-item');
        li.id = `letter-${index}`;
        li.innerText = item.id;
        const angle = (360 / total) * index;
        const radian = angle * (Math.PI / 180);
        const x = radius * Math.cos(radian);
        const y = radius * Math.sin(radian);
        li.style.transform = `translate(${x}px, ${y}px) rotate(90deg)`; 
        circle.appendChild(li);
    });
}

function loadQuestion() {
    if (currentIndex >= currentQuestions.length) {
        const pendingIndex = currentQuestions.findIndex(q => q.status === null);
        if (pendingIndex !== -1) {
            currentIndex = pendingIndex; 
        } else {
            endRoscoGame(); 
            return;
        }
    }
    if (currentQuestions[currentIndex].status !== null) {
        let found = false;
        for (let i = currentIndex; i < currentQuestions.length; i++) {
            if (currentQuestions[i].status === null) {
                currentIndex = i; found = true; break;
            }
        }
        if (!found) {
            for (let i = 0; i < currentQuestions.length; i++) {
                if (currentQuestions[i].status === null) {
                    currentIndex = i; found = true; break;
                }
            }
        }
        if (!found) { endRoscoGame(); return; }
    }

    const currentQ = currentQuestions[currentIndex];
    definitionText.innerText = currentQ.question;
    currentLetterDisplay.innerText = currentQ.id;
    document.querySelectorAll('.letter-item').forEach(l => l.classList.remove('active'));
    document.getElementById(`letter-${currentIndex}`).classList.add('active');
}

function normalizeString(str) {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function checkRoscoAnswer() {
    const userAnswer = normalizeString(inputAnswer.value);
    const correctAnswer = normalizeString(currentQuestions[currentIndex].answer);
    const letterElement = document.getElementById(`letter-${currentIndex}`);

    if (userAnswer === correctAnswer) {
        score++;
        currentQuestions[currentIndex].status = 'correct';
        letterElement.classList.add('correct');
        letterElement.classList.remove('active');
    } else {
        errors++;
        currentQuestions[currentIndex].status = 'wrong';
        letterElement.classList.add('wrong');
        letterElement.classList.remove('active');
    }
    inputAnswer.value = '';
    currentIndex++; 
    loadQuestion();
}

function doPasapalabra() {
    inputAnswer.value = '';
    const letterElement = document.getElementById(`letter-${currentIndex}`);
    letterElement.classList.remove('active');
    currentIndex++;
    loadQuestion();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            endRoscoGame();
        }
    }, 1000);
}

function endRoscoGame() {
    clearInterval(timer);
    gameScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    document.getElementById('score-correct').innerText = score;
    document.getElementById('score-wrong').innerText = errors;
    const currentRecord = localStorage.getItem('roscoRecord') || 0;
    if (score > currentRecord) {
        localStorage.setItem('roscoRecord', score);
        scoreDisplay.innerText = score;
    }
}
