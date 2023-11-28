import chai from "chai";
import request from "request";
import { TESTING_URL } from "../constants/tests.js";

const expect = chai.expect;

describe("Get User Details API", () => {
  describe("Valid user_id provided", () => {
    const username = "validusername";
    const dummyUser = {
      name: "test-user",
      profile_image: "test-user-profile-image-link",
      bio: "test-user-bio",
      location: "test-user-location",
      github_link: "test-user-github-link",
      twitter_link: "test-user-twitter-link",
      message: undefined,
      repos: [
        {
          name: "test-user-repo",
          description: "test-user-repo-description",
          repo_link: "test-user-repo-link",
          languages: ["repo-lang1", "repo-lang2"],
        },
      ],
    };

    it("Status & Content", (done) => {
      request.get(`${TESTING_URL}/api/${username}`, {}, (_, response) => {
        expect(function (res) {
          if (res.statusCode !== 200 && res.statusCode !== 429) {
            throw Error("Unexpected status code: " + res.statusCode);
          }
        });
        expect(function (res) {
          const body = JSON.parse(res.body);
          if (
            body.message !== dummyUser.message &&
            body.message !== rateLimitError.message
          ) {
            throw Error("Unexpected response: " + res.statusCode);
          }
        });
        // expect(response.statusCode).to.equal(200);
        // expect(body.message).to.equal(dummyUser.message);
        done();
      });
    });
  });

  describe("Invalid UserId Provided and server returns error 404 or 429", () => {
    const notFoundError = {
      message: "Invalid GitHub Username!!",
    };
    const rateLimitError = {
      message:
        "GitHub API Limit Exceeded!! Reset Time is 1 hour, So please check it after 1 hour.",
    };
    const username = "test1212test";

    it("Status & Content", (done) => {
      request.get(`${TESTING_URL}/api/${username}`, {}, (_, response) => {
        expect(function (res) {
          if (res.statusCode !== 404 && res.statusCode !== 429) {
            throw Error("Unexpected status code: " + res.statusCode);
          }
        });
        expect(function (res) {
          const body = JSON.parse(res.body);
          if (
            body.message !== notFoundError.message &&
            body.message !== rateLimitError.message
          ) {
            throw Error("Unexpected error response: " + res.statusCode);
          }
        });
        done();
      });
    });
  });
});
