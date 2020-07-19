// Create a new Certificate
export const createCertificate = (data) => {
    let formBody = {};
    formBody.name = data.name;
    formBody.url = data.url;
    formBody.shop = data.shop

    return fetch(`/api/certificate`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'x-auth-token': JSON.parse(localStorage.getItem('shopjwt')).token
        },
        body: JSON.stringify(formBody)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    });
}


// List all certificates for a shop
export const listCertificates = (shopId) => {
    return fetch(`/api/certificate/shop/${shopId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    });
}

// Get a particular certificate
export const getCertificate = (id) => {
    return fetch(`/api/certificate/${id}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    });
}


// Update a certificate
export const updateCertificate = (id, data) => {
    let formBody = {};
    formBody.name = data.name;
    formBody.url = data.url;

    return fetch(`/api/certificate/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'x-auth-token': JSON.parse(localStorage.getItem('shopjwt')).token
        },
        body: JSON.stringify(formBody)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    });
}


// Delete a certificate
export const deleteCertificate = (id) => {
    return fetch(`/api/certificate/${id}`, {
        method: "DELETE",
        headers: {
            'x-auth-token': JSON.parse(localStorage.getItem('shopjwt')).token
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    });
}