# E-commerce 

***
## Login
***
login while get an access token based on credentials
1. URL  `localhost:3000/login`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript
{
	"email": "yourmail@mail.com",
	"password": "yourpassword",
}

```
5. Success Response
```javascript
CODE : 200

CONTENT :
( redirect next page )
```
6. Error Response
```javascript
CODE: 500
CONTENT:
{
  message: "internal server eror"
}

OR 

CODE: 400
CONTENT:
{
  message: "bad request"
}

```
***
## Sign In Using Google
***
sign in with google account
1. URL  `localhost:3000/googleLogin`
2. Method `POST`
3. URL Param `not required`
4. Data
```javascript
your google account
{
	"email": "yourmail@mail.com",
	"password": "yourpassword",
}

```
5. Success Response
```javascript
CODE : 201

CONTENT :
{
  token,
  message: "success login"
}
```
6. Error Response
```javascript
CODE: 500 

CONTENT:
{
  error,
  message: 'Internal Server Error'
}
```
***
## logout
***
1. URL  ``
2. Method ``
3. URL Param `not required`
4. Data Param
```javascript
```
5. Success Response
```javascript
```
6. Error Response
```javascript
```
***
## Create product
***
create new product ( authenticated only )

1. URL  `localhost:3000/products`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript

data: {
      id: 'number',
      name: 'string',
      image_url: 'string',
      price: 'integer',
      stock: 'integer'
    },

headers: {
      'access_token': `${token}`
    }

```
5. Success Response
```javascript
CODE : 200
show all product list
```
6. Error Response
```javascript
CODE: 400
CONTENT: {
  message: "bad request"
}
```
***
## Read product / Show all product on e-commerce
***
show all todo list ( authenticated user only )

1. URL  `localhost:3000/products`
2. Method `GET`
3. URL Param 
4. Data Param
```javascript
headers: {
      'access_token': `${token}`
    }
```
5. Success Response
```javascript
CODE : 200
show all product on e-commerce database
```
6. Error Response
```javascript
CODE: 500
CONTENT: {
  message: "internal server error"
}
```
***
## Edit product
***
edit your product ( authenticated user only )
1. URL  `localhost:3000/products/:id`
2. Method `PUT`
3. URL Param `not required`
4. Data Param
```javascript
data: {
      id: 'number',
      name: 'string',
      image_url: 'string',
      price: 'integer',
      stock: 'integer'
    },
    headers: {
      'access_token': `${token}`
    }
```
5. Success Response
```javascript
CODE : 200(OK)
CONTENT: {
  title,
  category
}
```
6. Error Response
```javascript
CODE: 400
CONTENT: "json" {
  message: "Bad request"
}

OR 
CODE: 500('internal server error')

CONTENT:

```
***
## Delete product
***
delete your product ( authenticated user only )

1. URL  `localhost:3000/products/:id`
2. Method `DELETE`
3. URL Param 
4. Data Param
```javascript
data: {
      id,
    },
headers: {
      'access_token': `${token}`
    }
```
5. Success Response
```javascript
CODE : 200

CONTENT : JSON {
  'success delete product'
}

```
6. Error Response
```javascript
CODE: 404 (NOT FOUND)

```