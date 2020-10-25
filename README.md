## Description
Application which could make an isolation transaction between wallets.
Also could transfer from one currency to another (through the USD). 
Setup your customization in `currency.config.json`.


## Deployment

```bash
$ docker-compose up
```

This command will build application and docker images.
After application will start, give it about 20 second for TypeScript compiling.
Then go to `localhost:3000`


## Initial data

When you start the app, automatically will be created two wallets:

{
  "id": "2958202a-4a4f-4610-9a4f-2c4a6513d792",
  "password": "abcd",
  "currency": "BTC",
  "balance": 130.4
}
{
  "id": "986cd625-fea7-41b6-ac5b-a06b2455cf02",
  "password": "abcd",
  "currency": "ETH",
  "balance": 87
}

You could use this data for manual testing. 
Go to documentation page '/api' and check RESTful endpoints.



## Example of requests

You could just copy body of request to swager interface on `/api'.

POST /transfer/make/? HTTP/1.1
Host: localhost:3000
Content-Type: application/json
{
  "from": "2958202a-4a4f-4610-9a4f-2c4a6513d792",
  "password": "abcd",
  "to": "986cd625-fea7-41b6-ac5b-a06b2455cf02",
  "ammount": 12
}


POST /wallet/create/? HTTP/1.1
Host: localhost:3000
Content-Type: application/json
{
  "currency": "BTC",
  "password": "abc1234"
}