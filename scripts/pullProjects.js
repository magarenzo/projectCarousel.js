const githubScraper = require("github-scraper");
const fs = require("fs");
const profileName = "magarenzo";

// grab profileData of user specified in profileName
githubScraper(profileName, function(err, profileData) {
    if (err) throw new Error("githubScraper error on profileData: " + err);
    else {

        // write profileData to json file
        fs.writeFile("json/profileData.json", JSON.stringify(profileData, null, 2), err => {
            if (err) throw new Error("writeFile error on profileData.json: " + err);
            else {

                // if profileData has object we need, get str of each repo
                if (profileData.pinned) {
                    Object.keys(profileData.pinned).forEach(function(key) {
                        var str = JSON.stringify(profileData.pinned[key]);
                        var repo = str.substring(str.lastIndexOf(profileName + "/"), str.lastIndexOf('"}'));

                        // use str of repo name to grab that repo's data
                        githubScraper(repo, function(err, repoData) {
                            if (err) throw new Error("githubScraper error on repoData: " + err);
                            else {

                                // write that repo's data to file
                                fs.writeFile("json/repos/" + repo.substring(10) + ".json", JSON.stringify(repoData, null, 2), err => {
                                    if (err) throw new Error("writeFile error on repoData: " + err);
                                });

                            } // end else
                        });

                    });
                }

            } // end else
        });

    } // end else
});