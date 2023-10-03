export function trainingCard (idBlock) {
    let idExcercise = 1;
    const card = document.createElement('article');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-header">
            <input type="text" id="${idBlock}_block_name" name="${idBlock}_block_name" class="form-control" placeholder="Nombre">
            <span>
                <i class="bi bi-arrow-right"></i>
            </span>
            <span>Repeticiones</span>
            <div class="card-header__reps-conf">
                <span href="#" id="${idBlock}_add_reps_block"><i class="bi bi-plus-lg"></i></span>
                <input type="text" id="${idBlock}_total_reps" name="${idBlock}_total_reps" readonly value="1">
                <span href="#" id="${idBlock}_sub_reps_block"><i class="bi bi-dash-lg"></i></span>
            </div>
        </div>
        <div id="${idBlock}_exercises_layout" class="exercises-layout">
            <input type="text" id="meta_${idBlock}_cant_excercise" name="meta_${idBlock}_cant_excercise" value="1" style="display:none;">
            <article class="block-exercises">
                <input type="text" placeholder="Ejercicio" id="${idBlock}_${idExcercise}_excercise_name" name="${idBlock}_${idExcercise}_excercise_name">
                <aside class="exercises-layout__kgs-reps">
                    <div id="inputs_${idBlock}_${idExcercise}_reps">
                        <span>Reps</span>
                        <input type="number" value="1" id="input_1_${idBlock}_${idExcercise}_reps" name="input_1_${idBlock}_${idExcercise}_reps">
                    </div>
                    <div id="inputs_${idBlock}_${idExcercise}_kgs">
                        <span>Kgs</span>
                        <input type="number" value="1" id="input_1_${idBlock}_${idExcercise}_kgs" name="input_1_${idBlock}_${idExcercise}_kgs">
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
            <span id="${idBlock}_add_excersice" class="add-excersice"><i class="bi bi-plus-lg"></i><span>Agregar ejercicio</span></span>
        </div>
    `;

    return card;
}