const form = document.getElementById("form");
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirmation = document.getElementById("password-confirmation");


form.addEventListener("submit", (event) => {
  event.preventDefault(); /* evita que quando estiver na aba edicao, a pagina nao recarregue e perca as informacoes ja colocadas */

  checkForm();
})


email.addEventListener("blur", () => {
  checkInputEmail();
})


username.addEventListener("blur", () => {
  checkInputUsername();
})


function checkInputUsername(){ /* validacao do username */
  const usernameValue = username.value;

  if(usernameValue === ""){ /* se tiver vazio, vai aparecer erro */
    errorInput(username, "Preencha o campo.")
  }else{ /* se tiver certo, nao vai aparecer mensagem de erro */
    const formItem = username.parentElement;
    formItem.className = "form-content"
  }
}


function checkInputEmail(){
  const emailValue = email.value;

  if(emailValue === ""){
    errorInput(email, "O email é obrigatório.")
  }else{
    const formItem = email.parentElement;
    formItem.className = "form-content"
  }
}


function checkInputPassword(){
  const passwordValue = password.value;

  if(passwordValue === ""){
    errorInput(password, "A senha é obrigatória.")
  }else if(passwordValue.length < 8){ /* tem q ter mais que 8 caracteres */
    errorInput(password, "A senha precisa ter no mínimo 8 caracteres.")
  }else{
    const formItem = password.parentElement;
    formItem.className = "form-content"
  }
}


function checkInputPasswordConfirmation(){
  const passwordValue = password.value;
  const confirmationPasswordValue = passwordConfirmation.value;

  if(confirmationPasswordValue === ""){
    errorInput(passwordConfirmation, "A confirmação de senha é obrigatória.")
  }else if(confirmationPasswordValue !== passwordValue){
    errorInput(passwordConfirmation, "As senhas não são correspondentes.")
  }else{
    const formItem = passwordConfirmation.parentElement;
    formItem.className = "form-content"
  }
}


function checkForm(){
  checkInputUsername();
  checkInputEmail();
  checkInputPassword();
  checkInputPasswordConfirmation();

  const formItems = form.querySelectorAll(".form-content")

  const isValid = [...formItems].every( (item) => {
    return item.className === "form-content"
  });

  if(isValid){
    alert("ACESSO LIBERADO!")
    location.href = '../pages/index.html'; /* quando confirmado, vai levar ate a pagina da tabela */
  }
}


/* essa funcao vai servir para todos os elementos que possam dar erro (nome, email e senhas) */
function errorInput(input, message){
  const formItem = input.parentElement; /* "pai" */
  const textMessage = formItem.querySelector("a")

  textMessage.innerText = message; /* vai exibir a mensagem de erro no local ja predefinido atraves do <a> */

  formItem.className = "form-content error"
}

