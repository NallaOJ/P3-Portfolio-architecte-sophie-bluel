
const divGalleryMod = document.createElement("div")
divGalleryMod.classList.add("gallery-mod")

function afficherGallery(list) {
    divGalleryMod.innerHTML = "";
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
    }
    modalBox.insertBefore(divGalleryMod, divLine)
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



//open modal au click bouton Modifier
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("modifier")) {
        modal.style.display = "block";
        overlay.style.display = "block";
    }
});

//fermeture 1ère modal 
const closeModal = () => {
    modal.style.display = "none";
    overlay.style.display = "none";
};

cross.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);


body.addEventListener("click", event => {
    const isModalClicked = modalBox.contains(event.target);
    if (!isModalClicked) {
      closeModal();
    }
  });


modalFormulaireHeader.appendChild(crossFormulaire)

        
    const listIcons = document.querySelectorAll(".div-image i");

listIcons.forEach(icon => {
    icon.addEventListener("click", async event => {
        event.preventDefault();
        const imgSupprime = document.querySelector(`div[data-id="${event.target.dataset.id}"]`);
        const token = localStorage.getItem("token");
        await supprimerImage(event.target.dataset.id, token);
    });
});

async function supprimerImage(id, token) {
    try {
        const res = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
        });
        if (res.status === 204) {
            const imgSupprime = document.querySelector(`div[data-id="${id}"]`);
            imgSupprime.style.display = "none";
            const imgSupprimeGallery = document.querySelector(`figure[data-projetid="${id}"]`);
            imgSupprimeGallery.style.display = "none";
        } else {
            console.error("Erreur d'API :", res.status, res.statusText);
        }
    } catch (error) {
        // Gérer les erreurs réseau ou autres problèmes inattendus
        console.error("Erreur Fetch :", error);
    }
}

        
  



//fermeture 1ère modal 
/*const closeModal = () => {
    modal.style.display = "none";
    overlay.style.display = "none";
};*/

cross.addEventListener("click", closeModal);

body.addEventListener("click", (event) => {
    const isModalClicked = modal.contains(event.target);
    if (!isModalClicked) {
        closeModal();
    }
})



/*fetch(`http://localhost:5678/api/works/${event.target.dataset.id}`, {
	method: "DELETE",
	headers: { "Authorization" : `Bearer ${token}` }})*/