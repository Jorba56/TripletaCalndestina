// ==========================================
// 1. GESTIÓN DE PANTALLAS Y LOGIN
// ==========================================

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
            mainMenu.classList.remove('hidden'); 
        }, 500);
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

// --- NAVEGACIÓN ---
document.getElementById('btn-mode-rosco').addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    roscoGame.classList.remove('hidden');
});

document.getElementById('btn-mode-logic').addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    riddleGame.classList.remove('hidden');
    loadRiddle(); 
});

window.goToMenu = function() {
    roscoGame.classList.add('hidden');
    riddleGame.classList.add('hidden');
    mainMenu.classList.remove('hidden');
}


// ==========================================
// 2. JUEGO: EL 1% (LÓGICA - 30 ACERTIJOS)
// ==========================================
// (Misma base de datos de acertijos que antes, para no perderlos)

const riddlesPool = [
    { question: "J + A = 61\nS + O = 61\nM + A = 61\n\nEntonces...\nF + M = ¿?\n(Piensa en calendarios)", answers: ["59", "cincuenta y nueve"], explanation: "Iniciales de los meses + días.\nF (Febrero 28) + M (Marzo 31) = 59." },
    { question: "Secuencia lógica:\nU, D, T, C, C, S, S, O, ...\n¿Qué sigue?", answers: ["n", "nueve"], explanation: "Iniciales de los números: Uno, Dos, Tres... Sigue N (Nueve)." },
    { question: "11 + 2 = 1\n9 + 5 = 2\n\n¿10 + 4 = ?", answers: ["2", "dos"], explanation: "Horas del reloj. 10 + 4 horas = Las 2." },
    { question: "Divide 30 por 0.5 y suma 10.", answers: ["70", "setenta"], explanation: "30 / 0.5 = 60. + 10 = 70." },
    { question: "¿Cuántos nueves hay del 1 al 100?", answers: ["20", "veinte"], explanation: "9, 19, 29... 90, 91... 99 (son dos). Total 20." },
    { question: "Adelantas al segundo en una carrera.\n¿En qué puesto vas?", answers: ["segundo", "2", "2º"], explanation: "Ocupas su lugar, eres el segundo." },
    { question: "Padre de Ana tiene 5 hijas: Nana, Nene, Nini, Nono...\n¿La quinta?", answers: ["ana"], explanation: "El padre de ANA." },
    { question: "Tiene ciudades sin casas, ríos sin agua y montes sin árboles.", answers: ["mapa", "un mapa"], explanation: "Un mapa." },
    { question: "¿Cuántos meses tienen 28 días?", answers: ["12", "todos", "doce"], explanation: "Todos tienen al menos 28." },
    { question: "Habitación oscura. Tienes vela, lámpara de gas y leña.\n¿Qué enciendes primero?", answers: ["cerilla", "la cerilla", "fuego"], explanation: "La cerilla." },
    { question: "Hay que romperlo para usarlo.", answers: ["huevo", "un huevo"], explanation: "El huevo." },
    { question: "Alto de joven, bajo de viejo. Brillo y lloro.", answers: ["vela", "una vela"], explanation: "Una vela." },
    { question: "Se moja mientras seca.", answers: ["toalla", "una toalla"], explanation: "La toalla." },
    { question: "Tiene llaves pero no abre puertas.", answers: ["teclado", "piano", "un teclado"], explanation: "Un teclado o un piano." },
    { question: "Si lo compartes, deja de serlo.", answers: ["secreto", "un secreto"], explanation: "Un secreto." },
    { question: "Si dices mi nombre, me rompo.", answers: ["silencio", "el silencio"], explanation: "El silencio." },
    { question: "Conductor de bus. Bajan 3, suben 2... ¿Nombre del conductor?", answers: ["tu", "yo", "mi nombre"], explanation: "TÚ eres el conductor." },
    { question: "Oso camina 1km Sur, 1km Este, 1km Norte. Vuelve al inicio.\n¿Color?", answers: ["blanco"], explanation: "Polo Norte. Oso polar." },
    { question: "Más grande cuanto más le quitas.", answers: ["agujero", "hoyo"], explanation: "Un agujero." },
    { question: "Tienes 5 manzanas, quitas 2.\n¿Cuántas tienes?", answers: ["2", "dos"], explanation: "Tienes las 2 que has quitado." },
    { question: "Palabra mal escrita en todos los diccionarios.", answers: ["mal", "incorrectamente"], explanation: "La palabra 'incorrectamente'." },
    { question: "Tren eléctrico al norte, viento al oeste.\n¿Hacia dónde va el humo?", answers: ["ninguno", "no tiene"], explanation: "Eléctrico = no humo." },
    { question: "Hombre sin paraguas bajo lluvia no se moja el pelo.", answers: ["calvo"], explanation: "Es calvo." },
    { question: "Tiene cuello pero no cabeza.", answers: ["botella", "camisa"], explanation: "Botella o camisa." },
    { question: "Adelantas al último en una carrera.\n¿Puesto?", answers: ["imposible"], explanation: "No puedes adelantar al último (si vas detrás, tú eres el último)." },
    { question: "Baja pero nunca sube.", answers: ["lluvia", "la lluvia"], explanation: "La lluvia." },
    { question: "De 10 ovejas, se mueren todas menos 9.\n¿Cuántas quedan?", answers: ["9", "nueve"], explanation: "Las 9 vivas." },
    { question: "Solo un ojo pero no ve.", answers: ["aguja", "una aguja"], explanation: "La aguja." },
    { question: "Sostienes en mano derecha, nunca en la izquierda.", answers: ["codo izquierdo", "mano izquierda"], explanation: "Tu mano/codo izquierdo." },
    { question: "¿Qué mes tiene 28 días?", answers: ["todos", "12"], explanation: "Todos los meses." }
];

