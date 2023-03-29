import axios from 'axios';

export async function getCharacters(): Promise<any> {
    console.log('Sending to the Character service characters endpoint');
    return await axios.get('http://localhost:9007/characters');
}

export async function getCharacterById(id: number): Promise<any> {
    console.log('Sending to the Character service character by id endpoint');
    const url = `http://localhost:9007/characters/${id}`;
    console.log({url});
    return await axios.get(url);
}