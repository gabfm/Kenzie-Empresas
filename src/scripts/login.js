import { toast } from './toast.js'

const red = "#D7443E";
const green = "#36B37E";

const checkLogin = () =>{
    
    const btnLogin = document.querySelector('.login__button')
    btnLogin.addEventListener('click',()=>{
        const email = document.querySelector('.input__email').value
        const password = document.querySelector('.input__password').value
        console.log(password,email)
        if(email.length == 0 || password.length == 0){
            toast("Insira um email ou senha!")
          }else {
   requestLogin(email,password)
}})
}

checkLogin ()

async function requestLogin(email,password){
    const url = 'http://localhost:3333/auth/login';
    const data = {
      email: email,
      password: password
    };
    console.log(data)
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data =>{
        if(data.message == "Email ou senha inválidos"){
          toast(data.message,red)
        }else{
          verifyUser(data)
          toast(data.message,green)
        }
        } )
      .catch(error => console.error(error));

}

const verifyUser = (data) =>{
    console.log(data)
      
    if(data.message == 'Email ou senha inválidos'){
    toast("Email ou senha inválidos")
  }else if(data.isAdm == true){
    localStorage.setItem('isAdm', data.isAdm)
    localStorage.setItem('authToken', data.authToken)
    window.location.href = "./adminPage.html";
  }
  else{
    localStorage.setItem('isAdm', data.isAdm)
    localStorage.setItem('authToken', data.authToken)
    window.location.href = "./user.html";
  }
}
