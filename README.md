# SocialNetwork-API

## Description

```
This is a backend appliction to built an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. Technolgies used are Express.js for rotuing, MongoDB database and the Mongoose ODM. MongoDB is a popular choice for many social networks due to its speed with large amounts of data and flexibility with unstructured data. For date format used moment.js package. This is only a backend application tested in Insomnia.

```

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Mock-Up

The following video shows application's routes for user,thoughts,reaction to thoughts and friends to user being tested in Insomnia:

[![Walk through video](https://drive.google.com/file/d/171gvy8oGhigC1JhD35Yc7YBkPgoPna6c/view.png)](https://drive.google.com/file/d/171gvy8oGhigC1JhD35Yc7YBkPgoPna6c/view)

## Technologies Used

```
Node.js
Express.js
MongoDB
Mongoose
Moment.js
```

## Usage

- When we ran the command to invoke the application, the Mongoose models are synced to the MongoDB database.
- After that open Isomnia and test API GET routes for users and thoughts, the data for each of the routes displayed in JSON format.
- User and thoughts have API POST,PUT and DELETE, each user and thought have a unique ID.
- Friends and reactions routes for POST and DELETE, to add and delete a friend and reaction for corresponding user and thought

## Resources

- Course Material

## Test

Insomnia is used to test REST API calls.

```
User Routes
```

- Find all users: GET/api/users
- Find single user: GET/api/users/:userId
- Create a user: POST/api/users
- Update a user: PUT/api/users/:userId
- Delete a user: DELETE/api/users/:userId
