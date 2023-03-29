import axios from 'axios';

export async function login(body: any): Promise<any> {
    console.log('Sending to the Customer service login endpoint');
    return await axios.post('http://localhost:9005/login', body);
}

export async function signup(body: any): Promise<any> {
    console.log('Sending to the Customer service signup endpoint');
    return await axios.post('http://localhost:9005/signup', body);
}