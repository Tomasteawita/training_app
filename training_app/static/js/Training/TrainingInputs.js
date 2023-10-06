export function manipulateInputs(idBlock) {
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
