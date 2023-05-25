## Task Specification

- Create a url hashing service.
- URL length must not be restricted.
- Query parameters must not be ignored.
- Validity of the url can be set
  - Here, there are several options like max no of link clicks, duration, end date etc.

## Architecture

- Since a small service so creating a nodejs backend app
  - It will use express web framework to serve the request & ejs for UI
  - To create the hash id, nanoid ID generator is used (since it is fast, lightweight and has larger alphabe than UUID)
  - For storing the fullUrl and corresponding shortUrl, going with NoSQL database since it is highly available, scalable and in future, if we wanted to add new validity specifiers, then it can be easily added to the NoSQL databse.
- Hosting on render which auto deploys whenever there is any new commit
- Currently, the app supports adding max number of clicks allowed after which the link becoms invalid.

## See Live Demo

Visit Website [↗️](https://shorturl-j0j7.onrender.com/)

## To Run Locally

1. Clone the Repo ```git clone https://github.com/hritik-agarwal/newsbyte_assignment.git```
2. Go to project and install the dependencies using ```npm install```
3. Create a .env file and add ```MONGO_URI=<uri>``` in it. (To get uri, create a project on mongodb.com and get the connection string)
4. Run the project ```node index.js```

## Future Improvements

1. Improving Website Design
2. Integrating a campaign url builder
3. Adding muliple url validity options
