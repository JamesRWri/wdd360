export const userSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "User",
  "description": "Schema for User object",
  "type": "object",
  "required": ["_id", "username", "email", "password", "cart", "createdAt", "modifiedAt"],
  "properties": {
    "_id": { "type": "string", "description": "Unique identifier for the user" },
    "username": { "type": "string", "description": "Unique handle for the user account" },
    "email": { "type": "string", "description": "User email address" },
    "password": { "type": "string", "description": "Hashed password" },
    "cart": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["productId", "name", "price", "quantity"],
        "properties": {
          "productId": { "type": "string" },
          "name": { "type": "string" },
          "price": { "type": "number" },
          "quantity": { "type": "integer" }
        }
      },
      "description": "Embedded user shopping cart"
    },
    "createdAt": { "type": "string", "format": "date-time" },
    "modifiedAt": { "type": "string", "format": "date-time" }
  }
};

export const orderSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Order",
  "description": "Schema for Order object",
  "type": "object",
  "required": ["_id", "userId", "orderDate", "items", "total", "shippingAddress"],
  "properties": {
    "_id": { "type": "string", "description": "Unique identifier for the order" },
    "userId": { "type": "string", "description": "ID of the user who placed the order" },
    "orderDate": { "type": "string", "format": "date-time" },
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["productId", "name", "price", "quantity"],
        "properties": {
          "productId": { "type": "string" },
          "name": { "type": "string" },
          "price": { "type": "number" },
          "quantity": { "type": "integer" }
        }
      }
    },
    "total": { "type": "number", "description": "Total order cost" },
    "shippingAddress": {
      "type": "object",
      "required": ["street", "city", "state", "zipCode"],
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type": "string" },
        "zipCode": { "type": "string" }
      }
    }
  }
};