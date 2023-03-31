import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { ServiceClientConstructor } from '@grpc/grpc-js/build/src/make-client';
import { v4 as uuidv4 } from 'uuid';

const packageDefinition = loadSync(
    __dirname + '/../../beginner-s-guide-to-go-Proto-protocol-buffer-go-4378006/schemas/customer/service.proto',
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
const services = bigstar['customer'];
const CustomerService = services['CustomerService'] as ServiceClientConstructor;

const client = new CustomerService('localhost:9006', grpc.credentials.createInsecure());

client.Sigin({ header: { span: { value: uuidv4(), }}, customer: { username: 'donaldduck', password: 'justdonald', email: 'donald@ducks.com'}}, (error, response) => {
  if (error) {
    console.log (error);
  }

  console.log({response});
});

client.Login({ header: { span: { value: uuidv4(), }}, customer: { username: 'daffyduck', password: 'justdaffy', email: 'daffy@ducks.com'}}, (error, response) => {
  if (error) {
    console.log (error);
  }

   console.log({response});
 }); 