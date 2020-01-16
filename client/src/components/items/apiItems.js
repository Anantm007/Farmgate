// Add new Item
export const createItem = async (shop) => { 
    return fetch(`/api/items`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            'x-auth-token': JSON.parse(localStorage.getItem('shopjwt')).token
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

// Delete an Item
export const deleteItem = async(id) => {
    return fetch(`/api/items/${id}`, {
        method: 'DELETE',
        headers: {
            'x-auth-token': JSON.parse(localStorage.getItem('shopjwt')).token
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}
