// This file handles dynamic content loading, search functionality, and local storage management for "Read Later/Favorites" feature.

document.addEventListener('DOMContentLoaded', () => {
    loadDailyContent();
    setupSearch();
    setupFavorites();
});

function loadDailyContent() {
    fetch('../data/daily.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('daily-verse').innerText = data.verse;
            document.getElementById('featured-article').innerText = data.featuredArticle;
        })
        .catch(error => console.error('Error loading daily content:', error));
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        searchArticles(query);
    });
}

function searchArticles(query) {
    fetch('../data/articles.json')
        .then(response => response.json())
        .then(articles => {
            const results = articles.filter(article => 
                article.title.toLowerCase().includes(query) || 
                article.content.toLowerCase().includes(query)
            );
            displaySearchResults(results);
        })
        .catch(error => console.error('Error searching articles:', error));
}

function displaySearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No articles found.</p>';
        return;
    }

    results.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');
        articleElement.innerHTML = `<h3>${article.title}</h3><p>${article.content}</p>`;
        resultsContainer.appendChild(articleElement);
    });
}

function setupFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesButton = document.getElementById('favorites-button');

    favoritesButton.addEventListener('click', () => {
        const currentArticleId = getCurrentArticleId();
        if (favorites.includes(currentArticleId)) {
            favorites.splice(favorites.indexOf(currentArticleId), 1);
            alert('Removed from favorites');
        } else {
            favorites.push(currentArticleId);
            alert('Added to favorites');
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    });
}

function getCurrentArticleId() {
    // Logic to get the current article ID from the page context
    return document.getElementById('current-article-id').value;
}