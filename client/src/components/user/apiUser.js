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

// Add item to user's cart
export const addToCart = (id) => {
    const b = {
        quantity: 1
    }

    return fetch(`/api/users/cart/add/${id}`, {
        method: 'POST',
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


// Get cart total of user
export const getCartTotal = () => {

    return fetch(`/api/users/cart/total`, {
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

// Get Braintree token from backend
export const getBraintreeClientToken = (userId) => {
    return fetch(`/api/braintree/getToken/${userId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json",
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


// Process the payment
export const processPayment = (userId, paymentData) => {
    return fetch(`/api/braintree/payment/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json",
            'x-auth-token': JSON.parse(localStorage.getItem('jwt')).token
        },
        body: JSON.stringify(paymentData)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    }) 
}


// Create the order
export const createOrder = (userId, data) => {
    return fetch(`/api/order/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json",
            'x-auth-token': JSON.parse(localStorage.getItem('jwt')).token
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    }) 
}



// List all orders for the user
export const listOrders = (userId) => {
    return fetch(`/api/order/user/${userId}`, {
        method: "GET",
        headers: { 
            'x-auth-token': JSON.parse(localStorage.getItem('jwt')).token}
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    });
}
