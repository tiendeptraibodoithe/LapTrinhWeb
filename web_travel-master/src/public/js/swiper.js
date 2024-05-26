let bar_toggle = document.querySelector(".bar-content_toggle");
let bar_icon = document.querySelector(".bar-icon_i");
let search_icon = document.querySelector(".search-icon");
let exit_icon = document.querySelector(".exit");

console.log(bar_toggle);
console.log(bar_icon);
bar_icon.onclick = function () {
  bar_icon.classList.toggle("hidden-icon");
  bar_toggle.style.display = "block";
};

exit_icon.onclick = function () {
  bar_icon.classList.toggle("hidden-icon");
  bar_toggle.style.display = "none";
};
let list = document.querySelector(".slider .slider-list_items");
let items = document.querySelectorAll(".slider .slider-list_items .item");
let dots = document.querySelectorAll(".slider .dots li");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let active = 0;
let lengthItems = items.length - 1;

next.onclick = function () {
  if (active + 1 > lengthItems) {
    active = 0;
  } else {
    active = active + 1;
  }

  reloadSlider();
};
prev.onclick = function () {
  if (active - 1 < 0) {
    active = lengthItems;
  } else {
    active -= 1;
  }
  reloadSlider();
};

let refreshSlider = setInterval(() => {
  next.click();
}, 5000);

function reloadSlider() {
  let checkLeft = items[active].offsetLeft;
  list.style.left = -checkLeft + "px";
  let lastActiveDot = document.querySelector(".slider .dots li.active");
  lastActiveDot.classList.remove("active");
  dots[active].classList.add("active");
  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => {
    next.click();
  }, 5000);
}

var swiper = new Swiper(".swiper-container", {
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 5000,
  },
  speed: 500,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: "auto",
  spaceBetween: 10,
});
var container = document.querySelector(".background");
var notepass = document.querySelector(".note");
var anchorHTML = '<a href="#">Xem chi tiết</a>';
var child1 = document.querySelector(".part_1.slide1");
var child2 = document.querySelector(".part_1.slide2");
var child3 = document.querySelector(".part_1.slide3");
var child4 = document.querySelector(".part_1.slide4");
var child5 = document.querySelector(".part_1.slide5");
var child6 = document.querySelector(".part_1.slide6");
// Thêm sự kiện click vào thẻ div con
child1.addEventListener("click", function () {
  // Thay đổi background của thẻ div cha
  container.style.backgroundImage = "url(../image/pic_1_1a.jpg)";
  notepass.innerHTML = `Thung lũng Lũng Cú - Hà Giang <br/> Đánh giá: 9/10 <br/> ${anchorHTML}`;
});
child2.addEventListener("click", function () {
  // Thay đổi background của thẻ div cha
  container.style.backgroundImage = "url(../image/pic_1_2a.png)";
  notepass.innerHTML = `Chùa Bái đính - Ninh Bình<br/> Đánh giá: 8/10 <br/> ${anchorHTML}`;
});
child3.addEventListener("click", function () {
  // Thay đổi background của thẻ div cha
  container.style.backgroundImage = "url(../image/pic_1_3a.jpg)";
  notepass.innerHTML = `Núi Thành - Quảng Nam <br/> Đánh giá: 9/10 <br/> ${anchorHTML}`;
});
child4.addEventListener("click", function () {
  // Thay đổi background của thẻ div cha
  container.style.backgroundImage = "url(../image/pic_1_4a.jpg)";
  notepass.innerHTML = `Hồ Gươm - Hà Nội <br/> Đánh giá: 9.3/10 <br/> ${anchorHTML}`;
});
child5.addEventListener("click", function () {
  // Thay đổi background của thẻ div cha
  container.style.backgroundImage = "url(../image/pic_1_5a.jpg)";
  notepass.innerHTML = `Thung Lũng Vàng Đà Lạt - Đà Nẵng <br/> Đánh giá: 9/10 <br/> ${anchorHTML}`;
});
child6.addEventListener("click", function () {
  // Thay đổi background của thẻ div cha
  container.style.backgroundImage = "url(../image/pic_1_6a.png)";
  notepass.innerHTML = `Cầu Tô - Thái Bình <br/> Đánh giá: /10 <br/> ${anchorHTML}`;
});