$(document).ready(function () {
    (function ($) {
        "use strict";



        $(function () {
            var header = $(".start-style");
            $(window).scroll(function () {
                var scroll = $(window).scrollTop();

                if (scroll >= 50) {
                    header.removeClass('start-style').addClass("scroll-on");
                } else {
                    header.removeClass("scroll-on").addClass('start-style');
                }
            });
        });
    })(jQuery);



})


window.addEventListener('load', function () {
    $("#payInvoice").click(function () {
        $("#togglerBtnPaypal").slideToggle();
    });



    (function ($) {




        "use strict";

        $('body').on('mouseenter mouseleave', '.nav-item', function (e) {
            if ($(window).width() > 750) {
                var _d = $(e.target).closest('.nav-item'); _d.addClass('show');
                setTimeout(function () {
                    _d[_d.is(':hover') ? 'addClass' : 'removeClass']('show');
                }, 1);
            }
        });


        const tabsBox = document.querySelector(".tabs-box"),
            allTabs = tabsBox.querySelectorAll(".tab"),
            arrowIcons = document.querySelectorAll(".icon i");

        let isDragging = false;

        const handleIcons = (scrollVal) => {
            let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
            arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
            arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
        }

        arrowIcons.forEach(icon => {
            icon.addEventListener("click", () => {
                // if clicked icon is left, reduce 350 from tabsBox scrollLeft else add
                let scrollWidth = tabsBox.scrollLeft += icon.id === "left" ? -340 : 340;
                handleIcons(scrollWidth);
            });
        });

        // allTabs.forEach(tab => {
        //     tab.addEventListener("click", () => {
        //         tabsBox.querySelector(".active").classList.remove("active");
        //         tab.classList.add("active");
        //     });
        // });

        const dragging = (e) => {
            if (!isDragging) return;
            tabsBox.classList.add("dragging");
            tabsBox.scrollLeft -= e.movementX;
            handleIcons(tabsBox.scrollLeft)
        }

        const dragStop = () => {
            isDragging = false;
            tabsBox.classList.remove("dragging");
        }

        tabsBox.addEventListener("mousedown", () => isDragging = true);
        tabsBox.addEventListener("mousemove", dragging);
        document.addEventListener("mouseup", dragStop);



    })(jQuery);
});

