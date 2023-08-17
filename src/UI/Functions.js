export const functions={
    getJWT:()=>{
        const jwt = sessionStorage.getItem('jwt');
        return {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        };
    }
}

// export const getJWT = () => {
//     const jwt = sessionStorage.getItem('jwt');
//     return {
//         'Authorization': `Bearer ${jwt}`,
//         'Content-Type': 'application/json'
//     };
// }
