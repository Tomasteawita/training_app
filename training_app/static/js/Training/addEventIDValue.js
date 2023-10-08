export function addEventIncrementDecrementValue(idBlock) {
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