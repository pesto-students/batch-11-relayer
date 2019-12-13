const UNAUTHORIZED = 'unauthorized';

async function callAPI(url, method, data) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const { status } = response;
  if (status === 401) {
    window.location.href = '/signin';
  }
  if (status === 200) {
    const rawData = response;
    const jsonData = await rawData.json();
    return jsonData.body;
  }
  return UNAUTHORIZED;
}

export default callAPI;
