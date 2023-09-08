import confetti from "canvas-confetti";

export const functions = {
    getJWT: () => {
        const jwt = sessionStorage.getItem('jwt');
        return {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        };
    },
    particle: () => {   //폭죽
        confetti({
            particleCount: 50,
            spread: 50
        });
    }
}
