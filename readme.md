# Neomerchant-api

Neomerchant-api is a REST API to manage products, users, and stores, and handle payments for an ecommerce store. It is built using Node JS Express. It is the backend for the [neomerchant-app](https://github.com/frayfray248/neomerchant-app).

# Endpoints

## Products

| Method | Path | Description |
| ----- | ----- | ----- |
| GET | /products | Get all products |
| GET | /products/{id} | Get a product by id |

# Data Models

## Product

```json
{
    name: String,
    title : String,
    description : String,
    price : Number,
    category : String
}
```

# Upcoming Features

- User, orders, and store data models and endpoints
- JWT session token generation
- Paypal payment handling

