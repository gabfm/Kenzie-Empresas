import { toast } from './toast.js'

const red = "#D7443E";
const green = "#36B37E";

const tokenUser = localStorage.getItem("authToken");
const isAdm = localStorage.getItem('isAdm')
const routeProtect = () => {
  if(tokenUser){
      if(isAdm == "true"){
        window.location.href = "./adminPage.html";
      }else if(isAdm == "false"){
        window.location.href = "./user.html";
      }
  }else if(!tokenUser){
  }
}

const getUser = () =>{
    const btnRegister = document.querySelector('.register__button')
    btnRegister.addEventListener('click',()=>{
        const name = document.querySelector('.input__name').value
        const email = document.querySelector('.input__email').value
        const password = document.querySelector('.input__password').value
        if(name.length != 0){
            if(verifyEmail(email)){
                if(password.length > 7){
                    createUser(name,email,password)
                    
                }else{
                    toast("Insira uma senha com 8 ou mais caracteres!",red)
                }
            }else{ 
                toast("Insira um email válido",red)
            }
        }else{
            toast("Insira um nome",red)
        }
    })
}
getUser()

const verifyEmail = (email) => {
  if (!email) {
    return false;
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return false;
  }
  
  return true;
}



async function createUser(nome,email,password){
    const url = 'http://localhost:3333/employees/create';
const data = {
  "name": nome,
  "email": email,
  "password": password
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
  .then(data => {
    console.log(data)
    if(data.message == "Email já cadastrado, por favor informe outro ou faça login"){
      toast(data.message,red)
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 1500);
    }else{
      toast("Email criado, Logue-se",green);
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 1500);
    }
    
})
  .catch(error => console.error(error));
}

