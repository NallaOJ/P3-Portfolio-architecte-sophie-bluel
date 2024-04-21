const divGalleryMod = document.createElement("div")
divGalleryMod.classList.add("gallery-mod")

function afficherGallery(list) {
    for(let i = 0; i < list.length; i++) {
        const projet = list[i]
        
        const divImage = document.createElement("div")
        divImage.classList.add("div-image")
        divImage.setAttribute("data-id", `${projet.id}`)

        const img = document.createElement("img")
        img.src = projet.imageUrl
        
        const iconPoubelle = document.createElement("i")
        iconPoubelle.classList.add("fa-solid", "fa-trash-can", "clickable")
        iconPoubelle.setAttribute("data-id", `${projet.id}`)

        divImage.appendChild(img)
        divGalleryMod.appendChild(divImage)
        divImage.appendChild(iconPoubelle)
        modalBox.insertBefore(divGalleryMod, divLine)
    }
}

const modal = document.createElement("div")
modal.classList.add("modal")

const modalBox = document.createElement("div")
modalBox.classList.add("modal-box")

const modalHeader = document.createElement("div")
modalHeader.classList.add("modal-header")
const cross = document.createElement("i")
cross.classList.add("fa-solid", "fa-xmark", "fa-xl", "clickable")
modalHeader.appendChild(cross)

const modalTitre = document.createElement("h3")
modalTitre.innerText = "Galerie photo"

const divLine = document.createElement("hr")
divLine.classList.add("line")

const boutonAjouter = document.createElement("a")
boutonAjouter.innerText = "Ajouter une photo"
boutonAjouter.classList.add("modal-button", "clickable")


fetch("http://localhost:5678/api/works").then(res => {
    return res.json()
})
.then(list => {
    afficherGallery(list)
})


modalBox.appendChild(modalHeader)
modalBox.appendChild(modalTitre)
modalBox.appendChild(divLine)
modalBox.appendChild(boutonAjouter)
modal.appendChild(modalBox)

const barreEdition = document.querySelector(".barre-edition")
body.insertBefore(modal, barreEdition)

const overlay = document.createElement("div");
overlay.classList.add("overlay");
document.body.appendChild(overlay);

overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
        modal.style.display = "none";
        overlay.style.display = "none";
    }
});

const boutonModifier = document.querySelector(".modifier")
boutonModifier.addEventListener("click", () =>{
    modal.style.display = "block"
    overlay.style.display = "block";

    const listIcons = document.querySelectorAll(".div-image i")
    listIcons.forEach(icon => {
        icon.addEventListener("click", (event) => {

            event.preventDefault()
            const imgSupprime = document.querySelector(`div[data-id="${event.target.dataset.id}"]`)
            const token = localStorage.getItem("token")
           
            fetch(`http://localhost:5678/api/works/${event.target.dataset.id}`, {
                method: "DELETE",
                headers: { "Authorization" : `Bearer ${token}` },
            })
            .then(res => {
                if(res.status === 204) {
                    imgSupprime.style.display = "none"
                    let imgSupprimeGallery = document.querySelector(`figure[data-projetid="${imgSupprime.dataset.id}"]`)
                    imgSupprimeGallery.style.display = "none"
                }
            })
        })
})
})

modal.addEventListener("click", (event) => {
    if(event.target === modal) {
        modal.style.display = "none"
    }
})

cross.addEventListener("click", () => {
    modal.style.display = "none"
    overlay.style.display = "none"
})