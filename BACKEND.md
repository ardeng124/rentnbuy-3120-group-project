# Documentation for all routes 

## POST /api/makeAnOffer 
### Request payload
```json
{ 
        "itemId": "634e5837f40ea22d221e5838",
        "startDate": "Tue Oct 18 2022 18:16:53 GMT+1100 (Australian Eastern Daylight Time)",
        "endDate": "Tue Oct 18 2022 18:16:53 GMT+1100 (Australian Eastern Daylight Time)",
        "offerPrice": 90000
}
``

### Response payload 
``
{
    "offerMadeBy": "6347b163ead78d22f6fc38fc",
    "offerMadeTo": "634e5710b87e7c0a1d756a12",
    "item": "634e5837f40ea22d221e5838",
    "startDate": "2022-10-18T07:16:53.000Z",
    "endDate": "2022-10-18T07:16:53.000Z",
    "offerPrice": 90000,
    "timestamp": "2022-10-18T07:41:31.746Z",
    "id": "634e58abf40ea22d221e5841"
}

```


## GET /api/getOffersToMe
### Response 
```json
[
    {
        "offerMadeBy": {
            "username": "anubhav",
            "passwordHash": "$2b$10$aZXLHThLaL6cKy1EvsK6Auods434j.OXQSUTP.tgDNFjqMXleNfwS",
            "image": "",
            "age": 20,
            "isAdmin": false,
            "phoneNumber": "0444444444",
            "emailAddress": "anubhav@email.com",
            "favourites": [],
            "location": "27 Mq Street, Macquarie",
            "reviews": [],
            "myItems": [],
            "boughtItems": [],
            "rentedItems": [],
            "id": "6347b163ead78d22f6fc38fc"
        },
        "offerMadeTo": "634e5710b87e7c0a1d756a12",
        "item": {
            "name": "Fancy item",
            "rating": 177700,
            "price": 56892,
            "creatorId": "634e5710b87e7c0a1d756a12",
            "location": "27 Merinda Avenue, Pymble",
            "description": "This should be a HTML encoded field!!",
            "isAvailable": true,
            "timestamp": "2022-10-18T07:39:35.048Z",
            "id": "634e5837f40ea22d221e5838"
        },
        "startDate": "2022-10-18T07:16:53.000Z",
        "endDate": "2022-10-18T07:16:53.000Z",
        "offerPrice": 90000,
        "timestamp": "2022-10-18T07:41:31.746Z",
        "id": "634e58abf40ea22d221e5841"
    }
]
```
## GET /api/getOffersByMe

### Response
```json
[
    {
        "offerMadeBy": "6347b163ead78d22f6fc38fc",
        "offerMadeTo": {
            "username": "anubhav",
            "passwordHash": "$2b$10$aZXLHThLaL6cKy1EvsK6Auods434j.OXQSUTP.tgDNFjqMXleNfwS",
            "image": "",
            "age": 20,
            "isAdmin": false,
            "phoneNumber": "0444444444",
            "emailAddress": "anubhav@email.com",
            "favourites": [],
            "location": "27 Mq Street, Macquarie",
            "reviews": [],
            "myItems": [],
            "boughtItems": [],
            "rentedItems": [],
            "id": "6347b163ead78d22f6fc38fc"
        },
        "item": {
            "name": "Fancy item",
            "rating": 177700,
            "price": 56892,
            "creatorId": "6347b163ead78d22f6fc38fc",
            "location": "27 Merinda Avenue, Pymble",
            "description": "This should be a HTML encoded field!!",
            "isAvailable": false,
            "timestamp": "2022-10-16T09:01:49.879Z",
            "id": "634bc87d3531f16e1bd9b6a7"
        },
        "startDate": "2022-10-18T07:16:53.000Z",
        "endDate": "2022-10-18T07:16:53.000Z",
        "offerPrice": 90000,
        "timestamp": "2022-10-18T07:19:03.053Z",
        "id": "634e53673f11266d43290e08"
    }
]
```

## PUT localhost:8102/api/addPhotoToItem/:itemId
### Request 
form-data 

key = file

value = actual file 

### Response 
``` json
{
    "name": "123213",
    "rating": 100,
    "price": 123,
    "creatorId": "635397f9e28c3ba0227cb3de",
    "reviews": [],
    "categoryId": [],
    "location": "your 12",
    "description": "Something",
    "isAvailable": true,
    "timestamp": "2022-10-22T08:21:38.650Z",
    "itemPhotoUrl": "http://localhost:8102/api/downloadFile/1666503840526-open-box-shay-dining-chair-z.jpeg",
    "id": "6353a8122e1e7b56dead80db"
}
```
## PUT localhost:8102/api/uploadUserPhoto
### Request 
form-data 

key = file

value = actual file 

### Response 
```json
{
    "username": "anubhav",
    "passwordHash": "$2b$10$aZXLHThLaL6cKy1EvsK6Auods434j.OXQSUTP.tgDNFjqMXleNfwS",
    "image": "",
    "age": 20,
    "isAdmin": false,
    "phoneNumber": "0444444444",
    "emailAddress": "anubhav@email.com",
    "favourites": [],
    "location": "27 Mq Street, Macquarie",
    "reviews": [],
    "myItems": [],
    "boughtItems": [],
    "rentedItems": [
        "634f2dc786f4b8f5cbe61d13"
    ],
    "profilePhotoName": "1666466838886-user2.jpg",
    "profilePhotoLocation": "http://localhost:8102/api/downloadFile/1666467700676-user2.jpg",
    "id": "6347b163ead78d22f6fc38fc"
}
```