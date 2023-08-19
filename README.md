# Ecommerce API
## Note: Postman Documentation of all the apis are there in [Postman Collections](./ecommerce.postman_collection.json) 

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

