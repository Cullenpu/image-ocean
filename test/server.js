const mongoose = require("mongoose");
const { User } = require("../models/user");
const { Image } = require("../models/image");

const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../server");

chai.use(chaiHttp);
chai.should();

describe("User API", () => {
  const user = { username: "test", password: "test" };

  before((done) => {
    User.deleteMany({}, (err) => console.log("Users cleared"));
    done();
  });

  it("should create a user", (done) => {
    chai
      .request(app)
      .post("/users")
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("should log in as created user", (done) => {
    chai
      .request(app)
      .post("/users/login")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("id");
        done();
      });
  });

  it("should not log in as a user that doesn't exist", (done) => {
    const fakeUser = { username: "test2", password: "test2" };
    chai
      .request(app)
      .post("/users/login")
      .send(fakeUser)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("Image API", () => {
  before((done) => {
    Image.deleteMany({}, (err) => console.log("Images cleared"));
    done();
  });

  it("should upload an image", (done) => {
    chai
      .request(app)
      .post("/images")
      .field("name", "TestImage.png")
      .field("width", "1000")
      .field("height", "571")
      .field("caption", "Test Caption")
      .field("private", "false")
      .attach("image", "./test/TestImage.png", "TestImage.png")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should get the uploaded image", (done) => {
    chai
      .request(app)
      .get("/images")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        done();
      });
  });
});
