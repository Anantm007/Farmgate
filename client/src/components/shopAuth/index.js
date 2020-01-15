// Register Shop
export const signup = async (shop) => { 
    
    return fetch(`/api/shop/auth`, {
        method: "POST",
        headers: {
            Accept: "application/json"
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

// Login Shop
export const signin = async shop => {
    return fetch(`/api/shops`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(shop)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

// Save token in storage
export const authenticate = (data, next) => {
    if(typeof window !== 'undefined')
    {
        localStorage.setItem('shopjwt', JSON.stringify(data))
        next();
    }
}

// Signout so destroy the local token
export const shopSignout = (next) => {
    if(typeof window !== 'undefined')
    {
        localStorage.removeItem('shopjwt');
        next();
    }
};

// Return if shop is authenticated or not
export const shopIsAuthenticated = () => {
    if(typeof window === 'undefined')
    {
        return false;
    }

    if(localStorage.getItem('shopjwt'))
    {
        return JSON.parse(localStorage.getItem('shopjwt'));
    } else {
        return false;
    }
}

// Forgot Password (send token)
export const forgot = async email => {
    return fetch(`/api/shop/auth/forgot`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(email)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

// Update password
export const updatePassword = async (password, token) => {
    console.log(token)
    return fetch(`/api/shop/auth/resetPassword/${token}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(password)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}
