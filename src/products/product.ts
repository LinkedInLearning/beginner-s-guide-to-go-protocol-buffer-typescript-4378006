import axios from 'axios';

import { Product } from "./definitions";

export enum SortOrder {
    Ascending = 'asc',
    Desending = 'desc'
};

export async function getProducts(): Promise<Product[]> {
    const data = (await axios.get('https://bigstarcollectibles.com/api/products/all')).data;
    const products: Product[] = data.map(product => ({
        id: +product.id,
        productId: +product.product_id,
        categoryId: +product.category_id,
        name: product.name,
        description: product.description,
        type: product.product_type,
        price: product.price,
    }));
    console.log({products});
    return products;
}

export async function getProductsById(id: number): Promise<Product[]> {
    const url = `https://bigstarcollectibles.com/api/products/${id}`;
    console.log({url});
    const data = (await axios.get(url)).data;
    console.log({data});
    const products:  Product[] = data.map(product => ({
        id: +product.id,
        productId: +product.product_id,
        categoryId: +product.category_id,
        name: product.name,
        description: product.description,
        type: product.product_type,
        price: product.price,
    }));
    console.log({products});
    return products;
}
    
export async function searchForProducts(searchStr: string, quantity?: number, sortDirection?: SortOrder ): Promise<Product[]> {
    //https://bigstarcollectibles.com/api/products/<searchStr>/qty/<quantity>/sort/<sortDirection>
    let url = 'https://bigstarcollectibles.com/api/products/' + searchStr;
    if (quantity) {
        url = url + '/qty/' + quantity;
    }
    if (sortDirection) {
        url = url + '/sort/' + sortDirection;
    }
    console.log({url});

    const data = (await axios.get(url)).data;
    const products: Product[] = data.map(product => ({
        id: +product.id,
        productId: +product.product_id,
        categoryId: +product.category_id,
        name: product.name,
        description: product.description,
        type: product.product_type,
        price: product.price,
    }));
    console.log({products});
    return products;
  }