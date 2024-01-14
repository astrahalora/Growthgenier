# About

Fully reponsive MERN project initialized with Vite, complete with:

- custom 404 Page not found
- custom logo designed with LeonardoAi
- custom growth tracker image made by **astrahalora** and some edited content from LeonardoAi 
- easy navigation with react-router-dom
- MongoDB server connection for data
- project creator that generates an editable TODO list
- profile growth tracker
- project list
- loading page (with icon from Pixabay)
- error page
- functional components

![growthgenier main page](https://images2.imgbox.com/c0/35/K22B7pp9_o.jpg)

## Technologies

- React (frontend JavaScript library for building user interfaces based on components)
- Node.js (backend JavaScript runtime environment)
- Express.js (backend web application framework for building RESTful APIs with Node.js)
- MongoDB (NoSQL database program)
- Bootstrap (CSS framework)
- SCSS (CSS preprocessor)

# Setup

## Server side

### Install dependencies

Open the terminal and navigate to the client directory. Once inside, run this command:

```
npm install
```

### Connect to MongoDB

This server runs based on a MongoDB cluster. You need a MongoDB account and available cluster to initialize the database.

Create a .env file in the server directory.

Check out the .env.example file to see how the link to your cluster is recommended to look. Fill out the .env file with this info (can copy paste the example and change the username and password).

### Starting the server

Run the following command in your terminal while inside the server directory:

```
node server
```

To run it with nodemon:

```
npm run dev
```

Your local server should now be running!

## Client side

### Install Dependencies

Open the terminal and navigate to the client directory. Once inside, run this command:

```
npm install
```

### Start client 

From inside the client directory, run this command in the terminal:

```
npm run dev
```

You should see in the terminal that the client has been started at: http://localhost:5173/
You can CTRL + click on the link or copy + paste it in your browser. 

# Feature Details

## Growth Profile

- variable welcome message based on level of growth
- flowers will be added to the image planter as the Completed count goes up (for presentation purposes 5 levels available)
- Completed and In Progress project counts
- button to start a new project, leading to Project Creator
- button to load the latest created unfinished project or the latest created completed project if all are completed

![growthgenier growth profile](https://images2.imgbox.com/78/06/QEa4yIQR_o.jpg)

## Project Creator

A form where you can input a name and add and remove as many tasks as desired. 
- will not be submitted without a name or at least one task
- tasks are saved in local storage before project submission

![growthgenier project creator](https://images2.imgbox.com/e0/a6/Eoimyne3_o.jpg)

## Project

Following form submission, you will be redirected to the resulting TODO table. 
- color coded task items (purple for todo and green for completed), dynamically changing based on clicked or unclicked Completed
- incomplete task items are dynamically featured before completed ones
- edit function to change the name of the task (turns to input field)
- delete function to remove task from list
- add task function to add a new task to the list
- progress bar at the bottom that dinamically changes (if all tasks are completed, will change to Completed, if a new task is added or unckeched, it reverts to In Progress)

![growthgenier TODO table](https://images2.imgbox.com/a3/e8/j9fTUl7o_o.jpg)

## Project List

The Projects page features a list of all projects sorted from most recent to oldest.
- displays progress bar (based on number of completed tasks) and completion status icon for each project
- sorting options: All Projects, Completed, In Progress
- name based searching 
- resume project function which opens up the project
- delete project function which removes the project from the database

![growthgenier projects list](https://images2.imgbox.com/0c/59/BKftvNvM_o.jpg)

### Sorting

![growthgenier project sorting](https://images2.imgbox.com/f5/fa/1VyFEgxq_o.jpg)

### Searching 

Searching is performed within the category selected through sorting (default All Projects)
- search output changes on page with every new letter added or subtracted

![growthgenier project searching](https://images2.imgbox.com/d5/56/aSzHrR2R_o.jpg)

## Instance of Mobile Views

![growthgenier profile and project creator on mobile](https://images2.imgbox.com/b9/c3/SMULd7Jy_o.jpg) 
![growthgenier project and projects on mobile](https://images2.imgbox.com/da/24/iTZsJUP6_o.jpg) 