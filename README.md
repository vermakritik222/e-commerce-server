# Ecommerce API
## Note: Postman Documentation of all the apis are there in [Postman Collections](./ecommerce.postman_collection.json) 
[Docker Image](https://hub.docker.com/r/kritikverma2002/ecommerce)
# APIS 
```js 
API BASE "{{IP}}/api/v1"
```

## Health Check 
```js 
GET "/health-check"
```
## Auth
```js 
POST "/signup"

POST "/login"

POST "/sendotp"

GET "/refresh"

POST "/forgotpassword"

PATCH "/resetpassword/:token"

GET "/logout"

PATCH "/update-email"

GET "/email-verify/:token"

PATCH "/update-password"
```

## User 
```js
GET "/me"

PATCH "/me"
```
## Address

```js 
GET "/address"

POST "/address"

PATCH "/address"

DELETE "/address/:id"
```
## Product
```js 
GET "/product"

POST "/product"

GET "/product/:id"

PATCH "/product/:id"

DELETE "/product/:id"
```
<!-- ## Review -->
## Cart

```js 
GET "/cart"

POST "/cart"

PATCH "/cart"

DELETE "/cart/:id"

DELETE "/cart/remove-al"
```
## Order

```js 
GET "/order"

POST "/order"

PATCH "/order"

GET "/order/:id"
```
---
## How To run 
install Docker Desktop
```
docker-compose up
```

---
---
---
---

# Plane

## Admin

### Registration Page

1. POST role base Auth

### Admin Dartboard

1. GET all products

2. GET all Oder, Status change

3. GET Top Review 

4. GET Review Recent oder

5. POST Product

## General 

## Product List Page

1. GET all Products (Proper pagination) (sort, filter, etc)

2. POST Add to cart

## Product Page

1. GET product

2. GET Comments/Rating (pagination)

3. POST Comments/Rating
## Cart Page

1. CRUD Cart 
## Invoice Page

1. Proceed with payment and store the status of payment 
## Address Management Page

1. CRUD Address
