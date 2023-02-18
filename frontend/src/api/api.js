export const BASE_URL = `http://localhost:3500`;

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
