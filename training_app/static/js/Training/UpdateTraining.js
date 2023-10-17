import { addEventIncrementDecrementValue } from './addEventIDValue.js';
import { addEventAddExercise } from './TrainingCard/BlockExcecrcise.js';
import { CardUI } from './TrainingCard/CardUI.js';
import { manipulateInputs } from './TrainingInputs.js';

const cantBlocks = document.querySelector('#meta-cant-blocks')
const addBlock = document.getElementById('add-block');

function IncrementDecrementInputs(idBlock, idExercise, blockReps) {
    const repsInputId = document.querySelector(`#inputs_${idBlock}_${idExercise}_reps`);
    const kgsInputId = document.querySelector(`#inputs_${idBlock}_${idExercise}_kgs`);
    const add = document.getElementById(`${idBlock}_add_reps_block`);
    const sub = document.getElementById(`${idBlock}_sub_reps_block`);
    console.log("Seleccione los contenedores de los inputs y los botones de incremento y decremento");

    var lenghtInputs = blockReps.value;
    console.log("La cantidad de inputs es:" + lenghtInputs);

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
        console.log("Incremente -> La cantidad de inputs es:" + lenghtInputs);
        const inputIdReps = `input_${lenghtInputs}_${idBlock}_${idExercise}_reps`
        const inputIdKgs = `input_${lenghtInputs}_${idBlock}_${idExercise}_kgs`
        repsInputId.appendChild(createInput('number', inputIdReps));
        kgsInputId.appendChild(createInput('number', inputIdKgs));
    });

    sub.addEventListener('click', () => {
        console.log("Estoy por entrar al if:" + lenghtInputs);
        if (document.querySelectorAll(`#inputs_${idBlock}_${idExercise}_kgs input`).length > 1) {
            repsInputId.removeChild(repsInputId.lastChild);
            kgsInputId.removeChild(kgsInputId.lastChild);
            lenghtInputs --;
            while (lenghtInputs != document.querySelectorAll(`#inputs_${idBlock}_${idExercise}_kgs input`).length) {
                repsInputId.removeChild(repsInputId.lastChild);
                kgsInputId.removeChild(kgsInputId.lastChild);
            }
            console.log("Decremento -> La cantidad de inputs es:" + lenghtInputs);
            
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
        console.log(i, j, blockReps);
        IncrementDecrementInputs(i, j, blockReps);
    } 
}



addBlock.addEventListener('click', () => {
    cantBlocks.value = parseInt(cantBlocks.value, 10) + 1;
    
    let idBlock = cantBlocks.value;
    const card = CardUI(idBlock);
    
    training.insertBefore(card, addBlock);
    
    addEventIncrementDecrementValue(idBlock);
    manipulateInputs(idBlock);
    addEventAddExercise(idBlock);
});