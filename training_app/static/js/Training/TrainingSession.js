import { CardUI } from './TrainingCard/CardUI.js';
import { manipulateInputs } from './TrainingInputs.js';
import { addEventAddExercise } from './TrainingCard/BlockExcecrcise.js';
import { addEventIncrementDecrementValue } from './addEventIDValue.js';


const addBlock = document.getElementById('add-block');
const training = document.getElementById('training');
const metaCantBlocks = document.getElementById('meta-cant-blocks');

addBlock.addEventListener('click', () => {
    metaCantBlocks.value = parseInt(metaCantBlocks.value, 10) + 1;
    
    let idBlock = metaCantBlocks.value;
    const card = CardUI(idBlock);
    
    training.insertBefore(card, addBlock);
    
    addEventIncrementDecrementValue(idBlock);
    manipulateInputs(idBlock);
    addEventAddExercise(idBlock);
});

