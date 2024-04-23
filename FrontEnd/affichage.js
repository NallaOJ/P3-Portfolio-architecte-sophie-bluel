const sectionPortfolio = document.getElementById("portfolio")
const divGallery = document.getElementById("gallery")


const divFilters = document.createElement("div")
divFilters.classList.add("filters")


const filterTous = document.createElement("a")
filterTous.classList.add("filter-active", "filter")
filterTous.innerText = "Tous"
divFilters.appendChild(filterTous)


fetch("http://localhost:5678/api/categories").then(res => {
    return res.json()
})
.then(data => { const categories = data
    categories.forEach(category => {
        const filterElement = document.createElement("a")
        filterElement.innerText = category.name
        filterElement.classList.add("filter")
        filterElement.setAttribute("data-id", `${category.id}`)

        divFilters.appendChild(filterElement)
        sectionPortfolio.insertBefore(divFilters, divGallery)
        console.log(divFilters)


const filtersElements = document.querySelectorAll(".filters a")
    filtersElements.forEach(filterElement => {
        filterElement.addEventListener("click", (event) => {
            document.querySelector(".filter-active")?.classList.remove("filter-active")
            filterElement.classList.add("filter-active")
            console.log(filtersElements)
                
            const works = document.querySelectorAll("#portfolio figure")
            works.forEach(work => {
                work.style.display = "block"
                if(event.target.hasAttribute("data-id") && work.dataset.id !== event.target.dataset.id) {
                    work.style.display = "none"
                    
                }
            })
            
        })
    })
})})


    const loginButton = document.querySelector(".login-button")
    loginButton.classList.add("clickable")
    const header = document.querySelector("header")
    const body = document.querySelector("body")
    
    const tokenValue = localStorage.getItem("token")
    if(tokenValue) {
        loginButton.innerText = "logout"
        loginButton.addEventListener("click", () => {
            localStorage.clear()
            location.reload()
        })
        divFilters.style.display = "none"
    
    
        const barreEdition = document.createElement("div")
        const editionText = document.createElement("p")
        editionText.innerText = "Mode édition"
        const iconEdition = document.createElement("i")
        iconEdition.classList.add("fa-regular", "fa-pen-to-square")
        barreEdition.classList.add("barre-edition")
        barreEdition.appendChild(editionText)
        barreEdition.appendChild(iconEdition)
        body.insertBefore(barreEdition, header)
    

        const divTitre = document.createElement("div")
        divTitre.classList.add("titre")
        const TitreMesProjets = document.querySelector("#portfolio h2")

       
        const boutonModifier = document.createElement("a")
        boutonModifier.innerText = "modifier"
        boutonModifier.classList.add("modifier", "clickable")
        const iconModifier = document.createElement("i")
        iconModifier.classList.add("fa-regular", "fa-pen-to-square")
        boutonModifier.appendChild(iconModifier)
      
        
        divTitre.appendChild(TitreMesProjets)
        divTitre.appendChild(boutonModifier)
        divTitre.insertBefore(iconModifier, boutonModifier)

        sectionPortfolio.insertBefore(divTitre, divGallery)
    }


