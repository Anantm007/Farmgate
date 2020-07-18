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

// Update Shop
export const Update = async(id, user) => {
       
    return fetch(`/api/shops/${id}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'x-auth-token': JSON.parse(localStorage.getItem('shopjwt')).token
        },
            body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

// Update shop in local storage
export const updateShop = (shop, next) => {
    if(typeof window !== 'undefined')
    {
        if(localStorage.getItem('shopjwt'))
        {
            let auth = JSON.parse(localStorage.getItem("shopjwt"));
            auth.shop = shop;
            localStorage.setItem('shopjwt', JSON.stringify(auth))
            next()
        }
    }
}

// Get items for a shop (only in stock)
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


// Get items for a shop (both in and out of stock)
export const getItemsAllType = id => {
    return fetch(`/api/shops/${id}/items/allType`, {
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

// List all orders for a shop
export const listOrders = (shopId) => {
    return fetch(`/api/order/shop/${shopId}`, {
        method: "GET",
        headers: { 
            'x-auth-token': JSON.parse(localStorage.getItem('shopjwt')).token}
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    });
}


// List number of items for a shop
export const countItems = (shopId) => {
    return fetch(`/api/shops/items/${shopId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    });
}


// Get all certificates for a shop
export const getCertificates = id => {
    return fetch(`/api/certificate/shop/${id}`, {
        method: "GET"
      })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
}

