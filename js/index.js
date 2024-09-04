document.addEventListener('DOMContentLoaded', function() {
    const toggler = document.querySelector('.navbar-toggler');

    toggler.addEventListener('click', function() {
        toggler.classList.toggle('active');
    });
});