import { blockExcercise } from './BlockExcerciseUI.js';
import { manipulateInputs } from '../TrainingInputs.js';

export function addEventAddExercise(idBlock) {
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