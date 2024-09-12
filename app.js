const url = "https://api.github.com/users/"
const body = document.querySelector("body")
const input = document.querySelector("input")

async function getdata(username) {
    const res = await fetch(url+ username)
    const data =await res.json()
    console.log(data);
    const box = `
    <h1>Github Profile App</h1>
    <div class="box">
  <input type="text" placeholder="Search a github user here">
        <div class="info">
            <img src= "${data.avatar_url}" alt="">
            <div class="data">
                <h3>${data.name}</h3>
                <p>${data.bio}</p>
                <div class="reach">
                   <div>
                     <span>${data.followers}</span><span>Followers</span>
                   </div>
                   <div>
                        <span>${data.following}</span><span>Following</span>
                    </div>
                   <div>
                    <span>${data.public_repos}</span><span>Repo</span>
                  </div>
                  </div>
                <div class="repos">
                    
                </div>
            </div>
        </div>
        </div>
`
body.innerHTML = box
getRepos(username)
}

async function getRepos(username) {
    const res = await fetch(url+ username+"/repos")
    const data = await res.json();
    data.forEach((item) => {
        const repo = document.createElement("a")
        repo.classList.add("repo");
        repo.innerHTML = item.name;
        repo.href = item.url;
        repo.target = "_blank"
        document.querySelector(".repos").appendChild(repo)   
    })
}
 
function formSubmit() {
    if(input.value != "") {
        getdata(input.value)
         input.value = ""
    }
    return false;
}
   
input.addEventListener("focusout",async () => {
   await location.reload();
    formSubmit();
})



                    // <a href="/" class="repo">repo 1</a>
                    // <a href="/" class="repo">repo 1</a>
                    // <a href="/" class="repo">repo 1</a>
