// Register User
export const signup = async user => {
    return fetch(`/api/user/auth`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
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

// Login User
export const signin = async user => {
    return fetch(`/api/users`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
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

// Save token in storage
export const authenticate = (data, next) => {
    if(typeof window !== 'undefined')
    {
        localStorage.setItem('jwt', JSON.stringify(data))
        next();
    }
}

// Signout so destroy the local token
export const signout = (next) => {
    if(typeof window !== 'undefined')
    {
        localStorage.removeItem('jwt');
        next();
    }
};

// Return if user is authenticated or not
export const isAuthenticated = () => {
    if(typeof window === 'undefined')
    {
        return false;
    }

    if(localStorage.getItem('jwt'))
    {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
}

// Forgot Password (send token)
export const forgot = async email => {
    return fetch(`/api/user/auth/forgot`, {
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
    return fetch(`/api/user/auth/resetPassword/${token}`, {
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
