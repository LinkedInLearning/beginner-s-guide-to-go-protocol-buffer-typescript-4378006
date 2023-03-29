import axios from 'axios';
import express from 'express';
import morgan from 'morgan';

import { login, signup } from './customer';
import { getCharacters, getCharacterById } from './character';

async function start() {
    const app = express();

    app.use((_request, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
    });

    app.use(morgan('dev'));
    app.use(express.json());

    app.post('/login', async (req: express.Request, res: express.Response) => {
        console.log('Hitting Big Star main service login');
        console.log('req: ', req);
        const resp = await login(req.body);
        return res.status(resp.status).send(resp.data);
    });
    app.post('/signup', async (req: express.Request, res: express.Response) => {
        console.log('Hitting Big Star main service signup');
        const resp = await signup(req.body);
        return res.status(resp.status).send(resp.data);
    });

    app.get('/characters', async (_req: express.Request, res: express.Response) => {
        console.log('Hitting Big Star main service characters');
        const resp = await getCharacters();
        return res.status(resp.status).send(resp.data);
    });
    app.get('/characters/:characterId', async (req: express.Request, res: express.Response) => {
        console.log('Hitting Big Star main service character - by id');
        const resp = await getCharacterById(+req.params.characterId);
        return res.status(resp.status).send(resp.data);
    });

    app.get('/products', async (_req: express.Request, res: express.Response) => {
        console.log('Hitting Big Star main service products');
        const resp = await axios.get('http://localhost:9009/products');
        return res.status(resp.status).send(resp.data);
    });
    app.get('/products/:productId', async (req: express.Request, res: express.Response) => {
        console.log('Hitting Big Star main service products - by id');
        const url = `http://localhost:9009/products/${req.params.productId}`;
        console.log({url});
        const resp = await axios.get(url);
        return res.status(resp.status).send(resp.data);
    });
    app.post('/products', async (req: express.Request, res: express.Response) => {
        console.log('Hitting Big Star main service products - search by string and quantity');
        const resp = await axios.post("http://localhost:9009/products", req.body);
        return res.status(resp.status).send(resp.data);
    });

    app.listen('9003', () => console.log(`Big Star server started on port 9003!`));
}

start().catch(e => {
    console.log(e, 'Failed :(');
    process.exit(1);
});