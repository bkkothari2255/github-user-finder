# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [1.2.0] - 2026-01-06
### Added
- **Backend Integration**: Connected to a local Java backend (`http://localhost:8080`) to persist favorite developers.
- **Favorites System**: Users can now "Save" a searched developer and view a list of saved favorites.
- **Styling**: Created `style.css` and migrated all inline styles to it for better separation of concerns.
- **UI Improvements**: Enhanced card designs, buttons with hover effects, and a responsive grid layout for favorites.


## [1.1.0] - 2026-01-06
### Added
- **Persistence**: Application now saves the last searched username in local storage and restores it on reload.
- **Loading State**: Visual indication ("Loading...") while fetching user data.

### Changed
- **Refactor**: Extracted GitHub API logic into a separate `GithubService` class for better code organization and maintainability.
- **Error Handling**: Improved error catching and display messages.


## [1.0.0] - 2026-01-04
### Added
- Initial project structure.
- `index.html`: Main user interface with a search input and profile display area.
- `script.js`: Logic to fetch GitHub user data using the GitHub API.
- Basic CSS styling for a clean, centered card layout.
- Features implemented:
    - Search for GitHub users by username.
    - Display user avatar, name, bio, and profile link.
    - "User not found" error handling.
    - Enter key support for submitting search.
