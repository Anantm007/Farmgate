// Get a particular user
export const getUser = async(id) => {
    return fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: {
            'x-auth-token': JSON.parse(localStorage.getItem('jwt')).token
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}


// Update User
export const Update = async(id, user) => {
       
    return fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'x-auth-token': JSON.parse(localStorage.getItem('jwt')).token
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

// Update user in local storage
export const updateUser = (user, next) => {
    console.log('yo',user)
    if(typeof window !== 'undefined')
    {
        if(localStorage.getItem('jwt'))
        {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = user;
            localStorage.setItem('jwt', JSON.stringify(auth))
            next()
        }
    }
}

// Get cart length of user
export const cartLength = () => {

    return fetch(`/api/users/cart/length`, {
        method: 'GET',
        headers: {
            'x-auth-token': JSON.parse(localStorage.getItem('jwt')).token
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

// Update item quantity from cart
export const updateCartItem = (id, quantity) => {
    const b = {
        quantity
    }
    return fetch(`/api/users/cart/update/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'x-auth-token': JSON.parse(localStorage.getItem('jwt')).token
        },
        body: JSON.stringify(b)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

// Remove item from cart
export const removeFromCart = (id) => {
    return fetch(`/api/users/cart/remove/${id}`, {
        method: 'DELETE',
        headers: {
            'x-auth-token': JSON.parse(localStorage.getItem('jwt')).token
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}