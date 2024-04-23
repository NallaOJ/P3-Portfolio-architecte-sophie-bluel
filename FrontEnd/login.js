const formLogin = document.querySelector("#login form")
const sectionLogin = document.querySelector("#login")


formLogin.addEventListener("submit", async (event) => {
    event.preventDefault() 

    const userLogin = { 
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    }                        
    const userBodyValue = JSON.stringify(userLogin)
    fetch("http://localhost:5678/api/users/login", {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: userBodyValue, 
    })
    .then(res => {
        if(res.status === 200) {
            return res.json()
        } else {
            throw new Error("Erreur dans l'identifiant ou le mot de passe")
            }
    })
    .then(data => {
        console.log(data.token)
        localStorage.setItem("token", data.token)
        location.href="../Frontend/index.html"
    })
    .catch(error => {
        afficherMessageErreur(error.message)
    })
})


function afficherMessageErreur(message) {
    const divErreur = document.createElement("div")
    divErreur.classList.add("erreur")
    const messageErreurElement = document.createElement("p")
    messageErreurElement.innerText = message

    divErreur.appendChild(messageErreurElement)
    sectionLogin.insertBefore(divErreur, formLogin)
}












