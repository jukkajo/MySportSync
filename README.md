
# MySportSync

This is basic app to save and display multiple sports events that are held between two teams. App supports various sport types and it allows you to save teams playing, set place of event and decide starting time and date.

**App has:**
- PostgreSQL database
- Node.js / Fastify backend-server
- Javascript / React client 

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




