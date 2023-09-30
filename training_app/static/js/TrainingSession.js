const addBlock = document.getElementById('add-block');
const training = document.getElementById('training');
const metaCantBlocks = document.getElementById('meta-cant-blocks');
const metaCantExercises = document.getElementById('meta-cant-excercise');


function addEventIncrementDecrementValue(idBlock) {
    const input = document.getElementById(`total-reps-${idBlock}`);
    const add = document.getElementById(`add-reps-exercise-${idBlock}`);
    const sub = document.getElementById(`sub-reps-exercise-${idBlock}`);

    add.addEventListener('click', () => {
        let currentValue = parseInt(input.value, 10);
        input.value = currentValue + 1;
    });

    sub.addEventListener('click', () => {
        let currentValue = parseInt(input.value, 10);
        if (currentValue > 1) {
            input.value = currentValue - 1;
        }
    });
}

function manipulateInputs(idBlock, idExercise) {
    const repsInputId = document.querySelector(`#reps-inputs-${idExercise}`);
    const kgsInputId = document.querySelector(`#kgs-inputs-${idExercise}`);
    const add = document.getElementById(`add-reps-exercise-${idBlock}`);
    const sub = document.getElementById(`sub-reps-exercise-${idBlock}`);
    let lenghtInputs = document.querySelectorAll(`#reps-inputs-${idExercise} input`).length;
    console.log(lenghtInputs);

    function createInput(type, inputId, inputName) {
        const inputElement = document.createElement('input');
        inputElement.type = type;
        inputElement.id = inputId;
        inputElement.name = inputName;
        inputElement.value = 1;
        return inputElement;
    }

    add.addEventListener('click', () => {
        repsInputId.appendChild(createInput('number', `reps_${idExercise}`, `reps_${idExercise}`));
        kgsInputId.appendChild(createInput('number', `kgs_${idExercise}`, `kgs_${idExercise}`));
        lenghtInputs ++;
        console.log(lenghtInputs);
    });

    sub.addEventListener('click', () => {
        console.log(lenghtInputs);
        if (lenghtInputs > 1) {
            repsInputId.removeChild(repsInputId.lastChild);
            kgsInputId.removeChild(kgsInputId.lastChild);
            lenghtInputs --;
            console.log(lenghtInputs);
        }
    });
}

function blockExcercise (id) {
    console.log('blockExcercise');
    console.log(id);
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
            <input type="text" id="name_block_${idBlock}" name="name_block_${idBlock}" class="form-control" placeholder="Bloque">
            <span>
                <i class="bi bi-arrow-right"></i>
            </span>
            <span>Repeticiones</span>
            <div class="card-header__reps-conf">
                <span href="#" id=add-reps-exercise-${idBlock}><i class="bi bi-plus-lg"></i></span>
                <input type="text" id="total-reps-${idBlock}" name="total-reps-${idBlock}" class="form-control" readonly value="1">
                <span href="#" id=sub-reps-exercise-${idBlock}><i class="bi bi-dash-lg"></i></span>
            </div>
        </div>
        <div id="exercises-layout-${idBlock}" class="exercises-layout">
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
            <span id="add-excersice-${idBlock}"><i class="bi bi-plus-lg"></i><span>Agregar ejercicio</span></span>
        </div>
    `;

    return card;
}

function addEventAddExercise() {
    let idBlock = metaCantBlocks.value;
    const addExercise = document.getElementById(`add-excersice-${idBlock}`);
    const block = document.getElementById(`exercises-layout-${idBlock}`);
    addExercise.addEventListener('click', () => {
        metaCantExercises.value = parseInt(metaCantExercises.value, 10) + 1;
        let idExercise = metaCantExercises.value;
        const exercise = blockExcercise(idExercise);
        block.insertBefore(exercise, addExercise);
        manipulateInputs(idBlock, idExercise);
    });
}

addBlock.addEventListener('click', () => {
    metaCantBlocks.value = parseInt(metaCantBlocks.value, 10) + 1;
    console.log(metaCantBlocks.value);
    metaCantExercises.value = parseInt(metaCantExercises.value, 10) + 1;
    console.log(metaCantExercises.value);
    
    let idBlock = metaCantBlocks.value;
    let idExercise = metaCantExercises.value;
    const card = trainingCard(idBlock, idExercise);
    
    training.insertBefore(card, addBlock);
    
    addEventIncrementDecrementValue(idBlock);
    manipulateInputs(idBlock, idExercise);
    addEventAddExercise();
});

