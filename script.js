// ==========================================
// 1. DONNÉES (DATA)
// ==========================================

const eventsData = [
    {
        id: 1,
        title: "Nettoyage Plage du Moulin Blanc",
        date: "Samedi 24 Juin",
        time: "14h00",
        location: "Brest",
        coords: "48.3904,-4.4361",
        participants: 12,
        maxParticipants: 20,
        image: "🌊",
        handicap: true,
        weather: "Soleil & Nuages ⛅ (19°C)",
        fatigue: "Faible 🟢",
        equipment: ["Gants", "Sac poubelle", "Casquette"]
    },
    {
        id: 2,
        title: "Opération Port de Plouzané",
        date: "Dimanche 25 Juin",
        time: "09h30",
        location: "Plouzané",
        coords: "48.3567,-4.6225",
        participants: 5,
        maxParticipants: 10,
        image: "⚓",
        handicap: false,
        weather: "Pluie fine 🌧️ (16°C)",
        fatigue: "Moyen 🟠",
        equipment: ["Bottes", "K-way", "Gants étanches"]
    },
    {
        id: 3,
        title: "Sentier Côtier Plougastel",
        date: "Mercredi 28 Juin",
        time: "15h00",
        location: "Plougastel-Daoulas",
        coords: "48.3736,-4.4725",
        participants: 15,
        maxParticipants: 15,
        image: "🌿",
        handicap: false,
        weather: "Grand Soleil ☀️ (24°C)",
        fatigue: "Difficile 🔴 (Roches)",
        equipment: ["Chaussures de marche", "Gourde", "Pince"]
    },
    {
        id: 4,
        title: "Grand Ramassage Étudiant",
        date: "Jeudi 29 Juin",
        time: "17h00",
        location: "Brest - Château",
        coords: "48.3831,-4.4952",
        participants: 45,
        maxParticipants: 100,
        image: "🏰",
        handicap: true,
        weather: "Venté 💨 (18°C)",
        fatigue: "Faible 🟢",
        equipment: ["Gants", "Gilet fluo"]
    }
];

const shopData = [
    { id: 1, name: "Gourde Inox", priceXP: 500, priceEur: 15, image: "💧", desc: "Zéro plastique, garde au frais." },
    { id: 2, name: "T-shirt Bio", priceXP: 800, priceEur: 20, image: "👕", desc: "Logo brodé, fabriqué en Bretagne." },
    { id: 3, name: "Pince Pro", priceXP: 300, priceEur: 10, image: "🦞", desc: "L'outil indispensable." },
    { id: 4, name: "Sac Toile", priceXP: 150, priceEur: 5, image: "👜", desc: "Pour vos courses." }
];

const badgesData = [
    { id: 1, title: "Premier Pas", desc: "Premier ramassage.", icon: "🧤", unlocked: true },
    { id: 2, title: "Vétéran", desc: "+ 2 ans d'ancienneté.", icon: "⚓", unlocked: true },
    { id: 3, title: "Grand Nettoyeur", desc: "10km² nettoyés.", icon: "🌍", unlocked: false },
    { id: 4, title: "Influenceur", desc: "Parrainer 5 amis.", icon: "📢", unlocked: false },
    { id: 5, title: "Lève-tôt", desc: "Ramassage avant 8h.", icon: "🌅", unlocked: true },
    { id: 6, title: "Capitaine", desc: "Organiser un event.", icon: "👑", unlocked: false }
];

const historyData = [
    { date: "12 Mai", title: "Nettoyage Plage", location: "Trez-Hir", status: "Effectué", xp: "+50 XP" },
    { date: "04 Avr", title: "Opération Mégots", location: "Brest Port", status: "Effectué", xp: "+30 XP" },
    { date: "10 Mar", title: "Sensibilisation", location: "Écoles", status: "Annulé", xp: "0 XP" }
];

// ==========================================
// 2. FONCTIONS
// ==========================================

