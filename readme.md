# Neomerchant-api

Neomerchant-api is a REST API to manage products, users, and stores, and handle payments for an ecommerce store. It is built using Node JS Express. It is the backend for the [neomerchant-app](https://github.com/frayfray248/neomerchant-app).

# Endpoints

| Method | Path | Description | Requires Authentication |
| ----- | ----- | ----- | ----- |
| GET | /products | Get all products | No |
| GET | /products/{id} | Get a product by id | No |
| GET | /users/{id}/shoppingcart/ | Get a user's shopping cart | Yes |
| POST | /users | Create a user | No |
| POST | /users/login | Log in a user and return a session token | No |
| GET | /users/{id}/shoppingcart | Get a user's shopping cart | Yes |
| PATCH | /users/{id}/shoppingcart | Update a user's shopping cart | Yes |
| DELETE | /users/{id} | Delete a user by id | Yes |
| GET | /shoppingcart/{id} | Get a shopping cart by id | Yes |
| POST | /shoppingcart | Create a shopping cart | Yes |
| PATCH | /shoppingcart/{id} | Update a shopping cart | Yes |

# Authentication
JSON web tokens are used for login sessions. To generate a token, make a post request to /users/login with the following payload:

```json
{
    "username" : String,
    "password" : String
}
```

A JWT token will be sent back if authentication is successful. Use the JWT in the authentication header for any endpoints that require authentication.
```
Authentication: Bearer {token}
```


# Data Models

### Product

```
{
    name: String,
    title : String,
    description : String,
    price : Number,
    category : String
}
```
### User
```
{
    username: String,
    password: String,
    role: String,
    shoppingCart: ObjectID,
    orders: Array
}
```
### ShoppingCart
```
{
    products: [
        {
            _id: ObjectID,
            quantity: Number
        }
    ]
}
```

# Upcoming Features

- Paypal payment handling
- Order creation

