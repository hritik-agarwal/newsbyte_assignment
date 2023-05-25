## Task Specification

- Create a url hashing service.
- URL length must not be restricted.
- Query parameters must not be ignored.
- Validity of the url can be set
  - Here, there are several options like max no of link clicks, duration, end date etc.

## Architecture

- Creating a nodejs backend app
  - It will use express web framework to serve the request & ejs for UI
  - To create the hash string, nanoid will be used (since it is very fast and performant)
  - For storing the fullUrl and corresponding shortUrl, going with NoSQL database since it is highly available, scalable and in future, if we wanted to add new validity specifiers, then it can be easily added to the collections.
- Hosting on render (for auto-scale it could be migrated to better platforms like AWS)
