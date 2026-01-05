const username = document.querySelector("#username");
const button = document.querySelector("#search-btn");
const profile = document.querySelector("#profile");

async function fetchUser(user) {
   try{
        const response = await fetch(`https://api.github.com/users/${user}`);
        const data = await response.json();
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
   }
   catch(error){
        console.error("Error fetching user data:", error);
   }
}

button.addEventListener("click", () => {
    const user = username.value.trim();
    if(user) {
        fetchUser(user);
    }
});

username.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        button.click(); 
    }
});

const savedUser = localStorage.getItem("last_github_user");

if (savedUser) {
    fetchUser(savedUser);
    username.value = savedUser;
}