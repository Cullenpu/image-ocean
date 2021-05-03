# Image Repository

## Usage

1. Create the necessary folders for the backend and database.
```bash
mkdir mongo-data
mkdir uploads
```

2. Install requried packages in the backend and frontend.
```bash
npm install
cd client
npm install
```

3. Start the database.
```bash
mongod --dbpath mongo-data
```

4. Start the backend server.
```bash
npm start
```

5. Start the frontend.
```bash
cd client
npm start
```