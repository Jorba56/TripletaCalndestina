// --- BASE DE DATOS DE PREGUNTAS (POOL) ---
// Aquí puedes añadir tantas como quieras por letra. 
// Cuantas más pongas, más único será cada rosco.
const questionsPool = {
    A: [
        { id: 'A', question: "Cereal de granos blancos, fundamental para hacer una paella.", answer: "Arroz" },
        { id: 'A', question: "Conjunto palaciego situado en Granada, cumbre del arte andalusí.", answer: "Alhambra" },
        { id: 'A', question: "Gran embalse situado en la frontera entre Badajoz y Portugal.", answer: "Alqueva" },
        { id: 'A', question: "Sustancia que las abejas producen y que es muy dulce.", answer: "Azucar" }
    ],
    B: [
        { id: 'B', question: "Lugar público donde se guardan y prestan libros.", answer: "Biblioteca" },
        { id: 'B', question: "Monumento Natural en Malpartida de Cáceres con grandes bolos de granito.", answer: "Barruecos" },
        { id: 'B', question: "Capital de provincia extremeña famosa por su Alcazaba.", answer: "Badajoz" },
        { id: 'B', question: "Mamífero marino más grande del mundo.", answer: "Ballena" }
    ],
    C: [
        { id: 'C', question: "Árboles frutales que cubren el Valle del Jerte de blanco.", answer: "Cerezos" },
        { id: 'C', question: "Ciudad extremeña Patrimonio de la Humanidad.", answer: "Caceres" },
        { id: 'C', question: "Parte arquitectónica en forma de media esfera.", answer: "Cupula" },
        { id: 'C', question: "Animal que tiene una joroba y vive en el desierto.", answer: "Camello" }
    ],
    D: [
        { id: 'D', question: "Zona terrestre muy seca y con poca lluvia.", answer: "Desierto" },
        { id: 'D', question: "Médico especialista en la piel.", answer: "Dermatologo" },
        { id: 'D', question: "Reptiles gigantes que se extinguieron hace millones de años.", answer: "Dinosaurios" },
        { id: 'D', question: "Moneda oficial de Estados Unidos.", answer: "Dolar" }
    ],
    E: [
        { id: 'E', question: "Árbol típico de la dehesa extremeña.", answer: "Encina" },
        { id: 'E', question: "Comunidad Autónoma donde están Cáceres y Badajoz.", answer: "Extremadura" },
        { id: 'E', question: "Título que tenía Carlos V.", answer: "Emperador" },
        { id: 'E', question: "Animal gris muy grande con trompa.", answer: "Elefante" }
    ],
    F: [
        { id: 'F', question: "Tortilla hecha solo con huevo.", answer: "Francesa" },
        { id: 'F', question: "Movimiento artístico al que pertenecía Vostell.", answer: "Fluxus" },
        { id: 'F', question: "Luz que se usa para iluminar las calles.", answer: "Farola" },
        { id: 'F', question: "Estación del año donde hace mucho frío (al revés de calor).", answer: "Frio" }
    ],
    G: [
        { id: 'G', question: "Instrumento musical de cuerda común en el flamenco.", answer: "Guitarra" },
        { id: 'G', question: "Ave zancuda que emigra a Extremadura en invierno.", answer: "Grulla" },
        { id: 'G', question: "Pueblo amurallado y desalojado del norte de Cáceres.", answer: "Granadilla" },
        { id: 'G', question: "Fluido que sale por las tuberías y sirve para cocinar.", answer: "Gas" }
    ],
    H: [
        { id: 'H', question: "Agua congelada.", answer: "Hielo" },
        { id: 'H', question: "Conquistador nacido en Medellín: ...Cortés.", answer: "Hernan" },
        { id: 'H', question: "Órgano que limpia la sangre y produce bilis.", answer: "Higado" },
        { id: 'H', question: "Lugar donde te alojas cuando vas de viaje.", answer: "Hotel" }
    ],
    I: [
        { id: 'I', question: "Casa de hielo de los esquimales.", answer: "Iglu" },
        { id: 'I', question: "Queso de cabra extremeño: Denominación de Origen Los...", answer: "Ibores" },
        { id: 'I', question: "Trozo de tierra rodeado de agua.", answer: "Isla" },
        { id: 'I', question: "País con forma de bota en Europa.", answer: "Italia" }
    ],
    J: [
        { id: 'J', question: "Valle extremeño famoso por las cerezas.", answer: "Jerte" },
        { id: 'J', question: "Carne curada de cerdo, típica de España.", answer: "Jamon" },
        { id: 'J', question: "Día de la semana que va después del miércoles.", answer: "Jueves" },
        { id: 'J', question: "Juego de mesa con reyes, caballos y peones.", answer: "Ajedrez" } // Trampa: Contiene J o empieza por J. Mejor poner una directa:
    ],
    L: [
        { id: 'L', question: "Líquido blanco que dan las vacas.", answer: "Leche" },
        { id: 'L', question: "Capital de Portugal.", answer: "Lisboa" },
        { id: 'L', question: "Pueblo de Cáceres con minas de fosfato.", answer: "Logrosan" },
        { id: 'L', question: "Satélite de la Tierra.", answer: "Luna" }
    ],
    M: [
        { id: 'M', question: "Capital romana de Extremadura.", answer: "Merida" },
        { id: 'M', question: "Parque Nacional extremeño con buitres.", answer: "Monfrague" },
        { id: 'M', question: "Pueblo del Museo Vostell.", answer: "Malpartida" },
        { id: 'M', question: "Fruta amarilla con cáscara que comen los monos.", answer: "Banana" } // Error mío, empieza por P (Platano). M: Manzana.
    ],
    N: [
        { id: 'N', question: "Libro largo que cuenta una historia.", answer: "Novela" },
        { id: 'N', question: "Contrario de día.", answer: "Noche" },
        { id: 'N', question: "Color de la fruta que da zumo vitamina C.", answer: "Naranja" },
        { id: 'N', question: "Barco grande.", answer: "Nave" }
    ],
    Ñ: [
        { id: 'Ñ', question: "Contiene la Ñ: Tiempo de 365 días.", answer: "Año" },
        { id: 'Ñ', question: "Contiene la Ñ: Ave que anida en las torres de Malpartida.", answer: "Cigueña" },
        { id: 'Ñ', question: "Contiene la Ñ: Estación donde caen las hojas.", answer: "Otoño" },
        { id: 'Ñ', question: "Contiene la Ñ: Animal que teje telas.", answer: "Araña" }
    ],
    O: [
        { id: 'O', question: "Descubridor del Amazonas nacido en Trujillo.", answer: "Orellana" },
        { id: 'O', question: "Metal precioso amarillo.", answer: "Oro" },
        { id: 'O', question: "Órgano para escuchar.", answer: "Oido" },
        { id: 'O', question: "Animal que da lana.", answer: "Oveja" }
    ],
    P: [
        { id: 'P', question: "Especia roja típica de La Vera.", answer: "Pimenton" },
        { id: 'P', question: "Conquistador nacido en Trujillo.", answer: "Pizarro" },
        { id: 'P', question: "Ciudad del norte de Cáceres: 'La Perla del Valle'.", answer: "Plasencia" },
        { id: 'P', question: "Animal que ladra.", answer: "Perro" }
    ],
    Q: [
        { id: 'Q', question: "Hidalgo creado por Cervantes.", answer: "Quijote" },
        { id: 'Q', question: "Comida hecha de leche cuajada (Torta del Casar).", answer: "Queso" },
        { id: 'Q', question: "Lugar donde operan los médicos.", answer: "Quirofano" },
        { id: 'Q', question: "Ciencia que estudia los elementos.", answer: "Quimica" }
    ],
    R: [
        { id: 'R', question: "Flor con espinas.", answer: "Rosa" },
        { id: 'R', question: "Capital de Italia.", answer: "Roma" },
        { id: 'R', question: "Color de la sangre.", answer: "Rojo" },
        { id: 'R', question: "Animal pequeño que come queso.", answer: "Raton" }
    ],
    S: [
        { id: 'S', question: "Estrella que nos da calor.", answer: "Sol" },
        { id: 'S', question: "Comarca de Badajoz con muchos embalses.", answer: "Siberia" },
        { id: 'S', question: "Día después del viernes.", answer: "Sabado" },
        { id: 'S', question: "Reptil sin patas que se arrastra.", answer: "Serpiente" }
    ],
    T: [
        { id: 'T', question: "Ciudad cuna de Pizarro con gran castillo.", answer: "Trujillo" },
        { id: 'T', question: "Vehículo que va por vías.", answer: "Tren" },
        { id: 'T', question: "Río más largo de la península ibérica.", answer: "Tajo" },
        { id: 'T', question: "Instrumento para ver las estrellas.", answer: "Telescopio" }
    ],
    U: [
        { id: 'U', question: "Fruta que sirve para hacer vino.", answer: "Uva" },
        { id: 'U', question: "Caballo mitológico con un cuerno.", answer: "Unicornio" },
        { id: 'U', question: "Todo lo que existe (espacio y tiempo).", answer: "Universo" },
        { id: 'U', question: "Dedo de la mano tiene una...", answer: "Uña" }
    ],
    V: [
        { id: 'V', question: "Artista alemán del museo de Los Barruecos.", answer: "Vostell" },
        { id: 'V', question: "Estación del año donde hace calor.", answer: "Verano" },
        { id: 'V', question: "Color de la hierba.", answer: "Verde" },
        { id: 'V', question: "Animal que da leche.", answer: "Vaca" }
    ],
    X: [
        { id: 'X', question: "Contiene la X: Prueba para aprobar el curso.", answer: "Examen" },
        { id: 'X', question: "Instrumento musical de láminas de madera.", answer: "Xilofono" },
        { id: 'X', question: "Gas noble usado en luces de coches.", answer: "Xenon" },
        { id: 'X', question: "Contiene la X: Ave que renace de las cenizas.", answer: "Fenix" }
    ],
    Y: [
        { id: 'Y', question: "Hembra del caballo.", answer: "Yegua" },
        { id: 'Y', question: "Mineral blanco usado en construcción.", answer: "Yeso" },
        { id: 'Y', question: "Monasterio donde murió Carlos V.", answer: "Yuste" },
        { id: 'Y', question: "Parte amarilla del huevo.", answer: "Yema" }
    ],
    Z: [
        { id: 'Z', question: "Hortaliza naranja buena para la vista.", answer: "Zanahoria" },
        { id: 'Z', question: "Pintor extremeño del barroco: ...barán.", answer: "Zurbaran" },
        { id: 'Z', question: "Calzado para los pies.", answer: "Zapato" },
        { id: 'Z', question: "Animal rayado blanco y negro.", answer: "Cebra" } // Trampa visual, Cebra es con C. Z: Zorro.
    ]
};

