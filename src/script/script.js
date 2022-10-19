import '../index.html'
import '../style/style.css' // Импортируем стили css

document.addEventListener("DOMContentLoaded", () => {

    const inputs = document.querySelectorAll('.input__file'),
        success = document.querySelectorAll('.input__success'),
        pencil = document.querySelectorAll(' .input__file-icon-pencil'),
        plus = document.querySelectorAll(' .input__file-icon')

    inputs.forEach((item, index) => {
        item.addEventListener('change', function (e) {
            if (this.files && this.files.length >= 1)
                success[index].style.display = 'block';
                pencil[index].style.display = 'block';
                plus[index].style.display = 'none';
        })
    })
})