# Task Management API

The Task Management API Project is a robust and scalable solution designed to streamline task organization and tracking for teams and individuals. This API enables users to create, manage, and monitor tasks efficiently, facilitating improved productivity and collaboration.



<br>



## Table of Contents


- [ Features. ](#Features)
- [ Technologies Used & Dependencies. ](#Technologies_Used)
- [ Project Structure. ](#Project_Structure)
- [ Getting Started. ](#Getting_Started)
- [ API Endpoints. ](#API_Endpoints)
- [ Available Base Url. ](#Available_Base_Url)
- [ Validation. ](#Validation)
- [ Feedback and Contributing. ](#Feedback_Contributing)
- [ License. ](#License)




<br>



<a id="Features"></a>

## Features

- **User Authentication:** Secure user registration and login using encrypted passwords and JWT tokens.
- **Task Management:** CRUD operations for managing tasks, including creation, retrieval, updating, and deletion.
- **Grouping Tasks:** Enable users to add and manage tasks in their groups.
- **Validation:** Input validation and data sanitization using Joi to ensure data integrity.
- **Security:** Password hashing using Bcrypt.js to safeguard user credentials.



<br>



<a id="Technologies_Used"></a>

## Technologies Used & Dependencies
- **Node.js:** A server-side JavaScript runtime used to build fast and scalable network applications.
- **Express:** A minimal and flexible Node.js web application framework that simplifies API development.
- **MongoDB:** A NoSQL database used for efficient and flexible data storage.
- **Joi:** A validation library for JavaScript that helps ensure the integrity of data.
- **Bcrypt.js:** A library for hashing and salting passwords to enhance security.

For a complete list of dependencies, please refer to the `package.json` file.



<br>



<a id="Getting_Started"></a>

## Getting Started

To get started with the project, follow these steps:

1. <strong>Clone the Repository:</strong> Clone this repository to your local machine using the following command:
```bash
  git clone https://github.com/Hossam-H22/Task-Management__API.git
```

2. <strong>Install Dependencies:</strong> Navigate to the project directory and install the required dependencies using your preferred package manager:
```bash
  cd Task-Management__API
  npm install
```

3. <strong>Configure environment variables:</strong> Add variables for database connection, Cloudinary API keys, JWT secret, and token signature.

4. <strong>Run the Application:</strong> Start the development server to run the application locally:
```bash
  npm run dev
```

5. <strong>Access the Application:</strong> Open your web browser and visit `http://localhost:5000` to use it as a base link.



<br>



<a id="Project_Structure"></a>

## Project Structure
The project structure follows a modular pattern to enhance maintainability and readability:

* `DB/`
    * `Models/`: Defines MongoDB schemas.
    * `connection.js`: Connect to MongoDB.
* `src/`
    * `middleware/`: Middleware functions for authentication, error handling, etc.
    * `modules/`: Defines API routes and connects them to controllers to perform their business logic.
    * `utils/`: Utility functions for various tasks.
    * `app.js`: Main Express application setup.



<br>



<a id="API_Endpoints"></a>

## API Endpoints
* **Authentication**
  * `POST /auth/login`: Login user.
  * `POST /auth/signup`: Register new user.
  * `PATCH /auth/forgetPassword`: Send code to email to reset password.
  * `PATCH /auth/resetPassword`: Reset forgetting password with new.
* **User**
  * `GET /user`: Retrieve details of a specific user.
  * `PATCH /user/updatePassword`: Update password of the user.
* **Category**
  * `GET /category`: Retrieve a list of categories (and retrieve their tasks depending on parameters).
  * `GET /category/:id`: Retrieve details of a specific category (and retrieve their tasks depending on parameters).
  * `POST /category`: Create a new category.
  * `PUT /category/:id`: Update category details.
* **Task**
  * `GET /task`: Retrieve a list of tasks.
  * `GET /task/:id`: Retrieve details of a specific task.
  * `POST /task`: Create a new task.
  * `PUT /task/:id`: Update task details.


> Detailed Postman API documentation can be found <a href="https://documenter.getpostman.com/view/23533987/2sA3kRKPkr" target="_blank">here</a>.



<br>



<a id="Available_Base_Url"></a>

## Available Base Url
- https://task-management-api-dragonh22s-projects.vercel.app/
- https://task-management-api-git-master-dragonh22s-projects.vercel.app/
- https://task-management-api-nu.vercel.app/






<br>



<a id="Validation"></a>

## Validation
Input validation and data sanitization are performed using Joi, ensuring that data entering and leaving the API meet defined criteria, enhancing overall security and data integrity.




<br>



<a id="Feedback_Contributing"></a>

## Feedback and Contributing
I'm excited to hear your <u><a href="https://forms.gle/mUQJdnGPey1atnzp9" target="_blank">feedback</a></u> and discuss potential collaborations and if you'd like to contribute, please fork the repository, make your changes, and submit a pull request.



<br>



<a id="License"></a>

## License
This project is licensed under the [MIT license](LICENSE).


<br>

