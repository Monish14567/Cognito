document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const sideMenu = document.getElementById('side-menu');
    const menuOptions = document.querySelectorAll('.menu-option');
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.getElementById('search-input');
    const searchContainer = document.querySelector('.search-container'); 
    const sec = document.querySelectorAll('.sec');

    menuIcon.addEventListener('click', function() {
        sideMenu.classList.toggle('show');
        document.getElementById('mainContent').classList.toggle('shifted');
    });

    searchIcon.addEventListener('click', function() {
        searchInput.classList.toggle('show');
        if (searchInput.classList.contains('show')) {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            const query = searchInput.value.trim().toLowerCase();
            if (query) {
                searchDocuments(query); 
            }
            searchInput.value = ''; 
            searchInput.classList.remove('show');
            sideMenu.classList.remove('show'); 
            document.getElementById('mainContent').classList.remove('shifted');
        }
    });

    document.addEventListener('click', function(event) {
        if (!searchContainer.contains(event.target) && (searchInput.classList.contains('show'))) {
            searchInput.value = ''; 
            searchInput.classList.remove('show');
            sideMenu.classList.remove('show');
            document.getElementById('mainContent').classList.remove('shifted');
        }
    });

    menuOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            event.preventDefault();
            sideMenu.classList.remove('show');
            document.getElementById('mainContent').classList.remove('shifted');

            const targetId = option.getAttribute('href').substring(1);
            sec.forEach(sec => {
                sec.classList.remove('show2');
            });

            document.getElementById(targetId).classList.add('show2');
        });
    });

    // Data for documents
    const documents = [
        { section: 'science', name: 'Science Doc 1', src: 'Documents/Indian Origins of the Pythagorean Theorem-1.pdf' },
        { section: 'technology', name: 'Technology Doc 1', src: 'Documents/TechDoc.pdf' },
        { section: 'social-science', name: 'Social Sciences Doc 1', src: 'Documents/SocialScienceDoc.pdf' },
        { section: 'geopolitics', name: 'Geopolitics Doc 1', src: 'Documents/GeoPoliticsDoc.pdf' },
        { section: 'math', name: 'Mathematics Doc 1', src: 'Documents/MathDoc.pdf' }
    ];

    // Function to generate HTML content
    function generateContent() {
        documents.forEach(doc => {
            const section = document.getElementById(doc.section);
            const gridDiv = section.querySelector('.grid');

            const gridItemDiv = document.createElement('div');
            gridItemDiv.classList.add('grid-item');

            const documentDiv = document.createElement('div');
            documentDiv.classList.add('document');
            documentDiv.id = 'document';

            const iframe = document.createElement('iframe');
            iframe.src = `${doc.src}#page=1&zoom=Fit&view=FitH&scrollbar=0&toolbar=0&navpanes=0`;
            iframe.frameBorder = '0';
            documentDiv.appendChild(iframe);

            const docNameDiv = document.createElement('div');
            docNameDiv.classList.add('doc-name');
            docNameDiv.textContent = doc.name;

            gridItemDiv.appendChild(documentDiv);
            gridItemDiv.appendChild(docNameDiv);

            // Adding click event to open document in fullscreen
            gridItemDiv.addEventListener('click', () => openFullscreen(doc.src));

            gridDiv.appendChild(gridItemDiv);
        });
    }

    function openFullscreen(src) {
        const fullscreenDiv = document.getElementById('fullscreen');
        const fullscreenIframe = document.getElementById('fullscreenIframe');

        fullscreenIframe.src = `${src}#page=1&zoom=Fit&view=FitH&scrollbar=0&toolbar=0&navpanes=0`;
        fullscreenDiv.style.display = 'block';
    }

    document.getElementById('backButton').addEventListener('click', () => {
        const fullscreenDiv = document.getElementById('fullscreen');
        fullscreenDiv.style.display = 'none';
    });

    // Function to search documents
    function searchDocuments(query) {
        const foundDoc = documents.find(doc => doc.name.toLowerCase().includes(query));
        if (foundDoc) {
            const targetSection = document.getElementById(foundDoc.section);
            sec.forEach(sec => {
                sec.classList.remove('show2');
            });
            targetSection.classList.add('show2');

            // Scroll to the found document within the section
            const targetDoc = Array.from(targetSection.querySelectorAll('.grid-item')).find(item =>
                item.querySelector('.doc-name').textContent.toLowerCase().includes(query)
            );

            if (targetDoc) {
                targetDoc.scrollIntoView({ behavior: 'smooth' });
                targetDoc.classList.add('highlight'); // Add highlight class
                setTimeout(() => {
                    targetDoc.classList.remove('highlight'); // Remove highlight class after a while
                }, 2000);
            }
        }
    }

    // Call the function to generate content on page load
    generateContent();
});
