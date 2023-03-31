import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { ServiceClientConstructor } from '@grpc/grpc-js/build/src/make-client';
import { v4 as uuidv4 } from 'uuid';

const packageDefinition = loadSync(
    __dirname + '/../../beginner-s-guide-to-go-Proto-protocol-buffer-go-4378006/schemas/product/service.proto',
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
        includeDirs: [__dirname + '/../../beginner-s-guide-to-go-Proto-protocol-buffer-go-4378006/schemas'],
    });

const proto = grpc.loadPackageDefinition(packageDefinition);
const bigstar = proto['bigstar'];
const services = bigstar['product'];
const ProductService = services['ProductService'] as ServiceClientConstructor;

const client = new ProductService('localhost:9010', grpc.credentials.createInsecure());

client.GetProducts({ header: { span: { value: uuidv4(), }}}, (error, response) => {
  if (error) {
    console.log (error);
  }

  console.log({response});
});

client.GetProductById({ header: { span: { value: uuidv4(), }}, product_id: 1, }, (error, response) => {
  if (error) {
    console.log (error);
  }

  console.log({response});
});

client.ProductSearch({ header: { span: { value: uuidv4(), }}, query: { search_str: "ga", quantity: 10, sort: 'ASCENDING', }}, (error, response) => {
  if (error) {
    console.log (error);
  }

  console.log({response});
});