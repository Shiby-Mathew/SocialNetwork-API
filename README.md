# SocialNetwork-API

## Description

```
This is a backend application to create an API for a social network web application where users can share
their thoughts, react to friend's thoughts and create a friends list. Technologies used are Express.js
for routing, MongoDB database and Mongoose ODM. MongoDB is a popular choice for many social networks
due to its speed with large amounts of data and flexibility with unstructured data. For date format used
moment.js package. All API routes of this backend application is tested in Insomnia.

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
THEN I am able to successfully create and delete reactions to thoughts and add
and remove friends to a user’s friend list
```

## Mock-Up

The following video shows application's routes for user, thoughts, reaction to thoughts and friends to user being tested in Insomnia:

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

- Invoke the application by run `npm index.js`, the Mongoose models are synced to the MongoDB database.
- Test the endpoints in Isomnia, API GET routes for users and thoughts, the data for each of the routes displayed in JSON format.
- User and thoughts have APIs - POST, PUT and DELETE. This has been done using user and thought with unique ID's.
- Friends and reactions have routes for POST and DELETE - to add and delete a friend and reaction for corresponding user and thought

## Tests

Insomnia is used to test REST API calls.

User Routes

- Find all users: `GET/api/users`
- Find single user: `GET/api/users/:userId`
- Create a user: `POST/api/users`
- Update a user: `PUT/api/users/:userId`
- Delete a user:`DELETE/api/users/:userId`

Thought Routes

- Find all thoughts: `GET/api/thoughts`
- Find single thought: `GET/api/thoughts/:thoughtId`
- Create a thought: `POST/api/thoughts`
- Update a thought: `PUT/api/thoughts/:thoughtId`
- Delete a thought: `DELETE/api/thoughts/:thoughtId`

Friend Routes

- Add a friend to user's friend list: `POST/api/users/:userId/friends/:friendId`
- Delete a friend from users's friend list: `DELETE/api/users/:userId/friends/:friendId`

Reaction Routes

- Add a reaction to thought's list: `POST/api/thoughts/:thoughtId/reactions`
- Delete a reaction from a thought: `DELETE/api/thoughts/:thoughtId/reactions/:reactionId`

## ScreenShots

The following screenshots shows some of the application's routes for user,thoughts,reaction to thoughts and friends to user being tested in Insomnia:

![All routes.](./utils/images/Allroutes.png)
![Find all users](./utils/images/users.png)
![Create a user](./utils/images/post.png)
![Add a reaction](./utils/images/reaction.png)
![Add a friend](./utils/images/friend.png)

## Resources

- Course Materials
