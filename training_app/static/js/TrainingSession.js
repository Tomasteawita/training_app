const addBlock = document.getElementById('add-block');
const training = document.getElementById('training');
const metaCantBlocks = document.getElementById('meta-cant-blocks');
const metaCantExercises = document.getElementById('meta-cant-exercises');

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

function blockExcercise (id) {
    console.log('blockExcercise');
    const block = document.createElement('article');
    block.classList.add('block-exercises');
    block.innerHTML = `
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
    `;

    return block;
}


function trainingCard (idBlock, idExercise) {
    console.log('trainingCard');
    const card = document.createElement('article');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-header">
            <input type="text" id="name_exercise_${idBlock}" name="name_exercise_${idBlock}" class="form-control" placeholder="Bloque">
            <span>
                <i class="bi bi-arrow-right"></i>
            </span>
            <span>Repeticiones</span>
            <div class="card-header__reps-conf">
                <span href="#" id=add-reps-exercise-${idBlock}><i class="bi bi-plus-lg"></i></span>
                <input type="text" id="exercise_${idBlock}" name="exercise_${idBlock}" class="form-control" readonly value="1">
                <span href="#" id=sub-reps-exercise-${idBlock}><i class="bi bi-dash-lg"></i></span>
            </div>
        </div>
        <div id="exercises-layout">
            <article class="block-exercises">
                <input type="text" placeholder="Ejercicio" id="excercise-${idExercise}" name="excercise-${idExercise}">
                <aside class="exercises-layout__kgs-reps">
                    <div id="reps-inputs-${idExercise}">
                        <span>Reps</span>
                        <input type="number" value="1">
                    </div>
                    <div id="kgs-inputs-${idExercise}">
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
            <span id="add-excersice-${id}"><i class="bi bi-plus-lg"></i><span>Agregar ejercicio</span></span>
        </div>
    `;

    return card;
}

function addEventAddExercise(idExercise) {
    const addExercise = document.getElementById(`add-excersice-${idExercise}`);
    const block = document.getElementById(`exercises-layout`);
    addExercise.addEventListener('click', () => {
        const exercise = blockExcercise(id);
        block.insertBefore(exercise, addExercise);
        const input = document.getElementById(`exercise_${idExercise}`);
        const add = document.getElementById(`add-reps-exercise-${idExercise}`);
        const sub = document.getElementById(`sub-reps-exercise-${idExercise}`);
        addEventIncrementDecrementValue(input, add, sub, id);
    });
}

addBlock.addEventListener('click', () => {
    metaCantBlocks.value = parseInt(metaCantBlocks.value, 10) + 1;
    metaCantExercises.value = parseInt(metaCantExercises.value, 10) + 1;
    
    let idBLock = blockExcercise.value;
    let idExercise = trainingCard.value;
    const card = trainingCard(idBLock, idExercise);
    
    training.insertBefore(card, addBlock);
    
    const input = document.getElementById(`exercise_${idBLock}`);
    const add = document.getElementById(`add-reps-exercise-${idBLock}`);
    const sub = document.getElementById(`sub-reps-exercise-${idBLock}`);
    
    addEventIncrementDecrementValue(input, add, sub, idBLock);
    addEventAddExercise(idExercise);
});

