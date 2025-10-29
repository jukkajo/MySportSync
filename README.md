# MySportSync

<video src="https://github.com/user-attachments/assets/0ce98ceb-4828-4fec-8ea8-20801265875c" width="600" controls>
  Your browser does not support the video tag.
</video>

This is lighweight web-app to save and display multiple sports events that are held between two teams. It supports various sport types, allows adding teams, selecting venues, and scheduling event date and time. Built as a demo for a developer job application. Future improvements may include user authentication, token-protected data transmission, role-based permissions, and UI-wise mobile optimization.

**Tech Stack:**
- PostgreSQL database
- Node.js / Fastify backend-server
- Javascript / React client 

**Assumptions and Development Decisions:**
-  The app is designed to list and manage sports events: live score tracking or real-time updates may be added later.

-   Authentication is not implemented, but the project structure is prepared for future auth and user roles.
    
-   Architecture is set scalability in mind: modular backend, component-based client.
    
-   Home page shows live and upcoming events, plus a quick form for adding new events with existing registered teams.
    
-   Basic form validation is included as a starting point.
    
-   Team selection uses a dynamic search instead of a long dropdown for better UX.
    
-   Each event stores its timezone to avoid confusion across regions.
    
-   Live status is determined based on the event’s own timezone.
## Steps to run:

### Requirements
- **Node.js 20 (LTS)** – tested with `v20.19.0`
- **npm 10** – tested with `v10.8.2`
- **Docker 28** – tested with `28.1.1+1`
- **Docker Compose v2.33+** – tested with `v2.33.1`

### 1. Database: Deploy & Init. 
Run at project root:
```
sudo docker compose up -d
```
This starts PostgreSQL and initializes the database. Optional -> To connect app's database, run at project root:
```
 sudo docker exec -it sports_events_calender_postgres psql -U sports -d sports_events_calender
 ```

### 2. Backend: Start the Backend API
Navigate to **/backend** :

```
cd backend
```

Then, create **.env** file and add e.g:

```env
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=sports
DB_PASSWORD=radar
DB_NAME=sports_events_calender
```

Install dependencies and start server:
```
npm install
node server.js
```

### 3. Frontend: Start Client
Open a new terminal and navigate to the frontend folder:

```
cd frontend
```

Install dependencies and start client:
```
npm install
npm run dev
```

## Try it

To test app's client, go to:
```
http://localhost:5173/
```
