import { addEventIncrementDecrementValue } from './addEventIDValue.js';
// import { manipulateInputs } from './TrainingInputs.js';

const cantBlocks = document.querySelector('#meta-cant-blocks')

function manipulateInputs(idBlock, idExercise, blockReps) {
    const repsInputId = document.querySelector(`#inputs_${idBlock}_${idExercise}_reps`);
    const kgsInputId = document.querySelector(`#inputs_${idBlock}_${idExercise}_kgs`);
    const add = document.getElementById(`${idBlock}_add_reps_block`);
    const sub = document.getElementById(`${idBlock}_sub_reps_block`);
    let lenghtInputs = blockReps.value;
    

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



for (let i = 1; i <= cantBlocks.value; i++) {
    let exercisesMetaData = document.querySelector(`#meta_${i}_cant_excercise`);
    let cantExercises = exercisesMetaData.value;
    const blockReps = document.getElementById(`${i}_total_reps`);
    blockReps.value = document.querySelectorAll(`#inputs_${i}_${cantExercises}_kgs input`).length;
    addEventIncrementDecrementValue(i);
    for (let j = 1; j <= cantExercises; j++) {
        manipulateInputs(i, j, blockReps);
    } 
}