import express from 'express';
import morgan from 'morgan';

import { getProducts, getProductsById, searchForProducts } from './product';

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

    app.get('/products', async (_req: express.Request, res: express.Response) => {
        console.log('Hitting Big Star product service - get products');
        const data = await getProducts();
        return res.status(200).send({
            products: data
        })
    });
    app.get('/products/:productId', async (req: express.Request, res: express.Response) => {
        console.log('Hitting Big Star product service - get by product id');
        const data = await getProductsById(+req.params.productId);
        return res.status(200).send({
            product: data,
        });
    });
    app.post('/products', async (req: express.Request, res: express.Response) => {
        console.log('Hitting Big Star product service - search by string and quantity');
        const data = await searchForProducts(req.body.searchStr, req.body.quantity ? req.body.quantity : undefined, req.body.sortOrder ? req.body.sortOrder : undefined);
        return res.status(200).send({
            products: data,
        });
    });

    app.listen('9009', () => console.log(`Big Star Products server started on port 9009!`));
}

start().catch(e => {
    console.log(e, 'Failed :(');
    process.exit(1);
});