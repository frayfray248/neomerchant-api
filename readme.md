# Description

An Express REST API for the neomerchant ecommerce site

## Endpoints

### Products

| Method | Path | Description |
| ----- | ----- | ----- |
| GET | /products | Get all products |
| GET | /products/{id} | Get a product by id |

## Data

### Product

| Name | Type |
| ----- | ----- |
|id | number |
| title | string |
| description | string |
| price | number |
| category | string |