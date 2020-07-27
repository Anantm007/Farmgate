// Register User
export const signup = async (user) => {
  return fetch(`/api/user/auth`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Login User
export const signin = async (user) => {
  return fetch(`/api/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Find suburb to autofill from postcode
export const findSuburbFromCode = (zipcode) => {
  return fetch(`/api/users/findSuburb/${zipcode}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
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
    if (JSON.parse(localStorage.getItem("shopjwt"))) {
      localStorage.removeItem("shopjwt");
    }

    localStorage.setItem("jwt", JSON.stringify(data));
  }
};

// Signout so destroy the local token
export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    window.location.reload(false);
  }
};

// Return if user is authenticated or not
export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

// Forgot Password (send token)
export const forgot = async (email) => {
  return fetch(`/api/user/auth/forgot`, {
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
  return fetch(`/api/user/auth/resetPassword/${token}`, {
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
