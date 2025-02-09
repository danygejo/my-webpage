function searchArticles(keyword) {
    fetch('../data/articles.json')
        .then(response => response.json())
        .then(data => {
            const results = data.filter(article => 
                article.title.toLowerCase().includes(keyword.toLowerCase()) || 
                article.content.toLowerCase().includes(keyword.toLowerCase())
            );
            displaySearchResults(results);
        })
        .catch(error => console.error('Error fetching articles:', error));
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
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.excerpt}</p>
            <a href="articles.html?id=${article.id}">Read more</a>
        `;
        resultsContainer.appendChild(articleElement);
    });
}

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const keyword = document.getElementById('search-input').value;
    searchArticles(keyword);
});