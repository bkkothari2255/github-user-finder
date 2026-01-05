class GithubService {
    constructor() {
        this.baseUrl = "https://api.github.com/users/";
        this.javaUrl = "http://localhost:8080/api/developers";
    }

    async getUser(username) {
        try {
            const response = await fetch(this.baseUrl + username);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("GitHub API Error:", error);
            throw error;
        }
    }

    async saveDeveloper(userProfile) {
        const payload = {
            githubUsername: userProfile.login,
            name: userProfile.name,
            avatarUrl: userProfile.avatarUrl,
            isFavorite: true,
            privateNote: "Saved from Frontend" 
        };

        try {
            const response = await fetch(this.javaUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            return await response.json();
        } catch (error) {
            console.error("Java Backend Error:", error);
        }
    }
}