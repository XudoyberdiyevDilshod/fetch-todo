const elForm = document.querySelector(".js-form");
const elPasswordInput = document.querySelector(".js-password");
const elEye = document.querySelector(".js-eye");
const elNameInput = document.querySelector(".js-name");
const elReg = document.querySelector(".js-reg");


elReg.addEventListener("click", function(evt) {
  if(evt.target.matches('.js-reg')){
    location.replace('register.html')
  }
})

elEye.addEventListener("mousedown", function () {
  elPasswordInput.type = "text";
});
elEye.addEventListener("mouseup", function () {
  elPasswordInput.type = "password";
});

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  fetch("https://todo-for-n92.cyclic.app/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: elNameInput.value,
      password: elPasswordInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        location.replace("index.html");
      }
    })
    .catch((err) => console.log(err));
});

// DARK MODE
let elModeBtn = document.querySelector(".js-mode");
let theme = false;

elModeBtn.addEventListener("click", function () {
  theme = !theme;
  const bg = theme ? "dark" : "light";
  window.localStorage.setItem("theme", bg);
  changeTheme();
});

function changeTheme() {
  if (window.localStorage.getItem("theme") == "dark") {
    login.style.color = "white";
    elModeBtn.innerHTML = `BRIGHT <img class="ms-1" src="./images/day-mode.png" alt="night-mode" width="20" height="20">`;
    document.body.classList.add("dark");
  } else {
    login.style.color = "Black";
    elModeBtn.innerHTML = `DARK <img class="ms-2" src="./images/night-mode.png" alt="night-mode" width="20" height="20">`;
    document.body.classList.remove("dark");
  }
}
changeTheme();
