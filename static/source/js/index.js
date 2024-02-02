
var curr_time = new Date().getHours();
var greeting_section = document.getElementById("greetingHeading");

if (curr_time >= 5 && curr_time < 12) {
    greeting_section.innerHTML = "Good morning";
} else if (curr_time >= 12 && curr_time < 18) {
    greeting_section.innerHTML = "Good afternoon";
} else {
    greeting_section.innerHTML = "Good evening";
}
document.addEventListener('DOMContentLoaded', function() {
    var scroll = window.innerHeight < document.body.scrollHeight;
    var footer = document.querySelector('footer');
    if (scroll) {
        footer.classList.remove('fixed-bottom');
    }
});