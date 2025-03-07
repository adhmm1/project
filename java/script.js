document.addEventListener("DOMContentLoaded", function() {
    let menu = document.querySelector(".menu");
    let hamburger = document.querySelector(".hamburger");

    if (hamburger && menu) {
        hamburger.addEventListener("click", function() {
            menu.classList.toggle("open");
        });

        document.addEventListener("click", function(event) {
            if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
                menu.classList.remove("open");
            }
        });
    } else {
        console.error("العناصر غير موجودة في الـ HTML!");
    }
});