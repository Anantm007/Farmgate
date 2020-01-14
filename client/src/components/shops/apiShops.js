// Get list of shops from backend
export const getShops = () => {
    return fetch(`/api/shops`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
} 

// Get a particular shop
export const getShop = id => {
    return fetch(`/api/shops/${id}`, {
        method: "GET",
        headers: { 'x-auth-token': JSON.parse(localStorage.getItem('userjwt')).token }
      })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
}