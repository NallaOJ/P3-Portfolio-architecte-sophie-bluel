// Exemple de données (remplacez cela par la récupération réelle des données depuis votre backend)
const travaux = [
    { titre: "Abajour Tahina", image: "assets/images/abajour-tahina.png" },
    { titre: "Appartement Paris V", image: "assets/images/appartement-paris-v.png" },
    { titre: "Restaurant Sushisen - Londres", image: "assets/images/restaurant-sushisen-londres.png" },
    { titre: "Villa “La Balisiere” - Port Louis", image: "assets/images/la-balisiere.png" },
    { titre: "Structures Thermopolis", image: "assets/images/structures-thermopolis.png" },
    { titre: "Appartement Paris X", image: "assets/images/appartement-paris-x.png" },
    { titre: "Pavillon “Le coteau” - Cassis", image: "assets/images/le-coteau-cassis.png" },
    { titre: "Villa Ferneze - Isola d’Elba", image: "assets/images/villa-ferneze.png" },
    { titre: "Appartement Paris XVIII", image: "assets/images/appartement-paris-xviii.png" },
    { titre: "Bar “Lullaby” - Paris", image: "assets/images/bar-lullaby-paris.png" },
    { titre: "Hotel First Arte - New Delhi", image: "assets/images/hotel-first-arte-new-delhi.png" },
];

// Sélectionnez la galerie par son identifiant
const gallery = document.getElementById("gallery");

// Parcourez la liste des travaux et créez des éléments HTML pour les afficher
travaux.forEach((travail) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    image.src = travail.image;
    image.alt = travail.titre;
    figcaption.textContent = travail.titre;

    figure.appendChild(image);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
});

function fetchProjects() {
    fetch('http://localhost:5678/api-docs/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau ou serveur');
            }
            return response.json();
        })
        .then(data => {
            // Traitez les données ici
            displayProjects(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des projets:', error);
        });
}