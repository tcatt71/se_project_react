const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch items: ${res.status}`);
    } else {
      return res.json();
    }
  });
}

export { getItems };
