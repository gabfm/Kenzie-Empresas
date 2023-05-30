const token = localStorage.getItem('authToken')
const isAdm = localStorage.getItem('isAdm')

const loggedUser = () => {
    
    fetch("http://localhost:3333/employees/profile", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response =>response.json())
      .then(data =>{
        if(data.company_id == null || data.department_id == null){
            showUserInfo(data.name,data.email)
        }else if(data.company_id == !null || data.department_id !== null){
            showUserInfo(data.name,data.email)
            defineCompany(data)
        }

      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
}
loggedUser()

const showUserInfo = (name,email) => {

    const sectionUserInfo = document.querySelector('.user__info')
    const h1 = document.createElement("h1");
    const h3 = document.createElement("h3");

    h1.setAttribute("class", "username");
    h3.setAttribute("class", "user__email");

    h1.textContent = name;
    h3.textContent = email;

    sectionUserInfo.appendChild(h1);
    sectionUserInfo.appendChild(h3);

}



