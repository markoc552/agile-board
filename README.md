## Agile board

#### Mockup application of Jira board

Features

 * **1.** Create a ticket
 * **2.** Add a ticket to sprint and start a sprint
 * **3.** Search issues
 * **4.** Supports multiple companies


## Guide to installation

 * **1.** Clone the repository
 * **2.** Open deployment folder located in root of repository
 * **3.** Open terminal in deployment folder
 * **4.** After that build and start up application with following command: ./start.sh --build --start

 If you attend problems with running the shell script run the following command to make it executable: **chmod +rwx start.sh**


 When you do all the steps application should be running on http://localhost:3000

 **Notice**
 If you don't want to run application via Docker then run following commands:
  * **1.** Run command: yarn install
  * **2.** After it finishes run following command: yarn start 
 Application should be running at http://localhost:3000


© Marko Perajica 2021.
