const url = "http://localhost:5678/api/users/login";

let loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    getConnect();
  });

const  getConnect = () => {
    let user = {
        email : document.getElementById("email").value,
        passeword : document.getElementById("passeword").value,
        }
    fetch(url, {
        method:"Post", 
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(users)
    })
    .then(function (res) {
        return res.json()
    })

}