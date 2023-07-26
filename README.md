Welcome to the amazing project! This document will guide you through the necessary steps to get the project up and running on your local machine. Make sure you follow each step carefully.

#### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Git
- Node.js and npm
- Visual Studio Code (VSCode) or any preferred code editor.
- An active ElephantSQL account.

#### Getting Started

1. Copy the SSH key from the GitHub Repository.
2. Open your terminal and navigate to the desired directory using the command cd <write file path here>.
3. Run the command git clone <Paste SSH key here>.
4. Navigate into the project directory
5. Install the required dependencies using npm install
6. Open your browser and navigate to the ElephantSQL website and sign up.
7. Create an instance within ElephantSQL.
8. Copy the URL from the Details section of your instance.

#### Setting Environment Variables

1. In the project's server folder, create a file named .env.
2. Open the .env file and paste the following contents:
   PORT=3002
   DB_URL=<Paste the Database URL here>
   TEST_DB_URL=<Repeat the process of making a new database if you need to do testing>
   BCRYPT_SALT_ROUNDS=10

   Please name your server variable like this in a .env file on the frontend:

   `VITE_SERVER=http://localhost:3000`

#### Running the Project

1. In the terminal, navigate to the server folder:
2. Run the following command to start the development server: npm run dev
   To view the project in your browser, open the index.html file located inside the client and homepage directories using your preferred live server.
   That's it! Your project should now be up and running on your local machine. Enjoy working on the project and feel free to explore the codebase to make changes and improvements. Happy coding!

#### Contributors

- Alex Earle
- Amal
- Hussein Raji
- Jacob Brooks
- Roberta Capuano
