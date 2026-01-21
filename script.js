// --- Données Mockées (Simule la base de données) ---
const eventsData = [
    {
        id: 1,
        title: "Nettoyage Plage du Moulin Blanc",
        date: "Samedi 24 Juin",
        time: "14h00",
        location: "Brest",
        participants: 12,
        image: "🌊"
    },
    {
        id: 2,
        title: "Opération Port de Plouzané",
        date: "Dimanche 25 Juin",
        time: "09h30",
        location: "Plouzané",
        participants: 5,
        image: "⚓"
    },
    {
        id: 3,
        title: "Sentier Côtier Plougastel",
        date: "Mercredi 28 Juin",
        time: "15h00",
        location: "Plougastel-Daoulas",
        participants: 8,
        image: "🌿"
    },
    {
        id: 4,
        title: "Grand Ramassage Étudiant",
        date: "Jeudi 29 Juin",
        time: "17h00",
        location: "Brest - Château",
        participants: 45,
        image: "🏰"
    }
];

// --- Chargement des événements ---
const eventsContainer = document.getElementById('events-grid');

function renderEvents() {
    eventsContainer.innerHTML = ""; // Vider le conteneur

    eventsData.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('event-card');

        card.innerHTML = `
            <div class="card-header">
                <span>📅 ${event.date}</span>
                <span>📍 ${event.location}</span>
            </div>
            <div class="card-body">
                <h3>${event.image} ${event.title}</h3>
                <div class="card-info">🕒 Horaire : ${event.time}</div>
                <div class="card-info">👥 Déjà inscrits : <span id="count-${event.id}" class="participant-count">${event.participants}</span></div>
            </div>
            <div class="card-footer">
                <button class="btn-join" onclick="joinEvent(${event.id})">Je participe !</button>
            </div>
        `;
        eventsContainer.appendChild(card);
    });
}

// --- Interaction : Rejoindre un événement (Simulation) ---
function joinEvent(id) {
    // Trouver l'événement dans la liste
    const event = eventsData.find(e => e.id === id);
    if(event) {
        event.participants++; // Incrémenter le compteur
        // Mettre à jour l'affichage seulement
        const countSpan = document.getElementById(`count-${id}`);
        countSpan.innerText = event.participants;
        countSpan.style.color = "#27ae60"; // Changer la couleur pour valider
        alert(`Bravo ! Vous êtes inscrit pour ${event.title}.`);
    }
}

// --- Gestion de la Modale (Connexion/Inscription) ---
const modal = document.getElementById("auth-modal");
const btnLogin = document.getElementById("btn-login-nav");
const spanClose = document.getElementsByClassName("close")[0];

// Ouvrir la modale
btnLogin.onclick = function() {
    modal.style.display = "block";
}

// Fermer la modale
spanClose.onclick = function() {
    modal.style.display = "none";
}

// Fermer si on clique en dehors
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Gestion des onglets (Login vs Inscription)
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    
    // Cacher tous les contenus
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Retirer la classe active des boutons
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Afficher l'onglet actuel
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Lancer l'affichage au chargement de la page
document.addEventListener('DOMContentLoaded', renderEvents);