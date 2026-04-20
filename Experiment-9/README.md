# Experiment 9 – Dockerize React Application
## Personal Information
Name: Jiya Rohilla  
UID: 24BDA70219  
Group: 24BDS-2 B 

## Aim

To containerize a React application using Docker multi-stage build.

## Tools Used

React, Docker, Nginx

## Steps

1. Created React app
2. Built production build
3. Created Dockerfile
4. Used Nginx to serve app
5. Ran container on port 8080

## Commands

docker build -t experiment9-app .
docker run -p 8080:8080 experiment9-app

## Output

* React app runs on http://localhost:8080
* Optimized Docker image
* Nginx server used
