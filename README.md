# Half Life Assignment
Both Backend and Frontend projects are in this repository. Please read the instructions below before running the project

# Prerequisites to run the project
Tool | Version
--- | ---
Postgresql | v16.0
Node.js | v18.17.1
React | v18.2.0

# How to run the system locally
- Backend
  1. Clone the project, open **half-life-assignment-backend** folder
  2. Run **npm install** command in terminal
  3. Change the **POSTGRES_CONNECTION_STRING** value in ./const/constants.js according to your local setup.
  4. Run node **./app.js** command in terminal
- Frontend
  1. Clone the project, open **half-life-assignment-frontend** folder
  2. Run **npm install** command in terminal
  3. Run node **npm start** command in terminal
  4. Open **http://localhost:3000** and check the preview

# Special note
According to the requiremnt document provided, an **ADMIN ROLE** related developments are not concidered. But the status of the **shipment** has to be updated by an Admin user. Therefore **for the testing purpose only** I have created an open API to update the status of the shipment.

PATCH: http://localhost:8000/api/v1/shipment/:shipmentId/status/:status

Availabe statuses are:- SHIPMENT_CREATED, SHIPMENT_PICKED_UP, IN_TRANSIT, DELIVERED


