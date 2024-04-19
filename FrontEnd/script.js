let list

//récupération du projet
async function fetchWorks() {
    const getProjet = await fetch("http://localhost:5678/api/works")
    list = await getProjet.json()
    console.log(getProjet)
    return list
} ;


//apel à la fonction fetWorks et ensuite afficherElements
fetchWorks().then(list => {
     afficherElements(list)
 });


//fonction créer pour afficher les éléments récupérer à l'intérieur du projet
function afficherElements(list) {
     for(let i = 0; i < list.length; i++) {
         const projet = list[i]
         const divGallery = document.querySelector(".gallery")
         const figure = document.createElement("figure")
         const img = document.createElement("img")
         img.src = projet.imageUrl
         
 
         const caption = document.createElement("figcaption")
         caption.innerText = projet.title
         
 
         figure.setAttribute("data-id", `${projet.categoryId}`)
         figure.setAttribute("data-projetid", `${projet.id}`)
 
         figure.appendChild(img)
         figure.appendChild(caption)
 
         divGallery.appendChild(figure)
     }
     console.log(list)
 };
