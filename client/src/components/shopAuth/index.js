import BASE_URL from "../../utils/baseUrl";

// Register Shop
export const signup = async (shop) => {
  return fetch(`${BASE_URL}/api/shop/auth`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: shop,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Login Shop
export const signin = async (shop) => {
  return fetch(`${BASE_URL}/api/shops`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shop),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Save token in storage
export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    if (JSON.parse(localStorage.getItem("jwt"))) {
      localStorage.removeItem("jwt");
    }
    localStorage.setItem("shopjwt", JSON.stringify(data));
  }
};

// Signout so destroy the local token
export const shopSignout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("shopjwt");
    window.location.reload(false);
  }
};

// Return if shop is authenticated or not
export const shopIsAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (localStorage.getItem("shopjwt")) {
    return JSON.parse(localStorage.getItem("shopjwt"));
  } else {
    return false;
  }
};

// Forgot Password (send token)
export const forgot = async (email) => {
  return fetch(`${BASE_URL}/api/shop/auth/forgot`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update password
export const updatePassword = async (password, token) => {
  return fetch(`${BASE_URL}/api/shop/auth/resetPassword/${token}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(password),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
