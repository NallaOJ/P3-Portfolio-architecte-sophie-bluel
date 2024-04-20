//récupération de la section "portfolio" et la div "gallery"
const sectionPortfolio = document.getElementById("portfolio")
const divGallery = document.getElementById("gallery")

//création d'une div "filtres" en ajoutant une class "filters"
const divFilters = document.createElement("div")
divFilters.classList.add("filters")


//création d'une balise <a> où est ajouté la class "filter-active" et "filter". ensuite le texte "Tous" est ajouté à cette balise, qui est enuite mis dans son élément parent qui est "divFilters"
const filterTous = document.createElement("a")
filterTous.classList.add("filter-active", "filter")
filterTous.innerText = "Tous"
divFilters.appendChild(filterTous)




//récupération des catégories avec fetch et conversion de la réponse obtenue en JSON à l'aide de res.json. Traitement des données avec .then , création d'une variable data où sont stocké les catégories récupérés. La liste des catégories est parcouru, à chaque itération de la boucle une balise <a> est créer, et un nom de catégorie est ajouté à chaque boucle. Ensuite une class "filter" y est aussi ajouté. Avec le setAttribute, "data-id" est attribuer à chaque balise et la valeur de la propriété 'id' de l'objet 'category' est insérer dans la chaîne de caractére entre crochet. Ensuite les éléments "filterElement" sont ajouté dans son parent qui est "divFilters". enfin divFilters est ajouté avant divGallery à l'intérieur de sectionPortfolio.
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



//sélection de tous les élements "a" à l'intérieur de la Div ayant la class "filters". et stockage dans variable filterElments, boucle for each créer pour que à chaque élemnet <a> il ajoute un écouteur d'événements de clic avec filterElement.addEventListener("click", ...). à chaque fois que l'un de ces éléments est cliqué, une fonction est exécutée qui est de rechercher un élément ayant la classe "filter-active" dans le document avec document.querySelector(".filter-active"). S'il en trouve un, il supprime la classe "filter-active" de cet élément en utilisant .classList.remove("filter-active"). L'opérateur ?. est utilisé pour s'assurer que si aucun élément n'est trouvé, le code ne générera pas d'erreur. Ensuite, il ajoute la classe "filter-active" à l'élément <a> qui a été cliqué (filterElement.classList.add("filter-active")), le marquant ainsi comme actif. Ensuite selectionne tous les élements figure se trouvrant dans la section "portfolio" et les stocks dans un variable "works". Pour chaque élément <figure> dans works, il modifie son style d'affichage en "block". Ensuite, il vérifie si l'élément <a> cliqué a un attribut "data-id" et si l'attribut "data-id" de l'élément <figure> ne correspond pas à l'attribut "data-id" de l'élément <a> cliqué. Si cette condition est vraie, il modifie le style d'affichage de l'élément <figure> en "none", le masquant ainsi. En résumé, ce code crée un système de filtres interactif où cliquer sur un élément <a> permet de filtrer les éléments <figure> en fonction de leurs attributs "data-id". Lorsqu'un filtre est sélectionné, les autres filtres sont désactivés, et seuls les éléments correspondants au filtre sélectionné sont affichés.
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


//sélection de l'élément HTML avec la classe "login-button" et stockage dans la variable "loginButton", ajout à cette élément la class "clickable". selection du header et body et stockage dans la variable "header" et "body". récupèration de la valeur associée à la clé "token" dans le stockage local du navigateur et stockage dans la variable "tokenValue". Si un jeton est présent, on change le texte de l'élément loginButton pour afficher "logout". écouteur d'événements de clic à l'élément loginButton. Lorsque cet élément est cliqué, la fonction fléchée est exécutée. les données stockées dans le stockage local du navigateur sont effacés, recharge de la page actuelle.peut être utilisé pour réinitialiser la page après avoir effectué une action comme la déconnexion. change le style CSS de l'élément avec l'ID "divFilters" pour le cacher (display: none). On crée un nouvel élément <div> (barreEdition) qui contient un texte (editionText) et une icône (iconEdition). On ajoute des classes à cet élément pour le styliser. insère cet élément barreEdition avant l'élément header dans le body.crée un lien <a> (boutonModifier) avec un texte et une icône. On ajoute des classes pour le styliser.crée un nouvel élément <div> (divTitre) qui contient le titre de la section "Mes Projets" (TitreMesProjets) et le bouton boutonModifier. On ajoute des classes pour le styliser.insère cet élément divTitre avant l'élément divGallery dans la section sectionPortfolio.

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
    
        //création barre edition
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

        //création du bouton 'modifier'
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


