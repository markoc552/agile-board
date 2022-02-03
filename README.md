## Agile board

#### Mockup application of Jira board

![Agile_board](/assets/cover-image.png)
![Agile_board](/assets/board-image.png)

**Features**

 * Create a ticket
 * Add a ticket to sprint and start a sprint
 * Search issues
 * Supports multiple companies

**Technologies**
 * FE: React and Redux
 * BE: Microservice architecture created with Java and Spring Boot
 * DB: PostgreSQL
 * SSL encryption between services

## Guide to installation

 * **1.** Clone the repository
 * **2.** Open deployment folder located in root of repository
 * **3.** Open terminal in deployment folder
 * **4.** After that build and start up application with following command: ./start.sh --build --start

 If you attend problems with running the shell script run the following command to make it executable: **chmod +x start.sh**

 **Note:** This app uses SSL for communication between services. If you didn't do this already make sure you past the following command in the place where you put url inside chrome and press enter.

 The command: ***chrome://flags/#allow-insecure-localhost***. This will enabling SSL certificates for localhost. Otherwise you won't be able to properly run application.

 When you do all the steps application should be running on http://localhost:3000
 

© Marko Perajica 2020.
