const url = "http://localhost:5678/api/works/";
const container = document.getElementById("gallery")

const  getProjets = () => {
    fetch(url)
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        console.log(data)
    })
}


getProjets()