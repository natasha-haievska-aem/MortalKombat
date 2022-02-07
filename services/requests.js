export const getPlayers = async () => {
    return fetch('https://reactmarathon-api.herokuapp.com/api/mk/players')
        .then(res => res.json())
}

export const getPlayerRandom = async () => {
    return fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose')
        .then(res => res.json())
}

export const actionPlayer = async (hit, defence) => {
    return fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
        method: 'POST',
        body: JSON.stringify({
            hit: hit,
            defence: defence,
        })
    })
        .then(res => res.json());
};