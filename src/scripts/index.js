async function requestSectors(){
    await fetch("http://localhost:3333/categories/readAll")
        .then(response => response.json())
        .then(data => {
            localStorage.clear()
            localStorage.setItem('sectores',JSON.stringify(data))
            })
        .catch(error => console.log(error))
        if(sectoresStorage == null){
          location.reload()
        }
    }
    requestSectors()
    const sectoresStorage = JSON.parse(localStorage.getItem('sectores'))
    
    async function requestCompanies(){
      await fetch("http://localhost:3333/companies/readAll")
      .then(response => response.json())
      .then(data => {
          localStorage.setItem('companies',JSON.stringify(data))
          })
      .catch(error => console.log(error))
      if(sectoresStorage == null){
        location.reload()
      }
    }
    requestCompanies()
    const companiesStorage = JSON.parse(localStorage.getItem('companies'))
    
    const showSectores = (arr) => {
        const select = document.querySelector('.companies__container')
        arr.forEach(element => {
          const createOption = document.createElement('option')
    
          createOption.innerHTML = element.name
          createOption.value = element.id
          select.appendChild(createOption)
        })
    
      }
    
      showSectores(sectoresStorage)
    
    const verifycFilter = () => {
      const select = document.querySelector('.companies__container')
      let change 
      select.addEventListener('change', ()=> {
        change = select.value
        if(change == "All"){
              renderCompanies(companiesStorage)
        }else{
              organizeCompanies(change)
        }
      })}
        
      verifycFilter()
    
    const organizeCompanies = (change) => {
      let companiesChanges = []
      companiesStorage.forEach(element => {
        if(element.category_id == change){
          companiesChanges.push(element)
        }
      })
        renderCompanies(companiesChanges)
    }   
    
    const renderCompanies = (arr) =>{ 
       const list = document.querySelector(".companies__list")
        if (list && list.childNodes.length > 0) {
        for (let i = list.childNodes.length - 1; i >= 0 ;i--) {
          list.removeChild(list.childNodes[i])
        }
      }

      arr.forEach(element => {
        const listItem = document.createElement("li")
        listItem.classList.add("list__item")
        
        const heading = document.createElement("h3")
        heading.textContent = element.name
           
        const category = document.createElement("span")
        category.classList.add("category__container")
          sectoresStorage.forEach(sectorElement =>{
           if(sectorElement.id == element.category_id){
            console.log(sectorElement.name)
          category.textContent = sectorElement.name
           }
          
          })
        
        listItem.appendChild(heading)
        listItem.appendChild(category)
        list.appendChild(listItem)
        })
      }
    
    
    renderCompanies(companiesStorage)
    
    const renderList = (arr) => {
      const listContainer = document.querySelector('ul')
      arr.forEach(company => {
    
          const li = document.createElement('li')
          const liContainer = document.createElement('div')
          const companyName = document.createElement('h2')
          const departmentSpan = document.createElement('span')
    
          li.id = `${company.category_id}`
          
    
          companyName.innerHTML = company.name
          
          liContainer.append(companyName, departmentSpan)
          li.appendChild(liContainer)
          listContainer.appendChild(li)
      })
    }