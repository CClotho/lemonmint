import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
/* 
export const getProducts = async() => {
    const response = await axios.get('https://api.escuelajs.co/api/v1/products');
    return response.data
}
 */



 export const getProducts = async() => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data
}
 