let currentRiddleIndex = 0;
shuffleArray(riddlesPool);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Modal Elements
const modal = document.getElementById('feedback-modal');
const modalTitle = document.getElementById('modal-title');
const modalSolution = document.getElementById('modal-solution');
const modalExplanation = document.getElementById('modal-explanation');
const nextRiddleBtn = document.getElementById('next-riddle-btn');

function loadRiddle() {
    const riddle = riddlesPool[currentRiddleIndex];
    document.getElementById('riddle-question').innerText = riddle.question;
    document.getElementById('riddle-answer').value = '';
}

document.getElementById('riddle-check-btn').addEventListener('click', () => { checkRiddle(false); });
document.getElementById('riddle-giveup-btn').addEventListener('click', () => { checkRiddle(true); });
document.getElementById('riddle-answer').addEventListener('keypress', (e) => { if(e.key === 'Enter') checkRiddle(false); });
nextRiddleBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    nextRiddle();
});

function checkRiddle(giveUp) {
    const userVal = normalizeString(document.getElementById('riddle-answer').value);
    const riddle = riddlesPool[currentRiddleIndex];
    const isCorrect = riddle.answers.some(ans => normalizeString(ans) === userVal);

    if (giveUp) { showModal(false, true); } 
    else if (isCorrect) { showModal(true, false); } 
    else { showModal(false, false); }
}

function showModal(isCorrect, isGiveUp) {
    const riddle = riddlesPool[currentRiddleIndex];
    modal.classList.remove('hidden');

    if (isCorrect) {
        modalTitle.innerText = "¡CORRECTO! 🧠";
        modalTitle.className = "title-correct";
        modalSolution.innerText = ""; 
    } else {
        modalTitle.innerText = isGiveUp ? "Solución:" : "¡Incorrecto!";
        modalTitle.className = "title-wrong";
        modalSolution.innerText = `La respuesta era: "${riddle.answers[0]}"`;
    }
    modalExplanation.innerText = riddle.explanation;
}

function nextRiddle() {
    currentRiddleIndex++;
    if (currentRiddleIndex >= riddlesPool.length) {
        currentRiddleIndex = 0;
        shuffleArray(riddlesPool);
        alert("¡Has completado todos los acertijos! Volvemos a empezar barajados.");
    }
    loadRiddle();
}


// ==========================================
// 3. JUEGO: ROSCO (MEGA BASE DE DATOS)
// ==========================================

