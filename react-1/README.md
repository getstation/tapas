# React drag'n'drop list
_Duration: 4h max_

The objective of this challenge is to create a list of people using React.

[![react-1](https://s3.invisionapp-cdn.com/storage.invisionapp.com/screens/files/368331310.png?x-amz-meta-iv=2&response-cache-control=max-age%3D2419200&x-amz-meta-ck=9829d017069087e9a9c984ed654aad77&AWSAccessKeyId=AKIAJFUMDU3L6GTLUDYA&Expires=1561939200&Signature=bEIHKxoXeDPQHBXwSR5sFHcRm50%3D)](https://invis.io/9JSGZO3FE5C)

## Challenge
- Use the inserted image from above as your visual guide (you should try to be as close as possible to the image)
- You must consume this endpoint (http://jsonplaceholder.typicode.com/users) to get the users for the list. How you consume the endpoint is up to you.
- All CSS must be created using reactJSS
- You should be able to drag and drop elements of your list. To ease this part, you **must** use [React DND](http://react-dnd.github.io/react-dnd/)
- Add a "loading" indicator for when the users are being fetched
- This challenge is using [React Hooks](https://reactjs.org/docs/hooks-intro.html), try to follow this philosophy whenever possible
- Drag and drop interactions should be animated if you have time. The look and feel of the animations/transitions are up to you
  - If you want ideas for your transitions, you can take a look at [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) (do not use the lib! It is just here for inspiration)
  
## Preparation
```sh
cd tapas/react-1

# Install dependencies
npm install

# Run the development server
npm run start
```