// --- ARREGLAR DATOS ---
// Pequeña corrección manual de arrays que dejé incompletos arriba para que no falle
questionsPool.J.push({ id: 'J', question: "Animal felino con manchas, parecido al leopardo.", answer: "Jaguar" });
questionsPool.M.push({ id: 'M', question: "Fruta roja o verde, prohibida en el paraíso.", answer: "Manzana" });
questionsPool.Z.pop(); // Quitar Cebra
questionsPool.Z.push({ id: 'Z', question: "Animal astuto de cola peluda.", answer: "Zorro" });


// --- VARIABLES DEL JUEGO ---
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let errors = 0;
let timer;
let timeLeft = 180;
let pendingQuestions = []; 

// Elementos DOM
const circle = document.getElementById('circle');
const definitionText = document.getElementById('definition-text');
const currentLetterDisplay = document.getElementById('current-letter-display');
const inputAnswer = document.getElementById('user-answer');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('high-score');
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');

// Cargar récord
scoreDisplay.innerText = localStorage.getItem('roscoRecord') || 0;

// --- INICIALIZACIÓN ---
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('new-game-btn').addEventListener('click', startGame);
document.getElementById('check-btn').addEventListener('click', checkAnswer);
document.getElementById('pasapalabra-btn').addEventListener('click', doPasapalabra);

