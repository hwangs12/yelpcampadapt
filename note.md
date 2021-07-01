#### app starts with basic CRUD with express

#### next is middleware

request --> middleware --> response

- Middleware are just functions
- Each middleware has access to the request and response objects
- Mw can end the HTTP request by sending back a response with methods like res.send()
- OR mw can be chained together, one after another by calling **next()**

## Morgan
___

All it does is helps log http request terminal
Morgan does it easy to use way


