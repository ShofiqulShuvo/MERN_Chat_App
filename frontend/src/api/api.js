export const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const postConfigureMultipart = (data) => {
  return {
    method: "POST",
    body: data,
  };
};

export const postConfigureJason = (data) => {
  return {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
};

export const postConfigureToken = (token, data) => {
  return {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
};

export const putConfigureToken = (token, data) => {
  return {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
};

export const getConfigureToken = (token) => {
  return {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};
