
function calcularCalorias(datos) {
    const {edad, peso, altura, actividad, sexo} = datos;

    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    }

    if(sexo === "M") {
        const calorias = actividad * ((multiplicadorTMB.peso * peso) + (multiplicadorTMB.altura * altura) - (multiplicadorTMB.edad * edad)) + 5;
        return calorias;
    } else {
        const calorias = actividad * ((multiplicadorTMB.peso * peso) + (multiplicadorTMB.altura * altura) - (multiplicadorTMB.edad * edad)) - 161;
        return calorias;
    }
 //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
 //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
}

function mostrarMensaje(msg) {
    const resultado = document.querySelector("#resultado");
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center  flex-column h-100';
    divError.id = 'calculo';

    msg[0] ? divError.innerHTML =`
    <legend class="h2 text-center">Calorías Requeridas</legend>
    <span class="alert alert-success text-center">${msg[1]}</span>
    <span class="alert alert-success text-center">${msg[2]}</span>`
    : divError.innerHTML = `
    <span class="alert alert-danger text-center">${msg[1]}</span>
    <span class="alert alert-danger text-center">${msg[2]}</span>`
    

    resultado.appendChild(divError);

    aparecerResultado();

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 10000);
};


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
};

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
};

function calcularTipoPoblacion(edad){
    if(edad >= 15 && edad <= 29){
        return "Joven";
    } else if(edad >= 30 && edad <= 59){
        return "Adulto";
    } else {
        return "Adulto Mayor";
    }
};

const caloriasForm = document.querySelector("#formulario-calculadora");

caloriasForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const datos = {
        name: document.querySelector("#name").value,
        doc_type: document.querySelector("#doc_type").value,
        doc_number: document.querySelector("#doc_number").value,
        edad: document.querySelector("#edad").value,
        peso: document.querySelector("#peso").value,
        altura: document.querySelector("#altura").value,
        actividad: document.querySelector("#actividad").value,
        sexo: document.querySelector("[name='genero']:checked").value
    };

    const calorias = Math.round(calcularCalorias(datos));
    const grupoPoblacion = calcularTipoPoblacion(datos.edad);

    if(!datos.name || !datos.doc_type || !datos.doc_number || !datos.edad || datos.edad < 15 || !datos.peso || !datos.altura || !datos.actividad || !datos.sexo){
        const mensage = [false, "¡Ha ocurrido un error!", "Por favor, verifica los datos ingresados e intenta nuevamente"];

        mostrarMensaje(mensage);
    } else {
        const mensage = [true, `El paciente ${datos.name} identificado con ${datos.doc_type} NO. ${datos.doc_number}, requiere un total de ${calorias} kcal para el sostenimiento de su TBM`, `El usuario pertenece al grupo poblacional de: ${grupoPoblacion}`];
        
        mostrarMensaje(mensage);
    } 
});