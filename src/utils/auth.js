import { BASE_URL } from "./constants.js";
import { request } from "./api.js";

function register({ name, avatar, email, password }) {
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  });
}

function authorize({ email, password }) {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export { register, authorize };
