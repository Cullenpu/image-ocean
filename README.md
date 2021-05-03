# Image Repository

## Usage

1. Create the necessary folders for the backend and database.
```bash
mkdir mongo-data
mkdir uploads
```

2. Start the database.
```bash
mongod --dbpath mongo-data
```

3. Start the backend server.
```bash
npm start
```

4. Start the frontend.
```bash
cd client
npm start
```