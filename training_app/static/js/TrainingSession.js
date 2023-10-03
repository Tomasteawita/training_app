import { trainingCard } from './TrainingCard.js';
import { blockExcercise } from './BlockExcercise.js';

const addBlock = document.getElementById('add-block');
const training = document.getElementById('training');
const metaCantBlocks = document.getElementById('meta-cant-blocks');


function addEventIncrementDecrementValue(idBlock) {
    const input = document.getElementById(`${idBlock}_total_reps`);
    const add = document.getElementById(`${idBlock}_add_reps_block`);
    const sub = document.getElementById(`${idBlock}_sub_reps_block`);

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

function manipulateInputs(idBlock) {
    const idExercise = document.querySelector(`#meta_${idBlock}_cant_excercise`).value;
    const repsInputId = document.querySelector(`#inputs_${idBlock}_${idExercise}_reps`);
    const kgsInputId = document.querySelector(`#inputs_${idBlock}_${idExercise}_kgs`);
    const add = document.getElementById(`${idBlock}_add_reps_block`);
    const sub = document.getElementById(`${idBlock}_sub_reps_block`);
    let lenghtInputs = document.querySelectorAll(`#inputs_${idBlock}_${idExercise}_reps input`).length;
    

    function createInput(type, inputId) {
        const inputElement = document.createElement('input');
        inputElement.type = type;
        inputElement.id = inputId;
        inputElement.name = inputId;
        inputElement.value = 1;
        return inputElement;
    }

    add.addEventListener('click', () => {
        lenghtInputs ++;
        const inputIdReps = `input_${lenghtInputs}_${idBlock}_${idExercise}_reps`
        const inputIdKgs = `input_${lenghtInputs}_${idBlock}_${idExercise}_kgs`
        repsInputId.appendChild(createInput('number', inputIdReps));
        kgsInputId.appendChild(createInput('number', inputIdKgs));
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
    const metaCantExercises = document.getElementById(`meta_${idBlock}_cant_excercise`);
    const addExercise = document.getElementById(`${idBlock}_add_excersice`);
    const block = document.getElementById(`${idBlock}_exercises_layout`);
    addExercise.addEventListener('click', () => {
        metaCantExercises.value = parseInt(metaCantExercises.value, 10) + 1;
        let idExercise = metaCantExercises.value;
        const exercise = blockExcercise(idBlock, idExercise);
        block.insertBefore(exercise, addExercise);
        manipulateInputs(idBlock);
    });
}

addBlock.addEventListener('click', () => {
    metaCantBlocks.value = parseInt(metaCantBlocks.value, 10) + 1;
    
    let idBlock = metaCantBlocks.value;
    const card = trainingCard(idBlock);
    
    training.insertBefore(card, addBlock);
    
    addEventIncrementDecrementValue(idBlock);
    manipulateInputs(idBlock);
    addEventAddExercise();
});

