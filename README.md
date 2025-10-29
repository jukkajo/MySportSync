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
- The app focuses on listing sports events with essential info: real-time updates or live game tracking may be integrated later
- The current home page represents the view shown after a succesful (future) user login.
- Authentication is not yet implemented, but the client and backend structures ate prepared for adding auth later.
- The project uses a clean, scalable architecture for smooth transition to production later on (modular backend with clear task-division, component-based frontend).
- Home page provides a quick overview of live and upcoming events, sided with an easy event creation-form, using existing registered teams.
- Basic form validation is implemented as a foundation, intended to be expanded later.
- Dynamic REST-based team search is used instead of a long dropdown for better UX.
- Events store the timezone in the database to ensure clarity, but no automatic timezone conversion is applied on the UI to avoid issues with VPN and privacy-related location requests.
- Event-live marker is shown respect to time of event-location.

## Steps to run:

### 1. Database: Deploy & Init. 
Run at project root:
```
sudo docker compose up -d
```

### 2. Backend-Server: Install Dependencies, Set Environment & Start
First, navigate to directory **/backend**.
Then, create **.env** file and add:

```env
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=sports
DB_PASSWORD=radar
DB_NAME=sports_events_calender
```

And run
```
npm install
node server.js
```

### 3. Client: Install Dependencies & Start
Run in directory **/frontend**:
```
npm install
npm run dev
```

## Try it

To test app's client, go to:
```
http://localhost:5173/
```
To connect app's database, run at project root:
```
 sudo docker exec -it sports_events_calender_postgres psql -U sports -d sports_events_calender
 ```




