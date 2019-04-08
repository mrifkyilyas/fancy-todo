# fancy-todo

# Fancy To Do 

**Usage**

```
npm install
npm run dev
live-server --host=localhost
```

Access client via `http://localhost:8080`
Access server via `http://localhost:3000`

1. **List of users routes:** 

| Route                 | HTTP | Header(s) | Body                                                         | RESPONSE Success | RESPONSE Error        | Description                                |
| --------------------- | ---- | --------- | ------------------------------------------------------------ | ---------------- | --------------------- | ------------------------------------------ |
| /register       | POST | none      | name:String(**required**)<br/>email:String(**required**)<br/>password:String(**required**) | Register a user  | Internal server error | register as a user                         |
| /login        | POST | none      | email:String(**required**)<br />password:String(**required**) | Success Login    | Internal Server Error | Login as a user                            |
| /google-login | POST | none      | email:String(**required**)<br />password:String(**required**) | Success Login    | Internal Server Error | Login as a user (**Using Google Account**) |

2. **List of todos routes:** 

| Route               | HTTP   | Header(s) | Body                                                         | RESPONSE Success       | RESPONSE Error        | Description             |
| ------------------- | ------ | --------- | ------------------------------------------------------------ | ---------------------- | --------------------- | ----------------------- |
| /task/create              | POST   | Token     | name:String(**required**)<br />description:String(**required**)<br/>dueDate:Date(**required**) | Success add new to do  | Internal server error | Create a new task    |
| /task/:id/ | PUT | Token     | none                                                         | Success update  task | Internal Server Error | Complete  a task        |
| /task/:id          | DELETE | token     | none                                                         | Success Delete Task    | Internal Server Error | Delete a task from User |
| /task/all         | GET | token     | none                                                         |   array of object[{}] task  | Internal Server Error | get all data task form task |