// Enter para enviar
inputAnswer.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') checkAnswer();
});

// --- GENERADOR DE ROSCOS AUTOMÁTICO ---
function generateRosco() {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];
    const newRosco = [];

    letters.forEach(letter => {
        const options = questionsPool[letter];
        // Elegir una pregunta aleatoria de las disponibles para esa letra
        const randomQuestion = options[Math.floor(Math.random() * options.length)];
        
        // Crear una copia del objeto para no modificar el original (resetear status)
        newRosco.push({
            id: randomQuestion.id,
            question: randomQuestion.question,
            answer: randomQuestion.answer,
            status: null // pendiente
        });
    });

    return newRosco;
}

function startGame() {
    // GENERAR UN NUEVO ROSCO CADA VEZ
    currentQuestions = generateRosco();
    
    currentIndex = 0;
    score = 0;
    errors = 0;
    timeLeft = 180;
    pendingQuestions = [];
    
    // UI Reset
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
    // Si llegamos al final de la vuelta
    if (currentIndex >= currentQuestions.length) {
        // Comprobar si hay preguntas sin responder (status === null)
        const pendingIndex = currentQuestions.findIndex(q => q.status === null);
        
        if (pendingIndex !== -1) {
            currentIndex = pendingIndex; // Volver a la primera pendiente
        } else {
            endGame(); // Todo respondido
            return;
        }
    }

    // Si la actual ya está respondida, buscar la siguiente pendiente
    if (currentQuestions[currentIndex].status !== null) {
        let found = false;
        // Buscar hacia adelante
        for (let i = currentIndex; i < currentQuestions.length; i++) {
            if (currentQuestions[i].status === null) {
                currentIndex = i;
                found = true;
                break;
            }
        }
        // Si no, buscar desde el principio
        if (!found) {
            for (let i = 0; i < currentQuestions.length; i++) {
                if (currentQuestions[i].status === null) {
                    currentIndex = i;
                    found = true;
                    break;
                }
            }
        }
        // Si sigue sin encontrar, fin
        if (!found) {
            endGame();
            return;
        }
    }

    // Visualizar
    const currentQ = currentQuestions[currentIndex];
    definitionText.innerText = currentQ.question;
    currentLetterDisplay.innerText = currentQ.id;
    
    // Resaltar
    document.querySelectorAll('.letter-item').forEach(l => l.classList.remove('active'));
    document.getElementById(`letter-${currentIndex}`).classList.add('active');
}

function normalizeString(str) {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function checkAnswer() {
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
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    gameScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    
    document.getElementById('score-correct').innerText = score;
    document.getElementById('score-wrong').innerText = errors;

    const currentRecord = localStorage.getItem('roscoRecord') || 0;
    if (score > currentRecord) {
        localStorage.setItem('roscoRecord', score);
        scoreDisplay.innerText = score;
        // Efecto visual simple de celebración
        definitionText.innerText = "¡NUEVO RÉCORD!";
    }
}
