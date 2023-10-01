const input = document.getElementById('ejercicios');
const options = document.querySelectorAll('.option');

input.addEventListener('input', function () {
    const inputValue = input.value.toLowerCase();
    options.forEach(option => {
        const optionText = option.textContent.toLowerCase();
        if (optionText.includes(inputValue)) {
            option.style.display = 'block';
        } else {
            option.style.display = 'none';
        }
    });
});

options.forEach(option => {
    option.addEventListener('click', function () {
        input.value = option.textContent;
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
    });
});
