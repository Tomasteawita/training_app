export function blockExcercise (idBlock, idExercise) {
    const block = document.createElement('article');
    block.classList.add('block-exercises');
    block.innerHTML = `
        <input type="text" placeholder="Ejercicio" id="${idBlock}_${idExercise}_excercise_name" name="${idBlock}_${idExercise}_excercise_name">
        <aside class="exercises-layout__kgs-reps">
            <div id="inputs_${idBlock}_${idExercise}_reps">
                <span>Reps</span>
                <input type="number" value="1" id="input_1_${idBlock}_${idExercise}_reps" name="input_1_${idBlock}_${idExercise}_reps">
            </div>
            <div id="inputs_${idBlock}_${idExercise}_kgs">
                <span>Kgs</span>
                <input type="number" value="1" id="input_1_${idBlock}_${idExercise}_kgs" name="input_1_${idBlock}_${idExercise}_kgs">
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