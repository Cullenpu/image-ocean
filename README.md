![Image Ocean](client/src/res/logo_small.svg)

Image Ocean is an image repository featuring support for public and private photos for users. Users can view their own photos, both public and private, or all public photos in the repository in a beautiful image gallery.

## Installation

```bash
# Clone into image-ocean directory
git clone https://github.com/Cullenpu/image-ocean.git

# Install backend dependencies
cd image-ocean
npm install

# Install frontend dependencies
cd client
npm install
```

## Usage

1. Start the database.

```bash
mkdir mongo-data
mkdir uploads
mongod --dbpath mongo-data
```

2. Start the backend server.

```bash
npm start
```

3. Start the frontend.

```bash
cd client
npm start
```
