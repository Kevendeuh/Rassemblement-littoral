// ==========================================
// 1. DONNÉES (DATA)
// ==========================================

// --- Événements (Avec gestion Max Participants) ---
const eventsData = [
    {
        id: 1,
        title: "Nettoyage Plage du Moulin Blanc",
        date: "Samedi 24 Juin",
        time: "14h00",
        location: "Brest",
        participants: 12,
        maxParticipants: 20,
        image: "🌊"
    },
    {
        id: 2,
        title: "Opération Port de Plouzané",
        date: "Dimanche 25 Juin",
        time: "09h30",
        location: "Plouzané",
        participants: 5,
        maxParticipants: 10,
        image: "⚓"
    },
    {
        id: 3,
        title: "Sentier Côtier Plougastel",
        date: "Mercredi 28 Juin",
        time: "15h00",
        location: "Plougastel-Daoulas",
        participants: 15,
        maxParticipants: 15, // Complet
        image: "🌿"
    },
    {
        id: 4,
        title: "Grand Ramassage Étudiant",
        date: "Jeudi 29 Juin",
        time: "17h00",
        location: "Brest - Château",
        participants: 45,
        maxParticipants: 100,
        image: "🏰"
    }
];

// --- Boutique (Merch) ---
const shopData = [
    {
        id: 1,
        name: "Gourde Inox RadePropre",
        priceXP: 500,
        priceEur: 15,
        image: "💧",
        desc: "Zéro plastique, garde au frais 12h."
    },
    {
        id: 2,
        name: "T-shirt Coton Bio",
        priceXP: 800,
        priceEur: 20,
        image: "👕",
        desc: "Logo brodé, fabriqué en Bretagne."
    },
    {
        id: 3,
        name: "Pince de Ramassage",
        priceXP: 300,
        priceEur: 10,
        image: "🦞",
        desc: "L'outil indispensable du bénévole."
    },
    {
        id: 4,
        name: "Sac en Toile Recyclé",
        priceXP: 150,
        priceEur: 5,
        image: "👜",
        desc: "Pour vos courses ou vos déchets."
    }
];

// --- Badges ---
const badgesData = [
    { id: 1, title: "Premier Pas", desc: "Premier ramassage.", icon: "🧤", unlocked: true },
    { id: 2, title: "Vétéran", desc: "+ 2 ans d'ancienneté.", icon: "⚓", unlocked: true },
    { id: 3, title: "Grand Nettoyeur", desc: "10km² nettoyés.", icon: "🌍", unlocked: false },
    { id: 4, title: "Influenceur", desc: "Parrainer 5 amis.", icon: "📢", unlocked: false },
    { id: 5, title: "Lève-tôt", desc: "Ramassage avant 8h.", icon: "🌅", unlocked: true },
    { id: 6, title: "Capitaine", desc: "Organiser un event.", icon: "👑", unlocked: false }
];

// --- Historique ---
const historyData = [
    { date: "12 Mai", title: "Nettoyage Plage", location: "Trez-Hir", status: "Effectué", xp: "+50 XP" },
    { date: "04 Avr", title: "Opération Mégots", location: "Brest Port", status: "Effectué", xp: "+30 XP" },
    { date: "10 Mar", title: "Sensibilisation", location: "Écoles", status: "Annulé", xp: "0 XP" }
];

// ==========================================
// 2. FONCTIONS (LOGIQUE)
// ==========================================

// --- Afficher les événements ---
function renderEvents() {
    const container = document.getElementById('events-grid');
    if (!container) return; // Sécurité si on n'est pas sur la page index

    container.innerHTML = "";

    eventsData.forEach(event => {
        // Calcul du remplissage
        const isFull = event.participants >= event.maxParticipants;
        const btnClass = isFull ? "btn-disabled" : "btn-join";
        const btnText = isFull ? "Complet" : "Je participe !";
        const disabledAttr = isFull ? "disabled" : "";

        const card = document.createElement('div');
        card.classList.add('event-card');
        if(isFull) card.classList.add('card-full');

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
                <button class="${btnClass}" onclick="joinEvent(${event.id})" ${disabledAttr}>${btnText}</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- Rejoindre un événement ---
function joinEvent(id) {
    const event = eventsData.find(e => e.id === id);
    if(event) {
        if (event.participants >= event.maxParticipants) {
            alert("Désolé, cet événement est complet !");
            return;
        }
        event.participants++;
        renderEvents(); // Rafraichir l'affichage
        alert(`Bravo ! Vous êtes inscrit pour ${event.title}.`);
    }
}

// --- Afficher la boutique ---
function renderShop() {
    const container = document.getElementById('shop-grid');
    if (!container) return;

    container.innerHTML = "";

    shopData.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('shop-card');

        card.innerHTML = `
            <div class="shop-icon">${item.image}</div>
            <h3>${item.name}</h3>
            <p class="shop-desc">${item.desc}</p>
            <div class="shop-prices">
                <span class="price-xp">⚡ ${item.priceXP} XP</span>
                <span class="price-eur">ou ${item.priceEur}€</span>
            </div>
            <button class="btn-buy" onclick="buyItem('${item.name}')">Acheter</button>
        `;
        container.appendChild(card);
    });
}

// --- Action d'achat ---
function buyItem(itemName) {
    alert(`Merci ! Vous avez commandé : ${itemName}. \n(Simulation de paiement...)`);
}

// --- Afficher les badges ---
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

// --- Afficher l'historique ---
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
// 3. INITIALISATION (Lancement)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    renderEvents(); // Pour index.html
    loadBadges();   // Pour compte.html ou boutique.html (si utilisé)
    loadHistory();  // Pour compte.html
    renderShop();   // Pour boutique.html
});