![Image Ocean](client/src/res/logo_small.svg)

Image Ocean is an image repository featuring support for public and private photos for users. Users can view their own photos, both public and private, or all public photos in the repository in a beautiful image gallery.

Using Image Ocean is simple. Users can create an account by entering their desired username and password and clicking `Sign Up`, provided their username hasn't been taken and password at least 4 characters long. Once logged in, users are greeted by the `Gallery` page which shows all the public photos in the reporitory. Users can then either navigate to the `Personal` page, which shows them all the photos they personally uploaded including private ones. When uploading an image, an optional caption as well as a private option can be specified.

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

## Test

Run `npm test` to run the test suite testing the backend API calls.