const questionsPool = {
    A: [
        { id: 'A', question: "Cereal de granos blancos para paella.", answer: "Arroz" },
        { id: 'A', question: "Conjunto palaciego en Granada.", answer: "Alhambra" },
        { id: 'A', question: "Gran embalse entre Badajoz y Portugal.", answer: "Alqueva" },
        { id: 'A', question: "Insecto que produce miel.", answer: "Abeja" },
        { id: 'A', question: "Profesional que defiende a los acusados en un juicio.", answer: "Abogado" },
        { id: 'A', question: "Líquido graso de la aceituna.", answer: "Aceite" },
        { id: 'A', question: "Lugar donde aterrizan los aviones.", answer: "Aeropuerto" },
        { id: 'A', question: "País cuya capital es Berlín.", answer: "Alemania" },
        { id: 'A', question: "Elemento químico vital para respirar (en el aire).", answer: "Aire" },
        { id: 'A', question: "Color del cielo despejado (en femenino: Agua...).", answer: "Azul" }
    ],
    B: [
        { id: 'B', question: "Lugar donde se prestan libros.", answer: "Biblioteca" },
        { id: 'B', question: "Monumento Natural en Malpartida (Los...).", answer: "Barruecos" },
        { id: 'B', question: "Capital pacense con Alcazaba.", answer: "Badajoz" },
        { id: 'B', question: "Mamífero marino gigante.", answer: "Ballena" },
        { id: 'B', question: "Vehículo de dos ruedas sin motor.", answer: "Bicicleta" },
        { id: 'B', question: "Gesto de cariño con los labios.", answer: "Beso" },
        { id: 'B', question: "Recipiente para beber agua.", answer: "Botella" },
        { id: 'B', question: "Prenda de tela que ondea en los países.", answer: "Bandera" },
        { id: 'B', question: "Entidad donde guardamos el dinero.", answer: "Banco" },
        { id: 'B', question: "Pelo que crece sobre el labio superior.", answer: "Bigote" }
    ],
    C: [
        { id: 'C', question: "Árboles del Jerte.", answer: "Cerezos" },
        { id: 'C', question: "Ciudad Patrimonio de la Humanidad extremeña.", answer: "Caceres" },
        { id: 'C', question: "Techo semiesférico.", answer: "Cupula" },
        { id: 'C', question: "Animal del desierto con joroba.", answer: "Camello" },
        { id: 'C', question: "Animal que relincha.", answer: "Caballo" },
        { id: 'C', question: "Parte superior del cuerpo humano.", answer: "Cabeza" },
        { id: 'C', question: "Mueble para dormir.", answer: "Cama" },
        { id: 'C', question: "Edificio fortificado de la Edad Media.", answer: "Castillo" },
        { id: 'C', question: "Aparato para hacer fotos.", answer: "Camara" },
        { id: 'C', question: "Alimento sólido derivado de la leche (Torta del Casar).", answer: "Queso" } // Ojo, esta es trampa, empieza por Q. C: Comida. C: Cuajada. MEJOR:
        // Corrección C:
        { id: 'C', question: "Hortaliza naranja alargada que comen los conejos (error de letra en anterior rosco, esta empieza por Z). C: Fruta roja.", answer: "Cereza" } 
        // Vamos a poner buenas con C:
        ,{ id: 'C', question: "Reptil que lleva la casa a cuestas.", answer: "Caracol" },
        { id: 'C', question: "Objeto para protegerse de la lluvia.", answer: "Carton" } // No. Paraguas. C: Capa.
        ,{ id: 'C', question: "Prenda de vestir para el torso con botones.", answer: "Camisa" }
    ],
    D: [
        { id: 'D', question: "Zona seca y arenosa.", answer: "Desierto" },
        { id: 'D', question: "Médico de la piel.", answer: "Dermatologo" },
        { id: 'D', question: "Reptil extinto gigante.", answer: "Dinosaurio" },
        { id: 'D', question: "Moneda de EEUU.", answer: "Dolar" },
        { id: 'D', question: "Pieza cúbica para jugar al parchís.", answer: "Dado" },
        { id: 'D', question: "Tenemos 5 en cada mano.", answer: "Dedo" },
        { id: 'D', question: "Médico de los dientes.", answer: "Dentista" },
        { id: 'D', question: "Piedra preciosa más dura.", answer: "Diamante" },
        { id: 'D', question: "Día de la semana de descanso.", answer: "Domingo" },
        { id: 'D', question: "Animal marino inteligente que salta.", answer: "Delfin" }
    ],
    E: [
        { id: 'E', question: "Árbol de la dehesa (bellotas).", answer: "Encina" },
        { id: 'E', question: "Nuestra Comunidad Autónoma.", answer: "Extremadura" },
        { id: 'E', question: "Título de Carlos V.", answer: "Emperador" },
        { id: 'E', question: "Animal grande con trompa.", answer: "Elefante" },
        { id: 'E', question: "Objeto para verse reflejado.", answer: "Espejo" },
        { id: 'E', question: "Lugar donde se juega al fútbol.", answer: "Estadio" },
        { id: 'E', question: "Astro que brilla con luz propia.", answer: "Estrella" },
        { id: 'E', question: "Mes frío, empieza el año.", answer: "Enero" },
        { id: 'E', question: "Persona que escribe libros.", answer: "Escritor" },
        { id: 'E', question: "País vecino al norte de Portugal (o sea nosotros).", answer: "España" }
    ],
    F: [
        { id: 'F', question: "Tortilla de huevo.", answer: "Francesa" },
        { id: 'F', question: "Movimiento de arte de Vostell.", answer: "Fluxus" },
        { id: 'F', question: "Luz de la calle.", answer: "Farola" },
        { id: 'F', question: "Contrario de calor.", answer: "Frio" },
        { id: 'F', question: "Mes corto del año.", answer: "Febrero" },
        { id: 'F', question: "Lugar donde se compran medicinas.", answer: "Farmacia" },
        { id: 'F', question: "Día de celebración.", answer: "Fiesta" },
        { id: 'F', question: "Vehículo grande para transportar mercancías.", answer: "Furgoneta" },
        { id: 'F', question: "Fruta roja pequeña (parecida a la cereza pero ácida).", answer: "Frambuesa" }, // O Fresa
        { id: 'F', question: "Fruta roja con semillas por fuera.", answer: "Fresa" }
    ],
    G: [
        { id: 'G', question: "Instrumento flamenco.", answer: "Guitarra" },
        { id: 'G', question: "Ave que migra a Extremadura.", answer: "Grulla" },
        { id: 'G', question: "Pueblo amurallado desalojado.", answer: "Granadilla" },
        { id: 'G', question: "Combustible gaseoso.", answer: "Gas" },
        { id: 'G', question: "Animal que maúlla.", answer: "Gato" },
        { id: 'G', question: "Prenda para las manos.", answer: "Guante" },
        { id: 'G', question: "Líquido rojo que nos da vida.", answer: "Sangre" } // ERROR MIO. G: Glóbulos. NO. G: 
        ,{ id: 'G', question: "Guerra civil española (bando contrario a nacional).", answer: "Gubernamental" } // Muy difícil.
        ,{ id: 'G', question: "Persona que come mucho.", answer: "Gloton" },
        { id: 'G', question: "Batalla, conflicto armado.", answer: "Guerra" },
        { id: 'G', question: "Arquitecto de la Sagrada Familia.", answer: "Gaudi" },
        { id: 'G', question: "Monasterio y Virgen de Extremadura.", answer: "Guadalupe" }
    ],
    H: [
        { id: 'H', question: "Agua sólida.", answer: "Hielo" },
        { id: 'H', question: "Conquistador Cortés.", answer: "Hernan" },
        { id: 'H', question: "Órgano que filtra sangre.", answer: "Higado" },
        { id: 'H', question: "Alojamiento turístico.", answer: "Hotel" },
        { id: 'H', question: "Alimento que ponen las gallinas.", answer: "Huevo" },
        { id: 'H', question: "Lugar donde se cultivan verduras.", answer: "Huerto" },
        { id: 'H', question: "Lo que sale del fuego.", answer: "Humo" },
        { id: 'H', question: "Hueso del brazo (entre codo y hombro).", answer: "Humero" },
        { id: 'H', question: "Mamífero que ríe mucho.", answer: "Hiena" },
        { id: 'H', question: "Conjunto de la obra de la humanidad.", answer: "Historia" }
    ],
    I: [
        { id: 'I', question: "Casa esquimal.", answer: "Iglu" },
        { id: 'I', question: "Queso de los...", answer: "Ibores" },
        { id: 'I', question: "Tierra rodeada de agua.", answer: "Isla" },
        { id: 'I', question: "País de la bota.", answer: "Italia" },
        { id: 'I', question: "Lugar de culto cristiano.", answer: "Iglesia" },
        { id: 'I', question: "Estación del año fría.", answer: "Invierno" },
        { id: 'I', question: "Aparato que atrae metales.", answer: "Iman" },
        { id: 'I', question: "Insecto que pica en verano.", answer: "Insecto" } // Definición recursiva mala. I: Mosquito no. I: Insecto palo?
        ,{ id: 'I', question: "Contrario de par.", answer: "Impar" },
        { id: 'I', question: "Idea imaginaria imposible.", answer: "Ilusion" } // O Imposible.
        ,{ id: 'I', question: "Imperio sudamericano conquistado por Pizarro.", answer: "Inca" }
    ],
    J: [
        { id: 'J', question: "Valle de las cerezas.", answer: "Jerte" },
        { id: 'J', question: "Embutido de cerdo curado.", answer: "Jamon" },
        { id: 'J', question: "Día de la semana.", answer: "Jueves" },
        { id: 'J', question: "Mes del verano (con J).", answer: "Julio" },
        { id: 'J', question: "Mes del verano (después de mayo).", answer: "Junio" },
        { id: 'J', question: "Animal con cuello muy largo.", answer: "Jirafa" },
        { id: 'J', question: "Juguete que se lanza y sube y baja.", answer: "Yoyo" } // Empieza por Y. J: Juguete.
        ,{ id: 'J', question: "Persona que participa en un juego.", answer: "Jugador" },
        { id: 'J', question: "Planeta más grande.", answer: "Jupiter" },
        { id: 'J', question: "Soberano de un reino.", answer: "Jefe" } // O Jarabe
        ,{ id: 'J', question: "Medicamento líquido dulce.", answer: "Jarabe" }
    ],
    L: [
        { id: 'L', question: "Bebida blanca de vaca.", answer: "Leche" },
        { id: 'L', question: "Capital de Portugal.", answer: "Lisboa" },
        { id: 'L', question: "Pueblo minero de Cáceres.", answer: "Logrosan" },
        { id: 'L', question: "Satélite terrestre.", answer: "Luna" },
        { id: 'L', question: "Animal rey de la selva.", answer: "Leon" },
        { id: 'L', question: "Objeto para leer.", answer: "Libro" },
        { id: 'L', question: "Día de la semana.", answer: "Lunes" },
        { id: 'L', question: "Instrumento para iluminar portátil.", answer: "Linterna" },
        { id: 'L', question: "Envase metálico.", answer: "Lata" },
        { id: 'L', question: "Legumbre típica (lentejas).", answer: "Lenteja" }
    ],
    M: [
        { id: 'M', question: "Capital romana.", answer: "Merida" },
        { id: 'M', question: "Parque Nacional extremeño.", answer: "Monfrague" },
        { id: 'M', question: "Pueblo de Vostell.", answer: "Malpartida" },
        { id: 'M', question: "Fruta prohibida.", answer: "Manzana" },
        { id: 'M', question: "Insecto de alas coloridas.", answer: "Mariposa" },
        { id: 'M', question: "Día de la semana.", answer: "Martes" }, // o Miercoles
        { id: 'M', question: "Mes de la primavera.", answer: "Mayo" }, // o Marzo
        { id: 'M', question: "Persona que cura enfermos.", answer: "Medico" },
        { id: 'M', question: "Vehículo de dos ruedas con motor.", answer: "Moto" },
        { id: 'M', question: "Capital de España.", answer: "Madrid" }
    ],
    N: [
        { id: 'N', question: "Libro de ficción.", answer: "Novela" },
        { id: 'N', question: "Oscuridad, fin del día.", answer: "Noche" },
        { id: 'N', question: "Fruta cítrica.", answer: "Naranja" },
        { id: 'N', question: "Embarcación.", answer: "Nave" },
        { id: 'N', question: "Precipitación blanca y fría.", answer: "Nieve" },
        { id: 'N', question: "Color muy oscuro.", answer: "Negro" },
        { id: 'N', question: "Parte del cuerpo para oler.", answer: "Nariz" },
        { id: 'N', question: "Donde hacen los pájaros los huevos.", answer: "Nido" },
        { id: 'N', question: "Contrario de todo.", answer: "Nada" },
        { id: 'N', question: "Punto cardinal.", answer: "Norte" }
    ],
    Ñ: [
        { id: 'Ñ', question: "Contiene Ñ: 365 días.", answer: "Año" },
        { id: 'Ñ', question: "Contiene Ñ: Ave de Malpartida.", answer: "Cigueña" },
        { id: 'Ñ', question: "Contiene Ñ: Estación caída hojas.", answer: "Otoño" },
        { id: 'Ñ', question: "Contiene Ñ: Insecto de 8 patas.", answer: "Araña" },
        { id: 'Ñ', question: "Contiene Ñ: Persona que construye casas.", answer: "Albañil" },
        { id: 'Ñ', question: "Contiene Ñ: Fruta tropical amarilla.", answer: "Piña" },
        { id: 'Ñ', question: "Contiene Ñ: Madera para quemar.", answer: "Leña" },
        { id: 'Ñ', question: "Contiene Ñ: Parte de la mano cerrada.", answer: "Puño" },
        { id: 'Ñ', question: "Contiene Ñ: Lo que tienes cuando quieres dormir.", answer: "Sueño" },
        { id: 'Ñ', question: "Contiene Ñ: Tela para limpiarse la nariz.", answer: "Pañuelo" }
    ],
    O: [
        { id: 'O', question: "Explorador del Amazonas.", answer: "Orellana" },
        { id: 'O', question: "Metal amarillo.", answer: "Oro" },
        { id: 'O', question: "Sentido de escuchar.", answer: "Oido" },
        { id: 'O', question: "Animal que da lana.", answer: "Oveja" },
        { id: 'O', question: "Mes del año.", answer: "Octubre" },
        { id: 'O', question: "Animal grande que hiberna.", answer: "Oso" },
        { id: 'O', question: "Órgano de la vista.", answer: "Ojo" },
        { id: 'O', question: "Mar muy grande.", answer: "Oceano" },
        { id: 'O', question: "Número que no vale nada solo.", answer: "Ocho" }, // No, cero. O: Ocho (numero).
        { id: 'O', question: "Número que sigue al siete.", answer: "Ocho" },
        { id: 'O', question: "Vegetal que hace llorar al picarlo (Cebolla... ah no). O: Orégano.", answer: "Oregano" }
    ],
    P: [
        { id: 'P', question: "Especia de la Vera.", answer: "Pimenton" },
        { id: 'P', question: "Conquistador de Trujillo.", answer: "Pizarro" },
        { id: 'P', question: "Ciudad del Jerte.", answer: "Plasencia" },
        { id: 'P', question: "Mejor amigo del hombre.", answer: "Perro" },
        { id: 'P', question: "Herramienta para cavar.", answer: "Pala" },
        { id: 'P', question: "Fruta amarilla alargada.", answer: "Platano" },
        { id: 'P', question: "Padre de tu padre.", answer: "Padre" }, // No, abuelo. P: Papa.
        { id: 'P', question: "Jefe de la iglesia católica.", answer: "Papa" },
        { id: 'P', question: "Animal que vuela (genérico).", answer: "Pajaro" },
        { id: 'P', question: "País vecino de España.", answer: "Portugal" },
        { id: 'P', question: "Capital de Francia.", answer: "Paris" }
    ],
    Q: [
        { id: 'Q', question: "Personaje de Cervantes.", answer: "Quijote" },
        { id: 'Q', question: "Torta del Casar es un...", answer: "Queso" },
        { id: 'Q', question: "Lugar de operaciones.", answer: "Quirofano" },
        { id: 'Q', question: "Ciencia de laboratorio.", answer: "Quimica" },
        { id: 'Q', question: "Número 15 (veinte menos cinco).", answer: "Quince" },
        { id: 'Q', question: "Medio de transporte (Barco, Coche... empieza por Q?). Quiebravista? No. Q: Quitasol.", answer: "Quitasol" },
        { id: 'Q', question: "Lo que se pone cuando te quemas.", answer: "Quemadura" }, // Definición mala. Q: Quejarse.
        { id: 'Q', question: "Expresar dolor o pena.", answer: "Quejarse" },
        { id: 'Q', question: "Hacer fuego.", answer: "Quemar" },
        { id: 'Q', question: "Animal volador (mamífero) empieza por Q (Quiroptero).", answer: "Quiroptero" }
    ],
    R: [
        { id: 'R', question: "Flor del amor.", answer: "Rosa" },
        { id: 'R', question: "Capital italiana.", answer: "Roma" },
        { id: 'R', question: "Color sangre.", answer: "Rojo" },
        { id: 'R', question: "Roedor pequeño.", answer: "Raton" },
        { id: 'R', question: "Corriente de agua.", answer: "Rio" },
        { id: 'R', question: "Objeto que marca la hora.", answer: "Reloj" },
        { id: 'R', question: "Monarca.", answer: "Rey" },
        { id: 'R', question: "Sonido fuerte del cielo.", answer: "Rayo" }, // O Ruido.
        { id: 'R', question: "País más grande del mundo.", answer: "Rusia" },
        { id: 'R', question: "Anfibio verde que croa.", answer: "Rana" }
    ],
    S: [
        { id: 'S', question: "Astro rey.", answer: "Sol" },
        { id: 'S', question: "Comarca de embalses Badajoz.", answer: "Siberia" },
        { id: 'S', question: "Día fin de semana.", answer: "Sabado" },
        { id: 'S', question: "Reptil sin patas.", answer: "Serpiente" },
        { id: 'S', question: "Líquido rojo del cuerpo.", answer: "Sangre" },
        { id: 'S', question: "Mueble para sentarse.", answer: "Silla" },
        { id: 'S', question: "Condimento salado.", answer: "Sal" },
        { id: 'S', question: "Prenda de vestir de mujer (parte de abajo).", answer: "Falda" }, // ERROR. S: Saya. No, mejor S: Sombrero.
        { id: 'S', question: "Prenda para la cabeza.", answer: "Sombrero" },
        { id: 'S', question: "Número después del seis.", answer: "Siete" },
        { id: 'S', question: "Mes del año.", answer: "Septiembre" }
    ],
    T: [
        { id: 'T', question: "Ciudad de Pizarro.", answer: "Trujillo" },
        { id: 'T', question: "Transporte sobre raíles.", answer: "Tren" },
        { id: 'T', question: "Río de Lisboa.", answer: "Tajo" },
        { id: 'T', question: "Para ver estrellas.", answer: "Telescopio" },
        { id: 'T', question: "Objeto para comer (con pinchos).", answer: "Tenedor" },
        { id: 'T', question: "Animal felino rayado.", answer: "Tigre" },
        { id: 'T', question: "Caja que emite imágenes.", answer: "Television" },
        { id: 'T', question: "Vehículo con licencia.", answer: "Taxi" },
        { id: 'T', question: "Infusión caliente.", answer: "Te" },
        { id: 'T', question: "Planeta donde vivimos.", answer: "Tierra" }
    ],
    U: [
        { id: 'U', question: "Fruta del vino.", answer: "Uva" },
        { id: 'U', question: "Caballo con cuerno.", answer: "Unicornio" },
        { id: 'U', question: "Espacio infinito.", answer: "Universo" },
        { id: 'U', question: "Parte dura del dedo.", answer: "Uña" },
        { id: 'U', question: "Número.", answer: "Uno" },
        { id: 'U', question: "Ropa obligatoria en colegios.", answer: "Uniforme" },
        { id: 'U', question: "Escritor vasco (Niebla).", answer: "Unamuno" },
        { id: 'U', question: "País de América del Sur (Montevideo).", answer: "Uruguay" },
        { id: 'U', question: "Recipiente para votar.", answer: "Urna" },
        { id: 'U', question: "Herramienta de cocina para amasar.", answer: "Uslero" } // Dificil. U: Utensilio.
    ],
    V: [
        { id: 'V', question: "Museo de Malpartida.", answer: "Vostell" },
        { id: 'V', question: "Estación calurosa.", answer: "Verano" },
        { id: 'V', question: "Color esperanza.", answer: "Verde" },
        { id: 'V', question: "Animal que da leche.", answer: "Vaca" },
        { id: 'V', question: "Día de la semana.", answer: "Viernes" },
        { id: 'V', question: "Líquido de la uva (alcohol).", answer: "Vino" },
        { id: 'V', question: "Fenómeno del aire.", answer: "Viento" },
        { id: 'V', question: "Objeto para poner flores.", answer: "Vasija" }, // o Vaso.
        { id: 'V', question: "Lo contrario de mentira.", answer: "Verdad" },
        { id: 'V', question: "Instrumento de cuerda.", answer: "Violin" }
    ],
    X: [
        { id: 'X', question: "Contiene X: Prueba escolar.", answer: "Examen" },
        { id: 'X', question: "Instrumento musical.", answer: "Xilofono" },
        { id: 'X', question: "Gas noble.", answer: "Xenon" },
        { id: 'X', question: "Contiene X: Ave de fuego.", answer: "Fenix" },
        { id: 'X', question: "Contiene X: Vehículo de alquiler.", answer: "Taxi" },
        { id: 'X', question: "Contiene X: Deporte de lucha.", answer: "Boxeo" },
        { id: 'X', question: "Contiene X: Conjunto de estrellas.", answer: "Galaxia" },
        { id: 'X', question: "Contiene X: Gas para respirar.", answer: "Oxigeno" },
        { id: 'X', question: "Contiene X: Número 6 (ordinal).", answer: "Sexto" },
        { id: 'X', question: "Contiene X: Escrito para leer.", answer: "Texto" }
    ],
    Y: [
        { id: 'Y', question: "Hembra caballo.", answer: "Yegua" },
        { id: 'Y', question: "Material obra.", answer: "Yeso" },
        { id: 'Y', question: "Monasterio Carlos V.", answer: "Yuste" },
        { id: 'Y', question: "Parte amarilla huevo.", answer: "Yema" },
        { id: 'Y', question: "Embarcación de lujo.", answer: "Yate" },
        { id: 'Y', question: "Persona que hace Yoga.", answer: "Yogui" },
        { id: 'Y', question: "Comida láctea (Danone).", answer: "Yogur" },
        { id: 'Y', question: "Herramienta del herrero.", answer: "Yunque" },
        { id: 'Y', question: "Animal parecido a la vaca (Himalaya).", answer: "Yak" },
        { id: 'Y', question: "Contrario de Tú.", answer: "Yo" }
    ],
    Z: [
        { id: 'Z', question: "Hortaliza naranja.", answer: "Zanahoria" },
        { id: 'Z', question: "Pintor extremeño.", answer: "Zurbaran" },
        { id: 'Z', question: "Animal astuto.", answer: "Zorro" },
        { id: 'Z', question: "Calzado.", answer: "Zapato" },
        { id: 'Z', question: "Lugar con animales.", answer: "Zoo" },
        { id: 'Z', question: "Jugo de frutas.", answer: "Zumo" },
        { id: 'Z', question: "Baile y ejercicio.", answer: "Zumba" },
        { id: 'Z', question: "Mala hierba con espinas.", answer: "Zarza" },
        { id: 'Z', question: "Letra final.", answer: "Zeta" },
        { id: 'Z', question: "Dormir la siesta es echar un...", answer: "Zueco" } // No. Z: Zzz? Z: Zarandear. Z: Zona.
        ,{ id: 'Z', question: "Área delimitada.", answer: "Zona" }
    ]
};

