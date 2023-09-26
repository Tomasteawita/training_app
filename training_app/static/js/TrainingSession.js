const addBlock = document.getElementById('add-block');
const training = document.getElementById('training');
let id = 1;

function addEventIncrementDecrementValue(input, add, sub, id) {
    const repsInputId = document.querySelector(`#reps-inputs-${id}`);
    const kgsInputId = document.querySelector(`#kgs-inputs-${id}`);

    function createInput(type, inputId, inputName) {
        const inputElement = document.createElement('input');
        inputElement.type = type;
        inputElement.id = inputId;
        inputElement.name = inputName;
        inputElement.value = 1;
        return inputElement;
    }

    add.addEventListener('click', () => {
        let currentValue = parseInt(input.value, 10);
        input.value = currentValue + 1;
        repsInputId.appendChild(createInput('number', `reps_${id}`, `reps_${id}`));
        kgsInputId.appendChild(createInput('number', `kgs_${id}`, `kgs_${id}`));
    });

    sub.addEventListener('click', () => {
        let currentValue = parseInt(input.value, 10);
        if (currentValue > 1) {
            input.value = currentValue - 1;
            repsInputId.removeChild(repsInputId.lastChild);
            kgsInputId.removeChild(kgsInputId.lastChild);
        }
    });
}



function trainingCard (id) {
    console.log('trainingCard');
    const card = document.createElement('article');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-header">
            <input type="text" id="name_exercise_${id}" name="name_exercise_${id}" class="form-control" placeholder="Bloque">
            <span>
                <i class="bi bi-arrow-right"></i>
            </span>
            <span>Repeticiones</span>
            <div class="card-header__reps-conf">
                <span href="#" id=add-reps-exercise-${id}><i class="bi bi-plus-lg"></i></span>
                <input type="text" id="exercise_${id}" name="exercise_${id}" class="form-control" readonly value="1">
                <span href="#" id=sub-reps-exercise-${id}><i class="bi bi-dash-lg"></i></span>
            </div>
        </div>
        <div id="exercises-layout">
            <article class="block-exercises">
                <input type="text" placeholder="Ejercicio">
                <aside class="exercises-layout__kgs-reps">
                    <div id="reps-inputs-${id}">
                        <span>Reps</span>
                        <input type="number" value="1">
                    </div>
                    <div id="kgs-inputs-${id}">
                        <span>Kgs</span>
                        <input type="number" value="1">
                    </div>
                </aside>
                <ul class="complete-all-inputs">
                    <li><input type="text"><label for="" id="apply-reps-all">Todas</label></li>
                    <li><input type="text"><label for="" id="apply-kg-all">Todas</label></li>
                </ul>
                <div class="RPE">
                    <input type="checkbox">
                    <span>Anotar percepción del esfuerzo</span>
                </div>
            </article>
            <a href="#" id="add-excersice"><i class="bi bi-plus-lg"></i><span>Agregar ejercicio</span></a>
        </div>
    `;

    return card;
}


addBlock.addEventListener('click', () => {
    const card = trainingCard(id);
    training.insertBefore(card, addBlock);
    const input = document.getElementById(`exercise_${id}`);
    const add = document.getElementById(`add-reps-exercise-${id}`);
    const sub = document.getElementById(`sub-reps-exercise-${id}`);
    addEventIncrementDecrementValue(input, add, sub, id);

    id++;
});

