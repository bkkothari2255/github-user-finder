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
            <br><br>
            <button id="save-btn" style="background: #28a745;">Save to Favorites 💾</button>
            `;

            document.querySelector("#save-btn").addEventListener("click", async () => {
        
                const btn = document.querySelector("#save-btn");
                btn.textContent = "Saving...";
        
                await service.saveDeveloper({
                    login: data.login,
                    name: data.name,
                    avatarUrl: data.avatar_url
            });

            btn.textContent = "Saved! ✅";
            btn.disabled = true;
        });
        
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

async function loadFavorites() {
    const list = document.querySelector("#favorites-list");
    list.innerHTML = "Loading...";

    try {
        const response = await fetch("http://localhost:8080/api/developers");
        const developers = await response.json();

        list.innerHTML = "";

        developers.forEach(dev => {
            const card = document.createElement("div");
            card.style = "border: 1px solid #ddd; padding: 10px; border-radius: 8px; width: 150px; text-align: center; background: white;";
            
            card.innerHTML = `
                <img src="${dev.avatarUrl}" style="width: 50px; height: 50px; border-radius: 50%;">
                <p><strong>${dev.name || dev.githubUsername}</strong></p>
                <small>${dev.privateNote}</small>
            `;
            list.appendChild(card);
        });

    } catch (error) {
        console.error("Failed to load favorites:", error);
        list.innerHTML = "Backend not running.";
    }
}

loadFavorites();
