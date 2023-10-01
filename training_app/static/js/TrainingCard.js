export function trainingCard (idBlock, idExercise) {
    console.log('trainingCard');
    const card = document.createElement('article');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-header">
            <input type="text" id="name_block_${idBlock}" name="name_block_${idBlock}" class="form-control" placeholder="Bloque">
            <span>
                <i class="bi bi-arrow-right"></i>
            </span>
            <span>Repeticiones</span>
            <div class="card-header__reps-conf">
                <span href="#" id=add-reps-exercise-${idBlock}><i class="bi bi-plus-lg"></i></span>
                <input type="text" id="total-reps-${idBlock}" name="total-reps-${idBlock}" class="form-control" readonly value="1">
                <span href="#" id=sub-reps-exercise-${idBlock}><i class="bi bi-dash-lg"></i></span>
            </div>
        </div>
        <div id="exercises-layout-${idBlock}" class="exercises-layout">
            <article class="block-exercises">
                <input type="text" placeholder="Ejercicio" id="excercise-${idExercise}" name="excercise-${idExercise}">
                <aside class="exercises-layout__kgs-reps">
                    <div id="reps-inputs-${idExercise}">
                        <span>Reps</span>
                        <input type="number" value="1">
                    </div>
                    <div id="kgs-inputs-${idExercise}">
                        <span>Kgs</span>
                        <input type="number" value="1">
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
            <span id="add-excersice-${idBlock}" class="add-excersice"><i class="bi bi-plus-lg"></i><span>Agregar ejercicio</span></span>
        </div>
    `;

    return card;
}