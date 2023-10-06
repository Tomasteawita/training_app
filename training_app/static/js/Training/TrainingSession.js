import { CardUI } from './TrainingCard/CardUI.js';
import { manipulateInputs } from './TrainingInputs.js';
import { addEventAddExercise } from './TrainingCard/BlockExcecrcise.js';



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





addBlock.addEventListener('click', () => {
    metaCantBlocks.value = parseInt(metaCantBlocks.value, 10) + 1;
    
    let idBlock = metaCantBlocks.value;
    const card = CardUI(idBlock);
    
    training.insertBefore(card, addBlock);
    
    addEventIncrementDecrementValue(idBlock);
    manipulateInputs(idBlock);
    addEventAddExercise(idBlock);
});

