export function blockExcercise (id) {
    console.log('blockExcercise');
    console.log(id);
    const block = document.createElement('article');
    block.classList.add('block-exercises');
    block.innerHTML = `
        <input type="text" placeholder="Ejercicio">
        <aside class="exercises-layout__kgs-reps">
            <div id="reps-inputs-${id}">
                <span>Reps</span>
                <input type="number" value="1">
            </div>
            <div id="kgs-inputs-${id}">
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
    `;

    return block;
}