//récupération du formulaire de connexion 'form' et de la section 'login' dans lequel il se trouve dans login.html
const formLogin = document.querySelector("#login form")
const sectionLogin = document.querySelector("#login")

//action requise à l'appuie du bouton 'submit' 
formLogin.addEventListener("submit", async (event) => {
    event.preventDefault() //empéche la page de se recharger par défaut

    const userLogin = { //extrait les valeurs de email et password via event.target et les stock dans useerLogin
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    }                        
    const userBodyValue = JSON.stringify(userLogin)//convertit l'objet 'userLogin' en JSON
    fetch("http://localhost:5678/api/users/login", {//utilise l'API fetch pour effectuer une requête POST à l'url
        method: "POST", //indique la méthode utilisé(POST)
        headers: { "Content-Type": "application/json" }, //spécifie que le corps de la requête est au format JSON
        body: userBodyValue, //corps de la requête contenant les infos de connexion convertit en JSON à partir de 'userLogin'
    })
    .then(res => {//traite la réponse de la requête.res représente la réponse
        if(res.status === 200) {//200 correspond au code de statut HTTP
            return res.json()//reoutrne la réponse en JSON
        } else {
            throw new Error("Erreur dans l'identifiant ou le mot de passe")
            }
    })
    .then(data => {//traite les données(data) obtenues à partir de la promsse précédente
        console.log(data.token)//affiche le jeton(token) extrait des données JSON
        localStorage.setItem("token", data.token)//stock le jeton dans localStorage.permet de conserver le jeton entre les sessions et de l'utiliser ultérieurement pour authentifier les requêtes vers le serveur.
        location.href="../Frontend/index.html"//redirige l'utilisateur vers une autre page aprés connexion réussie
    })
    .catch(error => {//fonction appelée si erreur survenue dans la chaîne de promesse
        afficherMessageErreur(error.message)
    })
})



function afficherMessageErreur(message) {//fonction avec en paramétre 'message'
    const divErreur = document.createElement("div")//crée une div dans le DOM qui sera utilisé pour contenir le message d'erreur.
    divErreur.classList.add("erreur")//ajoute la class 'div' à divErreur
    const messageErreurElement = document.createElement("p")//crée un élément 'p' dans le DOM qui sera utilisé pour afficher le texte du message d'erreur.
    messageErreurElement.innerText = message//définit le contenu textuel de l'élément p avec le message d'erreur passé en paramètre à la fonction

    divErreur.appendChild(messageErreurElement)//insére 'messageErreurElement dans 'divErreur'
    sectionLogin.insertBefore(divErreur, formLogin)//insére 'divErreur' avant 'formLogin' dans sectionLogin
}












