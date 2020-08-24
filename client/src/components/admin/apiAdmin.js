// Send feedback to the server
export const query = (query) => {
  return fetch(`/api/admin/feedback`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Generate invoice for an order
export const generateSpecialInvoice = (orderId) => {
  return fetch(`/api/util/specialInvoice/${orderId}`, {
    method: "GET",
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// List all users for the admin
export const getUsers = () => {
  return fetch(`/api/users`, {
    method: "GET",
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// List all shops for the admin
export const listShops = () => {
  return fetch(`/api/shops`, {
    method: "GET",
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// List all orders for admin
export const listOrders = () => {
  return fetch(`/api/order/admin/all`, {
    method: "GET",
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get status values of all orders
export const getStatusValues = () => {
  return fetch(`/api/order/statusValues`, {
    method: "GET",
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Update status values
export const updateOrderStatus = (orderId, status) => {
  return fetch(`/api/order/admin/update/${orderId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
    body: JSON.stringify({ status, orderId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Generate orders invoice for shops
export const generateInvoice = (id) => {
  return fetch(`/api/order/invoice/${id}`, {
    method: "GET",
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Create a new Certificate
export const createCertificate = (data) => {
  let formBody = {};
  formBody.name = data.name;
  formBody.url = data.url;
  formBody.shop = data.shop;

  return fetch(`/api/admin/certificate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
    body: JSON.stringify(formBody),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update a certificate
export const updateCertificate = (id, data) => {
  let formBody = {};
  formBody.name = data.name;
  formBody.url = data.url;

  return fetch(`/api/admin/certificate/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
    body: JSON.stringify(formBody),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete a certificate
export const deleteCertificate = (id) => {
  return fetch(`/api/admin/certificate/${id}`, {
    method: "DELETE",
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
