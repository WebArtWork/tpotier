document.addEventListener('DOMContentLoaded', function() {
    const toggler = document.querySelector('.navbar-toggler');

    toggler.addEventListener('click', function() {
        toggler.classList.toggle('active');
    });
});
document.querySelector(".burger-wrap").addEventListener("click", function () {
    document.querySelector(".collapse").classList.toggle("collapse--open");
    document.querySelector(".burger").classList.toggle("burger--close");
});