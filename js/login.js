const submit = document.getElementById("submit-btn");
const email = document.getElementById("email");
const password = document.getElementById("password");

submit.addEventListener("click", function onClick() {
    alert(`You are now logged in!\nemail: ${email.value}\npassword: ${password.value}`);
})