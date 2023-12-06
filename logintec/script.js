const form = document.getElementById("form");
const username = document.getElementById("username")
const matricula = document.getElementById("matricula")

form.addEventListener("submit", (event) => {
  event.preventDefault();

  checkForm();
})

email.addEventListener("blur", () => {
  checkInputMatricula();
})


username.addEventListener("blur", () => {
  checkInputUsername();
})


function checkInputUsername(){
  const usernameValue = username.value;

  if(usernameValue === ""){
    errorInput(username, "Preencha o campo")
  }else{
    const formItem = username.parentElement;
    formItem.className = "form-content"
  }

}

function checkInputMatricula(){
  const matriculaValue = matricula.value;

  if(matriculaValue === ""){
    errorInput(matricula, "A matrícula é obrigatória.")
  }else if(isNaN(matriculaValue)){
    errorInput(matricula, "Apenas números são permitidos!")
  }else{
    const formItem = matricula.parentElement;
    formItem.className = "form-content"
  }


}


function checkForm(){
  checkInputUsername();
  checkInputMatricula();

  const formItems = form.querySelectorAll(".form-content")

  const isValid = [...formItems].every( (item) => {
    return item.className === "form-content"
  });

  if(isValid){
    alert("ACESSO LIBERADO!")
    location.href = '../pagestec/index.html'
  }

}

function errorInput(input, message){
  const formItem = input.parentElement;
  const textMessage = formItem.querySelector("a")

  textMessage.innerText = message;

  formItem.className = "form-content error"

}