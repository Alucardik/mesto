let likeBtns = document.querySelectorAll(".gallery__like-btn");

for (let i = 0; i < likeBtns.length; ++i) {
  likeBtns[i].addEventListener("click", function () {
    likeBtns[i].classList.toggle("gallery__like-btn_active");
  })
}
