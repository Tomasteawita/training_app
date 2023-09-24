const addBlock = document.getElementById('add-block');
const training = document.getElementById('training');
let id = 1;

function addEventIncrementDecrementValue(input, add, sub) {
    add.addEventListener('click', () => {
        let currentValue = parseInt(input.value, 10);
        input.value = currentValue + 1;
    });

    sub.addEventListener('click', () => {
        let currentValue = parseInt(input.value, 10);
        if (currentValue > 0) {
            input.value = currentValue - 1;
        }
    });
}

addBlock.addEventListener('click', () => {
    const card = document.createElement('article');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-header">
            <input type="text" id="name_exercise_${id}" name="name_exercise_${id}" class="form-control" readonly value="0">
            <span class="input-group-append">
                <span class="input-group-text">
                    <i class="bi bi-arrow-right"></i>
                </span>
            </span>
            <span>Repeticiones</span>
            <span class="input-group-append">
                <a href="#" id=add-reps-exercise-${id}>+</a>
                <input type="text" id="exercise_${id}" name="exercise_${id}" class="form-control" readonly value="0">
                <a href="#" id=sub-reps-exercise-${id}>-</a>
            </span>
        </div>
    `;
    training.insertBefore(card, addBlock);

    const input = document.getElementById(`exercise_${id}`);
    const add = document.getElementById(`add-reps-exercise-${id}`);
    const sub = document.getElementById(`sub-reps-exercise-${id}`);
    addEventIncrementDecrementValue(input, add, sub);

    id++;
});
