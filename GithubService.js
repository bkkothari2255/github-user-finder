class GithubService {
    constructor() {
        this.baseUrl = "https://api.github.com/users/";
    }

    async getUser(username) {
        try {
            const response = await fetch(this.baseUrl + username);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Service Error:", error);
            throw error;
        }
    }
}