// Python Questions Database for Space Quest Game
// Preguntas apropiadas para estudiantes de secundaria de 14 años

const pythonQuestions = [
    
    {
        id: 1,
        question: "¿Cuál es el resultado de print(5 + 3)?",
        options: ["53", "8", "Error", "5+3"],
        correctAnswer: 1,
        explanation: "La suma de 5 + 3 es 8. Python realiza la operación matemática antes de imprimir.",
        difficulty: 'easy'
    },
    {
        id: 2,
        question: "¿Qué es un lenguaje de programación?",
        options: ["Matemáticas", "Sistema formal", "Navegador", "Imágenes"],
        correctAnswer: 1,
        explanation: "Los lenguajes de programación permiten comunicarse con la computadora siguiendo reglas bien definidas.",
        difficulty: 'easy'
    },
    {
        id: 3,
        question: "¿Qué característica principal tiene Python en cuanto a propósito?",
        options: ["Web", "General", "Números", "Juegos"],
        correctAnswer: 1,
        explanation: "Python es un lenguaje versátil que se puede usar en múltiples áreas.",
        difficulty: 'easy'
    },
    {
        id: 4,
        question: "¿Cómo se define una variable en Python?",
        options: ["var x = 5", "int x = 5", "x = 5", "define x = 5"],
        correctAnswer: 2,
        explanation: "En Python las variables se asignan directamente: x = 5",
        difficulty: 'easy'
    },
    {
        id: 5,
        question: "¿Qué tipo de tipado utiliza Python?",
        options: ["Estático", "Dinámico", "Fijo", "Rígido"],
        correctAnswer: 1,
        explanation: "En Python una variable puede cambiar de tipo de dato.",
        difficulty: 'easy'
    },
    {
        id: 6,
        question: "¿Cómo se escribe un comentario en Python?",
        options: ["// comentario", "/* comentario */", "# comentario", "<!-- comentario -->"],
        correctAnswer: 2,
        explanation: "Los comentarios en Python empiezan con # (numeral)",
        difficulty: 'easy'
    },
    {
        id: 7,
        question: "¿Qué función se utiliza para capturar datos del usuario?",
        options: ["enter", "write", "input", "scan"],
        correctAnswer: 2,
        explanation: "input() guarda siempre datos como texto.",
        difficulty: 'easy'
    },
    {
        id: 8,
        question: "¿Qué operador se usa para potencia?",
        options: ["^", "**", "pow", "%"],
        correctAnswer: 1,
        explanation: "2 ** 3 devuelve 8.",
        difficulty: 'easy'
    },
    {
        id: 9,
        question: "¿Qué operador verifica igualdad?",
        options: ["=", "==", "equals", ":="],
        correctAnswer: 1,
        explanation: "== compara valores, mientras que = asigna.",
        difficulty: 'easy'
    },
    {
        id: 10,
        question: "¿Qué operador representa “diferente”?",
        options: ["≠", "<>", "!=", "not="],
        correctAnswer: 2,
        explanation: "!= se usa para desigualdad.",
        difficulty: 'easy'
    },

    
    {
        id: 11,
        question: "¿Qué tipo de dato almacena True o False?",
        options: ["Texto", "Flotante", "Booleano", "Entero"],
        correctAnswer: 2,
        explanation: "Los booleanos manejan valores lógicos.",
        difficulty: 'medium'
    },
    {
        id: 12,
        question: "¿Cuál es la estructura básica de una condición en Python?",
        options: ["if { }", "if cond:", "if: cond", "if then"],
        correctAnswer: 1,
        explanation: "La indentación define el bloque de código.",
        difficulty: 'medium'
    },
    {
        id: 13,
        question: "¿Qué pasa si el if es falso y hay else?",
        options: ["Se corta", "Ejecuta else", "Repite if", "Nada"],
        correctAnswer: 1,
        explanation: "else se ejecuta cuando la condición no se cumple.",
        difficulty: 'medium'
    },
    {
        id: 14,
        question: "¿Qué palabra se usa para más condiciones?",
        options: ["elseif", "elif", "elseif()", "nextif"],
        correctAnswer: 1,
        explanation: "elif permite múltiples condiciones.",
        difficulty: 'medium'
    },
    {
        id: 15,
        question: "¿Qué ocurre si olvidamos la indentación?",
        options: ["Funciona", "Ignora", "Error", "Repite"],
        correctAnswer: 2,
        explanation: "La indentación es obligatoria en Python.",
        difficulty: 'medium'
    },
    {
        id: 16,
        question: "¿Cómo convertir texto a entero?",
        options: ["int", "float", "str", "bool"],
        correctAnswer: 0,
        explanation: "int() transforma un string en número entero.",
        difficulty: 'medium'
    },
    {
        id: 17,
        question: "¿Qué función muestra datos en pantalla?",
        options: ["echo", "write", "print", "output"],
        correctAnswer: 2,
        explanation: "print() sirve para mostrar mensajes o resultados.",
        difficulty: 'medium'
    },
    {
        id: 18,
        question: "¿Qué operador es el módulo?",
        options: ["//", "%", "mod", "/"],
        correctAnswer: 1,
        explanation: "% devuelve el resto de una división.",
        difficulty: 'medium'
    },
    {
        id: 19,
        question: "¿Qué sucede si el if es verdadero?",
        options: ["else", "Nada", "Ejecuta bloque", "Detiene"],
        correctAnswer: 2,
        explanation: "El if ejecuta solo cuando la condición es True.",
        difficulty: 'medium'
    },
    {
        id: 20,
        question: "¿Qué operador indica mayor que?",
        options: ["=>", ">", "gt", ">="],
        correctAnswer: 1,
        explanation: "> compara si un valor es mayor.",
        difficulty: 'medium'
    },

   
    {
        id: 21,
        question: "¿Qué estructura se recomienda para varias decisiones?",
        options: ["if anidado", "elif", "for", "switch"],
        correctAnswer: 1,
        explanation: "elif organiza múltiples condiciones.",
        difficulty: 'hard'
    },
    {
        id: 22,
        question: "¿Cuál es el resultado de 'abc' * 3?",
        options: ["Error", "abc3", "abcabcabc", "aaa"],
        correctAnswer: 2,
        explanation: "El operador * con strings repite el string: 'abc' * 3 = 'abcabcabc'",
        difficulty: 'hard'
    },
    {
        id: 23,
        question: "¿Cuál conversión es válida?",
        options: ["int('20')", "float('3.5')", "str(100)", "Todas"],
        correctAnswer: 3,
        explanation: "Python permite conversiones entre tipos válidos.",
        difficulty: 'hard'
    },
    {
        id: 24,
        question: "¿Qué significa >= ?",
        options: ["Igual", "Mayor", "Mayor o igual", "Menor o igual"],
        correctAnswer: 2,
        explanation: ">= combina comparación mayor y igualdad.",
        difficulty: 'hard'
    },
    {
        id: 25,
        question: "¿Por qué usar comentarios en el código?",
        options: ["Velocidad", "Corto", "Comprensión", "Evitar errores"],
        correctAnswer: 2,
        explanation: "Los comentarios ayudan a entender y mantener el código.",
        difficulty: 'hard'
    }
];

// Función para obtener preguntas por dificultad
function getQuestionsByDifficulty(difficulty) {
    return pythonQuestions.filter(q => q.difficulty === difficulty);
}

// Función para obtener preguntas aleatorias
function getRandomQuestions(count, difficulty = null) {
    const questions = difficulty 
        ? getQuestionsByDifficulty(difficulty)
        : pythonQuestions;
    
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Función para mezclar opciones de respuesta
function shuffleQuestionOptions(question) {
    const correctAnswer = question.options[question.correctAnswer];
    const shuffledOptions = [...question.options].sort(() => 0.5 - Math.random());
    const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);
    
    return {
        ...question,
        options: shuffledOptions,
        correctAnswer: newCorrectIndex
    };
}