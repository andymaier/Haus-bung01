document.addEventListener('DOMContentLoaded', function() {
    const colorCircles = document.querySelectorAll('.color-circle');
    let selectedColor = localStorage.getItem('selectedColor');
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navigation = document.querySelector(".navigation");


    mobileMenuBtn.addEventListener("click", function() {
        navigation.classList.toggle("active"); // Fügt oder entfernt die Klasse "active" für das Popup-Menü
    });


    // Funktion zum Hinzufügen des 'active'-Klassenzeichens für die ausgewählte Farbe
    function addActiveClass(color) {
        color.classList.add('active');
    }

    // Funktion zum Entfernen des 'active'-Klassenzeichens von allen Farben
    function removeActiveClasses() {
        colorCircles.forEach(circle => {
            circle.classList.remove('active');
        });
    }

    // Funktion zum Setzen des Hintergrunds des Textes mit der ausgewählten Farbe
    function setBackground(color) {
        const text = document.querySelector('.full-width-text');
        text.style.backgroundColor = color;

        // Markiere jedes 5. Wort im Text mit der ausgewählten Farbe
        const words = text.textContent.split(' ');
        let highlightedText = '';
        let wordCount = 0;

        for (const word of words) {
            if (wordCount % 5 === 0) {
                highlightedText += `<span style="color: ${color};">${word}</span> `;
            } else {
                highlightedText += `${word} `;
            }

            wordCount++;
        }

        text.innerHTML = highlightedText;
    }

    // Click-Event für den "Highlight Text" Button
    const executeButton = document.getElementById('executeButton');
    executeButton.addEventListener('click', function() {
        if (selectedColor) {
            setBackground(selectedColor);
        } else {
            // Handle, wenn keine Farbe ausgewählt wurde
            console.error('Bitte wählen Sie zuerst eine Farbe aus.');
        }
    });

    // Wenn eine Farbe ausgewählt wird
    colorCircles.forEach(circle => {
        circle.addEventListener('click', function() {
            removeActiveClasses();
            addActiveClass(circle);
            selectedColor = circle.dataset.color;
            localStorage.setItem('selectedColor', selectedColor);
        });
    });

    // Wenn zuvor eine Farbe ausgewählt wurde, setze sie als aktiv und markiere den Text
    if (selectedColor) {
        const selectedCircle = [...colorCircles].find(circle => circle.dataset.color === selectedColor);
        if (selectedCircle) {
            addActiveClass(selectedCircle);
            setBackground(selectedColor); // Markiere den Text erneut beim Laden der Seite
        }
    }
});
