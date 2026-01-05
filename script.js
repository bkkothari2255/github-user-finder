const service = new GithubService();

const username = document.querySelector("#username");
const button = document.querySelector("#search-btn");
const profile = document.querySelector("#profile");


async function handleSearch(user) {
    if(!user) return;
    profile.innerHTML = "<p>Loading...</p>";

    try{
        const data = await service.getUser(user);
    

        if (data.message === "Not Found") {
            profile.innerHTML = `<p class="error">User not found!</p>`;
            return;
        }
    
        localStorage.setItem("last_github_user", user);

        profile.innerHTML = `
            <img src="${data.avatar_url}" alt="Avatar" class="avatar">
            <h3>${data.name || data.login}</h3> 
            <p>${data.bio || "No bio available."}</p>
            <a href="${data.html_url}" target="_blank">View Profile</a>
            `;

        username.value = "";
    } catch(error) {
        profile.innerHTML = `<p class="error">Something went wrong. Check console.</p>`;
        return;
    }
}

button.addEventListener("click", () => {
    const user = username.value.trim();
    if(user) {
        handleSearch(user);
    }
});

username.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        button.click(); 
    }
});

const savedUser = localStorage.getItem("last_github_user");

if (savedUser) {
   handleSearch(savedUser);
}