function renderEvents() {
    const container = document.getElementById('events-grid');
    if (!container) return;
    container.innerHTML = "";
    eventsData.forEach(event => {
        const isFull = event.participants >= event.maxParticipants;
        const btnClass = isFull ? "btn-disabled" : "btn-join";
        const btnText = isFull ? "Complet" : "Je participe !";
        const disabledAttr = isFull ? "disabled" : "";

        const card = document.createElement('div');
        card.classList.add('event-card');
        if(isFull) card.classList.add('card-full');
        card.setAttribute('onclick', `openEventDetails(${event.id})`);

        card.innerHTML = `
            <div class="card-header">
                <span>📅 ${event.date}</span>
                <span>📍 ${event.location}</span>
            </div>
            <div class="card-body">
                <h3>${event.image} ${event.title}</h3>
                <div class="card-info">🕒 Horaire : ${event.time}</div>
                <div class="card-info">
                    👥 Inscrits : <span id="count-${event.id}" class="participant-count">${event.participants}</span> / ${event.maxParticipants}
                </div>
                <div class="event-progress">
                    <div class="event-bar" style="width:${(event.participants/event.maxParticipants)*100}%"></div>
                </div>
            </div>
            <div class="card-footer">
                <button class="${btnClass}" onclick="event.stopPropagation(); joinEvent(${event.id})" ${disabledAttr}>${btnText}</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function openEventDetails(id) {
    const event = eventsData.find(e => e.id === id);
    if(!event) return;

    const modal = document.getElementById('event-details-modal');
    document.getElementById('modal-title').innerText = event.image + " " + event.title;
    document.getElementById('modal-desc').innerText = `Rendez-vous à ${event.location} le ${event.date} à ${event.time}.`;
    document.getElementById('modal-weather').innerText = event.weather;
    document.getElementById('modal-fatigue').innerText = event.fatigue;

    const handicapElem = document.getElementById('modal-handicap');
    if(event.handicap) {
        handicapElem.innerHTML = "✅ Accessible PMR";
        handicapElem.style.color = "#27ae60";
    } else {
        handicapElem.innerHTML = "⚠️ Accès difficile (Non PMR)";
        handicapElem.style.color = "#c0392b";
    }

    const equipList = document.getElementById('modal-equip');
    equipList.innerHTML = "";
    event.equipment.forEach(item => {
        const li = document.createElement('li');
        li.innerText = "🔹 " + item;
        equipList.appendChild(li);
    });

    // Maps (Iframe)
    const mapFrame = document.getElementById('modal-map');
    mapFrame.src = `https://maps.google.com/maps?q=${event.coords}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    modal.style.display = "block";
}

function closeEventDetails() {
    document.getElementById('event-details-modal').style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById('event-details-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function joinEvent(id) {
    const event = eventsData.find(e => e.id === id);
    if(event) {
        if (event.participants >= event.maxParticipants) {
            alert("Désolé, cet événement est complet !");
            return;
        }
        event.participants++;
        renderEvents();
        alert(`Bravo ! Vous êtes inscrit pour ${event.title}.`);
    }
}

function renderShop() {
    const container = document.getElementById('shop-grid');
    if (!container) return;
    container.innerHTML = "";
    shopData.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('shop-card');
        card.innerHTML = `<div class="shop-icon">${item.image}</div><h3>${item.name}</h3><p class="shop-desc">${item.desc}</p><div class="shop-prices"><span class="price-xp">⚡ ${item.priceXP} XP</span><span class="price-eur">ou ${item.priceEur}€</span></div><button class="btn-buy" onclick="buyItem('${item.name}')">Acheter</button>`;
        container.appendChild(card);
    });
}

function buyItem(itemName) { alert(`Merci ! Vous avez commandé : ${itemName}.`); }

function loadBadges() {
    const grid = document.getElementById('badges-grid');
    if (!grid) return;
    grid.innerHTML = "";
    badgesData.forEach(badge => {
        const statusClass = badge.unlocked ? 'unlocked' : 'locked';
        const div = document.createElement('div');
        div.className = `badge-card ${statusClass}`;
        div.innerHTML = `<div class="badge-icon">${badge.icon}</div><div class="badge-title">${badge.title}</div><div class="badge-desc">${badge.desc}</div>`;
        grid.appendChild(div);
    });
}

function loadHistory() {
    const list = document.getElementById('history-list');
    if (!list) return;
    list.innerHTML = "";
    historyData.forEach(item => {
        const statusClass = item.status === "Effectué" ? "status-done" : "status-absent";
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `<div class="history-date">${item.date}</div><div class="history-content"><div class="history-title">${item.title}</div><div class="history-loc">📍 ${item.location}</div></div><div class="history-right"><span class="history-status ${statusClass}">${item.status}</span><div style="font-size:0.8rem;text-align:right;color:#aaa;">${item.xp}</div></div>`;
        list.appendChild(div);
    });
}

// ==========================================
// 3. FONCTION DECONNEXION / CONNEXION
// ==========================================
function toggleAuth() {
    const btnAuth = document.getElementById('auth-btn');
    const btnAccount = document.getElementById('link-account'); // On cible le bouton Mon Compte via son ID

    if(btnAuth.innerText === "Déconnexion") {
        // --- ACTION : SE DÉCONNECTER ---
        btnAuth.innerText = "Connexion";
        
        // CACHER le bouton Mon Compte
        if(btnAccount) btnAccount.style.display = "none";

        alert("Vous êtes déconnecté.");

    } else {
        // --- ACTION : SE CONNECTER ---
        btnAuth.innerText = "Déconnexion";
        
        // Reset du style du bouton Auth
        btnAuth.classList.add("btn-outline");
        btnAuth.style.backgroundColor = "transparent";
        btnAuth.style.color = ""; 
        btnAuth.style.borderColor = "";

        // AFFICHER le bouton Mon Compte
        if(btnAccount) btnAccount.style.display = "inline-block";

        alert("Bon retour, Antoine !");
    }
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', function() {
    renderEvents();
    loadBadges();
    loadHistory();
    renderShop();
});


