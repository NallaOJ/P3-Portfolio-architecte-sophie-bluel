

//créaton du modal 
const modalFormulaire = document.createElement("div")
modalFormulaire.classList.add("modal")

//création de la box contenant le header, h3, photos et texte ajout photo 
const modalFormulaireBox = document.createElement("div")
modalFormulaireBox.classList.add("modal-box")

//création du header à l'intérieur de la box
const modalFormulaireHeader = document.createElement("div")
modalFormulaireHeader.classList.add("modal-header")
const crossFormulaire = document.createElement("i")
crossFormulaire.classList.add("fa-solid", "fa-xmark", "fa-xl", "clickable")
const retour = document.createElement("i")
retour.classList.add("fa-solid", "fa-arrow-left", "fa-xl", "clickable")

modalFormulaireHeader.appendChild(crossFormulaire)
modalFormulaireHeader.appendChild(retour)
modalFormulaireHeader.insertBefore(retour, crossFormulaire)




const modalFormulaireTitre = document.createElement("h3")
modalFormulaireTitre.innerText = "Ajout photo"


const form = document.createElement("form")

const photoUpload = document.createElement("input")
photoUpload.setAttribute("type", "file")
photoUpload.setAttribute("accept", "image/jpeg")
photoUpload.setAttribute("accept", "image/png")
photoUpload.style.display = "none"


const divPhoto = document.createElement("div")
divPhoto.classList.add("div-photo", "clickable")
const photoIcon = document.createElement("i")
photoIcon.classList.add("fa-regular", "fa-image", "fa-6x")
const photoButton = document.createElement("a")
photoButton.innerText = "+ Ajouter photo"
const photoInfo = document.createElement("p")
photoInfo.innerText = "jpg, png : 4mo max"
divPhoto.appendChild(photoIcon)
divPhoto.appendChild(photoButton)
divPhoto.appendChild(photoInfo)


const labelTitre = document.createElement("label")
labelTitre.setAttribute("for", "titre")
labelTitre.innerText = "Titre"
const titre = document.createElement("input")
titre.setAttribute("type", "text")
titre.setAttribute("name", "titre")
titre.setAttribute("id", "titre")


const labelCat = document.createElement("label")
labelCat.setAttribute("for", "categorie")
labelCat.innerText = "Catégorie"
const cat = document.createElement("select")
cat.setAttribute("name", "categorie")
cat.setAttribute("id", "categorie")


const optionVide = document.createElement("option")
cat.appendChild(optionVide)
fetch("http://localhost:5678/api/categories").then(res => {
    return res.json()
})
.then(data => { const categories = data
    categories.forEach(category => {
        const optionCategory = document.createElement("option")
        optionCategory.innerText = category.name
        optionCategory.setAttribute("value", `${category.name}`)
        optionCategory.setAttribute("data-id", `${category.id}`)
        cat.appendChild(optionCategory)
    })
})


form.appendChild(divPhoto)
form.appendChild(photoUpload)
form.appendChild(labelTitre)
form.appendChild(titre)
form.appendChild(labelCat)
form.appendChild(cat)

//changerment de couleur bouton Valider
labelTitre.addEventListener("input", () => {
    if(labelTitre.value.trim() !== "") { // Vérifie si le champ labelTitre n'est pas vide
        boutonValider.classList.remove("disabled");
        boutonValider.classList.add("clickable", "green"); // Ajoute la classe "green" pour changer la couleur en vert
        boutonValider.removeAttribute("disabled");
    } else {
        boutonValider.classList.add("disabled");
        boutonValider.classList.remove("clickable", "green"); // Supprime la classe "green" pour revenir à la couleur initiale
        boutonValider.setAttribute("disabled", "disabled");
    }
});



const divFormulaireLine = document.createElement("div")
divFormulaireLine.classList.add("line")


const boutonValider = document.createElement("a")
boutonValider.innerText = "Valider"
boutonValider.setAttribute("disabled", "disabled")
boutonValider.classList.add("modal-button", "disabled")


