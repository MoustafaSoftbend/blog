const height = parseInt(document.querySelector(".slide-img").offsetHeight);
const slide = document.querySelector(".carousel-viewport");
const hamburger = document.querySelector('.hamburger-menu');
const nav_list = document.querySelector('.navbar-nav'); 
let imagesLength;
const nav_btn = document.querySelector("a.navigation");
const navbar = document.querySelector("#navbar");
let halt = false;
let recordedPageId;
let recordIndex = 0;

window.addEventListener("DOMContentLoaded", (e) => {
  window.addEventListener("scroll", function (e) {
    if (window.scrollY == 0) {
      navbar.style.background = "transparent";
    } else {
      navbar.style.background = "#000";
    }
  });
  if (hamburger){
    hamburger.addEventListener('click', function() {
      hamburger.style.display = 'none'
      nav_list.style.transition = "all 0.5s";
      nav_list.style.transform = "translateX(-10%)";
    })

  }

  slide.addEventListener("mouseenter", function (e) {
    console.log("Halt");
    recordedPageId = e;
    halt = true;
  });
  slide.addEventListener("mouseleave", function (e) {
    if (e.toElement == null || e.toElement.tagName != "SPAN") {
      console.log("Mouse Leave");
      halt = false;
      console.log(e.timeStamp);
      if (recordIndex != 0) {
        recordIndex = 0;
        slider();
      }
    }
  });

  nav_btn.addEventListener("click", function () {
    let index = recordIndex++;
    imagesLength = document.querySelectorAll(".slide-img").length;
    if (recordIndex >= imagesLength) {
      slide.scroll(0, -height * imagesLength);
      recordIndex = 0;
    }
    slide.scroll(0, height * index);
  });

  function slider(index = 0) {
    imagesLength = document.querySelectorAll(".slide-img").length;

    console.log(index);
    if (halt) {
      recordIndex = index;
      console.log(`recorded ${recordIndex}`);
      return;
    } else if (index >= imagesLength) {
      slide.scroll(0, -height * imagesLength);
      index = 1;
    } else {
      slide.scroll(0, height * index);
      index++;
    }

    setTimeout(function () {
      slider(index);
    }, 2500);
  }

  const fnCall = setInterval(slider(), 2500);
});
