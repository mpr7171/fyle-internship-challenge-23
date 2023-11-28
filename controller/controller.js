import fetch from "node-fetch";

// Get User Data
export const getUserData = async (req, res) => {
  const username = req.params.username;
  try {
    let data = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos`),
    ]).then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(
        responses.map(function (response) {
          return response.json();
        })
      );
    });

    if (data[0].message == "Not Found") {
      throw new Error("Invalid GitHub Username!!");
    } else if (data[0].message || data[1].message) {
      throw new Error(
        "GitHub API Limit Exceeded!! Reset Time is 1 hour, So please check it after 1 hour."
      );
    }

    const user = {
      name: data[0].name,
      profile_image: data[0].avatar_url,
      bio: data[0].bio,
      location: data[0].location,
      github_link: data[0].html_url,
      twitter_link: "https://twitter.com/" + data[0].twitter_username,
      message: data[0].message,
    };

    var repos = [];
    var repo = {};
    var languageUrls = [];

    for (let i = 0; i < data[1].length; i++) {
      languageUrls.push(data[1][i].languages_url);
      repo = {
        name: data[1][i].name,
        description: data[1][i].description,
        repo_link: data[1][i].html_url,
      };
      repos.push(repo);
    }

    let languageData = await Promise.all(
      languageUrls.map((url) => fetch(url))
    ).then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(
        responses.map(function (response) {
          return response.json();
        })
      );
    });

    for (let i = 0; i < repos.length; i++) {
      if (languageData[i].message) {
        throw new Error(
          "GitHub API Limit Exceeded!! Reset Time is 1 hour, So please check it after 1 hour."
        );
      }
      repos[i].languages = Object.keys(languageData[i]);
    }

    user.repos = repos;
    res.json(user);
  } catch (error) {
    if (error.message === "Invalid GitHub Username!!") {
      res.status(404).send({
        message:
          error.message || "Error occurred while retriving user information!!",
      });
    } else {
      res.status(429).send({
        message:
          error.message || "Error occurred while retriving user information!!",
      });
    }
  }
};

// Used only for failure test case = "Invalid UserId Provided and server returns error 404"
export const getUserDemo = async (req, res) => {
  const username = req.params.username;
  try {
    let data = await fetch(`https://api.github.com/users/${username}`);
    data = await data.json();
    console.log(data);

    if (data.message) {
      throw new Error("Given Username not found!!");
    }
  } catch (error) {
    res.status(404).send({
      message:
        error.message ||
        "Error occurred while retriving user demo information!!",
      code: "User Not Found",
    });
  }
};
