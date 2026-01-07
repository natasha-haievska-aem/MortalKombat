const API_BASE = './api';

export const getPlayers = async () => {
    return fetch(`${API_BASE}/players.json`)
        .then(res => res.json());
};

export const getPlayerRandom = async () => {
    const players = await getPlayers();
    const randomIndex = Math.floor(Math.random() * players.length);
    return players[randomIndex];
};

export const actionPlayer = async (hit, defence) => {
    // Simulate fight response locally
    const hitTypes = ['head', 'body', 'foot'];
    
    // Generate random actions for enemy (player2)
    const enemyHit = hitTypes[Math.floor(Math.random() * hitTypes.length)];
    const enemyDefence = hitTypes[Math.floor(Math.random() * hitTypes.length)];
    const enemyDamage = Math.floor(Math.random() * 20) + 5; // 5-25 damage
    
    // Player1's values come from hit/defence params, generate damage
    const playerDamage = Math.floor(Math.random() * 20) + 5; // 5-25 damage
    
    return {
        player1: {
            hit: hit,
            defence: defence,
            value: playerDamage
        },
        player2: {
            hit: enemyHit,
            defence: enemyDefence,
            value: enemyDamage
        }
    };
};