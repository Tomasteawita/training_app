import { trainingCard } from './TrainingCard.js';
import { blockExcercise } from './BlockExcercise.js';

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
        
    });

    sub.addEventListener('click', () => {
        
        if (lenghtInputs > 1) {
            repsInputId.removeChild(repsInputId.lastChild);
            kgsInputId.removeChild(kgsInputId.lastChild);
            lenghtInputs --;
            
        }
    });
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
    metaCantExercises.value = parseInt(metaCantExercises.value, 10) + 1;
    
    let idBlock = metaCantBlocks.value;
    let idExercise = metaCantExercises.value;
    const card = trainingCard(idBlock, idExercise);
    
    training.insertBefore(card, addBlock);
    
    addEventIncrementDecrementValue(idBlock);
    manipulateInputs(idBlock, idExercise);
    addEventAddExercise();
});