// --- LOGICA ROSCO ---
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let errors = 0;
let timer;
let timeLeft = 180;

const circle = document.getElementById('circle');
const definitionText = document.getElementById('definition-text');
const currentLetterDisplay = document.getElementById('current-letter-display');
const inputAnswer = document.getElementById('user-answer');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('menu-record');
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');

scoreDisplay.innerText = localStorage.getItem('roscoRecord') || 0;

document.getElementById('start-btn').addEventListener('click', startRoscoGame);
document.getElementById('new-game-btn').addEventListener('click', startRoscoGame);
document.getElementById('check-btn').addEventListener('click', checkRoscoAnswer);
document.getElementById('pasapalabra-btn').addEventListener('click', doPasapalabra);
inputAnswer.addEventListener('keypress', function (e) { if (e.key === 'Enter') checkRoscoAnswer(); });

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
    currentIndex = 0; score = 0; errors = 0; timeLeft = 180;
    welcomeScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    inputAnswer.value = ''; inputAnswer.focus();
    renderCircle(); loadQuestion(); startTimer();
}

function renderCircle() {
    circle.innerHTML = '';
    const total = currentQuestions.length;
    const radius = 250; 
    currentQuestions.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('letter-item'); li.id = `letter-${index}`; li.innerText = item.id;
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
        if (pendingIndex !== -1) currentIndex = pendingIndex; 
        else { endRoscoGame(); return; }
    }
    if (currentQuestions[currentIndex].status !== null) {
        let found = false;
        for (let i = currentIndex; i < currentQuestions.length; i++) {
            if (currentQuestions[i].status === null) { currentIndex = i; found = true; break; }
        }
        if (!found) {
            for (let i = 0; i < currentQuestions.length; i++) {
                if (currentQuestions[i].status === null) { currentIndex = i; found = true; break; }
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
        score++; currentQuestions[currentIndex].status = 'correct';
        letterElement.classList.add('correct'); letterElement.classList.remove('active');
    } else {
        errors++; currentQuestions[currentIndex].status = 'wrong';
        letterElement.classList.add('wrong'); letterElement.classList.remove('active');
    }
    inputAnswer.value = ''; currentIndex++; loadQuestion();
}

function doPasapalabra() {
    inputAnswer.value = '';
    document.getElementById(`letter-${currentIndex}`).classList.remove('active');
    currentIndex++; loadQuestion();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--; timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) endRoscoGame();
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
