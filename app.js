const http = require('http'),
      mongoClient = require('mongodb').MongoClient,
      userName = 'sysadmin';

const hostname = '0.0.0.0',
      port = 5522,
      server = http.createServer((request, resolve) =>
      {
        resolve.statusCode = 200;
        resolve.setHeader('Content-Type', 'text/plain');
        resolve.end(`Hello, ${userName}, you have ${count} documents.`);
      }),
      url = 'mongodb://127.0.0.1:27017/';

const client = new mongoClient(url);
let count = 0;

async function run()
{
    try
    {
        await client.connect();
        const dataBase = client.db('admin'),
              result = await dataBase.command({ping: 1});
        console.log('Connection established.');
        const collection = dataBase.collection('users');
        count = await collection.countDocuments();
        console.log(`The collection contains ${count} documents.`);
        console.log(result);
    }
    catch(error)
    {
        console.log(`Error: ${error}`);
    }
    finally
    {
        await client.close();
        console.log('Connection closed.');
    }
}
run().catch(console.error);
server.listen(port, hostname, () =>
{
    console.log(`Server running at http://${hostname}:${port}/`);
});
