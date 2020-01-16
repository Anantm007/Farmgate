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
    let h;
    if(JSON.parse(localStorage.getItem('jwt')))
    {
        h = JSON.parse(localStorage.getItem('jwt')).token
    }

    else if(JSON.parse(localStorage.getItem('shopjwt')))
    {
        h = JSON.parse(localStorage.getItem('shopjwt')).token
    }

    return fetch(`/api/shops/${id}`, {
        method: "GET",
        headers: { 'x-auth-token': h }
      })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
}

// Get items for a shop
export const getItems = id => {
    return fetch(`/api/shops/${id}/items`, {
        method: "GET"
      })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
}



// Get my Shop
export const myShop = id => {
    return fetch(`/api/shops/${id}`, {
        method: 'GET',
        headers: { 'x-auth-token': JSON.parse(localStorage.getItem('shopjwt')).token}
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })

}