// Send feedback to the server 
export const query = (query) => {
    return fetch(`/api/admin/feedback`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
    })

    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
} 

// List all users for the admin
export const getUsers = () => {
    return fetch(`/api/users`, {
        method: "GET",
        headers: { 
            'x-auth-token': JSON.parse(localStorage.getItem('jwt')).token}
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
} 

// List all orders for admin
export const listOrders = () => {
    return fetch(`/api/order/admin/all`, {
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

// Get status values of all orders
export const getStatusValues = () => {
    return fetch(`/api/order/statusValues`, {
        method: "GET",
        headers: { 
            'x-auth-token': JSON.parse(localStorage.getItem('jwt')).token}
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

// Update status values
export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`/api/order/${orderId}/status/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, orderId })
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