// --- DONNÉES DES NIVEAUX (GRADES) ---
const levelsData = [
    { level: 1, name: "Novice", icon: "🌱", reached: true, desc: "Niveau 1 atteint" },
    { level: 3, name: "Gardien", icon: "🛡️", reached: true, desc: "Niveau 3 atteint" },
    { level: 5, name: "Expert", icon: "⭐", reached: false, desc: "Atteindre le niv. 5" },
    { level: 10, name: "Légende", icon: "👑", reached: false, desc: "Atteindre le niv. 10" }
];


// --- Fonction pour afficher les Grades ---
function loadLevels() {
    const grid = document.getElementById('levels-grid');
    if (!grid) return; // Sécurité

    grid.innerHTML = "";
    levelsData.forEach(lvl => {
        // On utilise des styles différents pour les grades
        const statusClass = lvl.reached ? 'level-unlocked' : 'level-locked';
        
        const div = document.createElement('div');
        div.className = `badge-card ${statusClass}`; // On réutilise la base badge-card
        
        div.innerHTML = `
            <div class="badge-icon" style="font-size: 2.5rem;">${lvl.icon}</div>
            <div class="badge-title" style="color:var(--primary-color)">${lvl.name}</div>
            <div class="badge-desc">${lvl.desc}</div>
        `;
        grid.appendChild(div);
    });
}

// ... (Garde loadBadges, loadHistory, toggleAuth...) ...

// --- INITIALISATION (Mise à jour) ---
document.addEventListener('DOMContentLoaded', function() {
    renderEvents();
    loadBadges();
    loadLevels(); // <--- N'OUBLIE PAS D'AJOUTER CETTE LIGNE
    loadHistory();
    renderShop();
});