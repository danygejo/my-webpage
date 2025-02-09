document.addEventListener('DOMContentLoaded', function() {
    const bibleVerseContent = document.getElementById('bible-verse-content');
    const reflectionContent = document.getElementById('reflection-content');
    const readingLevelSelect = document.getElementById('reading-level-select');

    function loadContent(level = 'easy') {
        console.log('Fetching daily.json from daily.json'); // Debugging step
        fetch('daily.json') // Updated path to the same folder
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data loaded:', data); // Debugging step
                bibleVerseContent.textContent = data.bible_verse["Proverbs 16:3"];
                reflectionContent.textContent = data.content[level].join(" ");
            })
            .catch(error => {
                console.error('Error loading daily content:', error);
                alert('Error loading daily content: ' + error.message); // Alert for visibility
            });
    }

    readingLevelSelect.addEventListener('change', function() {
        const selectedLevel = readingLevelSelect.value;
        loadContent(selectedLevel);
    });

    loadContent(); // Load content on page load with default level
});