modalFormulaireBox.appendChild(modalFormulaireHeader)
modalFormulaireBox.appendChild(modalFormulaireTitre)
modalFormulaireBox.appendChild(form)
modalFormulaireBox.appendChild(divFormulaireLine)
modalFormulaireBox.appendChild(boutonValider)
modalFormulaire.appendChild(modalFormulaireBox)


body.insertBefore(modalFormulaire, modal)


divPhoto.addEventListener("click", () => {
    photoUpload.click()
})


const preview = document.createElement("img")

//changement d'image dans la section 'ajout de photo'
photoUpload.addEventListener("change", () => {
    let source = ""
    source = window.URL.createObjectURL(photoUpload.files[0])
    preview.src = source
    preview.classList.add("preview")

    photoIcon.style.display = "none"
    photoButton.style.display = "none"
    photoInfo.style.display = "none"

    preview.style.maxWidth = "100%";
    preview.style.maxHeight = "100%";

    divPhoto.appendChild(preview)
})


//open modal Ajout de photo
boutonAjouter.addEventListener("click", () => {
    modalFormulaire.style.display = "block"
    modal.style.display = "none"
})


modalFormulaire.addEventListener("click", (event) => {
    if(event.target === modalFormulaire) {
        modalFormulaire.style.display = "none"
    }
})


crossFormulaire.addEventListener("click", () => {
    modalFormulaire.style.display = "none"
})


retour.addEventListener("click", () => {
    modalFormulaire.style.display = "none"
    modal.style.display = "block"
})




form.addEventListener("change", () => {
    const photoValue = window.URL.createObjectURL(photoUpload.files[0])
    const titreValue = titre.value
    const catValue = cat.value
    if(photoValue !== "" && titreValue !== "" && catValue !== "") {
        boutonValider.classList.remove("disabled")
        boutonValider.classList.add("clickable")
        boutonValider.removeAttribute("disabled")
    } else {
        boutonValider.classList.add("disabled")
        boutonValider.classList.remove("clickable")
        boutonValider.setAttribute("disabled", "disabled")
    }
})


boutonValider.addEventListener("click", () => {
    const token = localStorage.getItem("token")
   
    let data = new FormData()
    data.append("image", photoUpload.files[0])
    data.append("title", titre.value)
    data.append("category", parseInt(cat.selectedOptions[0].getAttribute("data-id")))
    
    console.log(data)

    fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: { "Authorization" : `Bearer ${token}` },
                body: data,
            })
            .then(res => {
                if(res.status === 201) {
                    const divImage = document.createElement("div")
                    divImage.classList.add("div-image")

                    const img = document.createElement("img")
                    img.src = window.URL.createObjectURL(photoUpload.files[0])
                    
                    const iconPoubelle = document.createElement("i")
                    iconPoubelle.classList.add("fa-solid", "fa fa-trash", "clickable")

                   
                    divImage.appendChild(img)
                    divGalleryMod.appendChild(divImage)
                    divImage.appendChild(iconPoubelle)
                    

                    

                    const figure = document.createElement("figure")
                    const imgGallery = document.createElement("img")
                    imgGallery.src = window.URL.createObjectURL(photoUpload.files[0])
                    const caption = document.createElement("figcaption")
                    caption.innerText = titre.value

                    figure.appendChild(imgGallery)
                    figure.appendChild(caption)

                    divGallery.appendChild(figure)

                    modalFormulaire.style.display = "none"
                    modal.style.display = "block"
                    
                } else {
                    // La requête a échoué, afficher un message d'erreur par exemple
                    throw new Error("Erreur lors de l'envoi du formulaire.");
                }
            })
            .catch(error => {
                // Gestion des erreurs survenues lors de l'envoi de la requête
                console.error("Erreur :", error);
                // Afficher un message d'erreur à l'utilisateur, par exemple
            });
        });

        

