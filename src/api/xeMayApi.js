// API service for XeMay resource

const API_URL = 'http://192.168.31.79:3000';

export const fetchXeMay = async () => {
  try {
    const response = await fetch(`${API_URL}/XeMay`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching XeMay:', error);
    throw error;
  }
};

export const addXeMay = async (xeMay) => {
  try {
    const response = await fetch(`${API_URL}/XeMay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(xeMay),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding XeMay:', error);
    throw error;
  }
};

export const updateXeMay = async (id, xeMay) => {
  try {
    const response = await fetch(`${API_URL}/XeMay/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(xeMay),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating XeMay:', error);
    throw error;
  }
};

export const deleteXeMay = async (id) => {
  try {
    const response = await fetch(`${API_URL}/XeMay/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return true;
  } catch (error) {
    console.error('Error deleting XeMay:', error);
    throw error;
  }
};