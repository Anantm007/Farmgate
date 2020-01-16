// Add new Item
export const createItem = async (shop) => { 
    
    return fetch(`/api/shop/auth`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            headers: { 'x-auth-token': JSON.parse(localStorage.getItem('shopjwt')).token }
        },
        body: shop
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}
