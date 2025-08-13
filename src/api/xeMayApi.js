const API_URL = 'http://192.168.31.79:3000/XeMay';

const apiRequest = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`API Error: ${response.status}`);
  return response.json();
};

export const fetchXeMay = () => apiRequest(API_URL);

export const addXeMay = (xeMay) => 
  apiRequest(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(xeMay)
  });

export const updateXeMay = (id, xeMay) => 
  apiRequest(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(xeMay)
  });

export const deleteXeMay = async (id) => {
  await apiRequest(`${API_URL}/${id}`, { method: 'DELETE' });
  return true;
};