Frontend (React + Vite)
Frontend URL: http://localhost:5173
The frontend allows users to interact with the backend to perform CRUD operations on users, study sessions, and session notes.
Main Files:
App.jsx: The main entry point for the frontend application.


#Key Features:
Users can register, and manage their data.
Users can create, read, and delete their study sessions.
Users can create, read, and delete session notes associated with a study session.

#Connecting Backend to Frontend:
The frontend communicates with the backend using HTTP requests via fetch.
CORS is configured on the backend to allow requests from http://localhost:5173 (frontend) during development.
The frontend uses React state and hooks to manage the data, and components are organized for modularity.

#Getting Started
#Prerequisites
Python 3.8+ for the backend
Node.js 16+ for the frontend
Backend Setup:
Clone the repository:

bash
Copy code
git clone https://github.com/your-repo/study-session-manager.git
cd study-session-manager/backend
Install dependencies:
pip install -r requirements.txt
Set up the database (this will create the sessionManager.sqlite file):

Running the backend server
uvicorn main:apk --reload

uvicorn main:apk --reload
The backend will be available at http://127.0.0.1:8000.

Frontend Setup:

git clone https://github.com/your-repo/study-session-manager.git
cd study-session-manager/frontend
Install dependencies:

npm install
Run the frontend server:

npm run dev
The frontend will be available at http://localhost:5173.

Contribution
Feel free to contribute to this project by opening an issue or submitting a pull request. Please follow the coding standards and guidelines when contributing.

License
This project is licensed under the MIT License - see the LICENSE file for details.
