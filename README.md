School ERP Backend Management
This project is a backend API for a School ERP system where Teachers can manage student data and assignments, while Students can view and submit assignments. It includes JWT-based authentication with role-based access control (Teacher/Student), MongoDB for database operations, and RESTful API design principles.

Features
JWT-based authentication for secure access
Role-based access control for Teachers and Students
Manage student data (CRUD operations)
Manage assignments (view, create, submit)
Secure storage of sensitive information using .env
MongoDB for efficient data handling
Input validation and error handling
API documentation and testing

Technologies Used
Node.js (Runtime)
Express.js (Web Framework)
MongoDB (Database)
Mongoose (ODM for MongoDB)
JWT (Authentication)
Mocha/Jest (Testing)
dotenv (Environment Variables)

steps involed
clone the repository
install dependencies using command npm install
mongoose connection with the server using mongodb including token and url of mongo in env file

API Endpoints
POST ,get,put,delete

Testing
Done using Mocha and executing command npm test.

Git commands
git add .
git commit -m "message"
git push

This project follows Git for version control with frequent commits. The .env file is ignored via .gitignore to maintain security.

