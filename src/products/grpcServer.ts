import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { ServiceClientConstructor } from '@grpc/grpc-js/build/src/make-client';

import { getProducts, getProductById, searchForProducts } from './product';

const packageDefinition = loadSync(
    __dirname + '/../../../beginner-s-guide-to-go-Proto-protocol-buffer-go-4378006/schemas/product/service.proto',
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
        includeDirs: [__dirname + '/../../../beginner-s-guide-to-go-Proto-protocol-buffer-go-4378006/schemas'],
    });

const proto = grpc.loadPackageDefinition(packageDefinition);
const bigstar = proto['bigstar'];
const services = bigstar['product'];
const constructor = services['ProductService'] as ServiceClientConstructor;
const { service } = constructor;

function getServer() {
  const server = new grpc.Server();
  server.addService(service, {
    GetProducts: async (call, callback) => {
      console.log('Hitting gRPC GetProducts');
      const products = await getProducts();

      callback(null, { results: products.map(product => ({ product, })), header: call.request.header, });
    },
    GetProductById: async (call, callback) => {
      console.log('Hitting gRPC GetProductById');
      const product = await getProductById(call.request.product_id);

      callback(null, { result: { product, }, header: call.request.header });
    },
    ProductSearch: async (call, callback) => {
      console.log('Hitting gRPC ProductSearch');
      const { query } = call.request;
      const products = await searchForProducts(query.search_str, query.quantity, query.sort);

      callback(null, { results: products.map(product => ({ product, })), header: call.request.header, });
    }
  });

  return server;
}

if (require.main === module) {
  const server = getServer();
  server.bindAsync('localhost:9010', grpc.ServerCredentials.createInsecure(), () => {
    server.start();

    console.log('gRPC Server running on localhost:9010');
  });
}

exports.getServer = getServer;