# Documentation for all routes 

## POST /api/makeAnOffer 
### Request payload
``
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

``


## GET /api/getOffersToMe
### Response 
``
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
``
## GET /api/getOffersByMe

### Response
``
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
``
