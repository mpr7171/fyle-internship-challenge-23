# Fyle-Internship-Challenge-23

There are 2 parts to the project:

1.Frontend
Angular single-page application (SPA) that takes a GitHub username as input and displays the public Github repositories belonging to the user.
If the username is invalid, should show an error page indicating an invalid GitHub username.

2.Backend
REST API service (NodeJS)
Each endpoint has to internally call Github’s APIs to fetch the data required for the frontend application to work.

## Steps to Run the App Locally:

1.Clone the project
  git clone https://github.com/Gopi1422/github-repo-listing.git
  
2.Go to the project directory
  cd github-repo-listing
  
3.Install dependencies
  npm install
  
4.Install Client dependencies
  cd frontend/ 
  npm install –g @angular/cli
  npm install
  
5.Start the server
  npm start
  
6.Start the client
  cd frontend/
  ng serve