# forkpad: remix wattpad stories 🍴📖

The goal of [forkpad.me](http://forkpad.me/) is to give wattpad users a feedback loop to share and remix each other's stories.

The secondary goal is to allow for Drake fanfic to dominate popular culture, and give it the audience it deserves. See: [50 Shades of Drake](http://www.wattpad.com/story/30644165-50-shades-of-drake-drake-fanfic-series) for more on this critical topic.

This project came from [http://codexhackathon.com/](http://codexhackathon.com/)


## How to get forkpad running locally

* Run `git clone https://github.com/pippinlee/forkpad.git`
* Run `npm install` from within the forkpad repo to install all dependencies
* You'll need to have mongo installed and have `mongod` running to start the daemon process
* If you don't have mongo installed already you can install it with homebrew by running `brew install mongo`
* See [docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/) for more mongo install details
* Once mongo is setup you should now be able to run `node index.js . 4000` to start the app
	* The first `.` argument tells node what directory to run in
	* The second argument `4000` is a port that you choose to run the app on


## Tests

* There are four small tests that can be run with `mocha`

Currently we test that:

* The API can fetch a wattpad part
	* The API fails nicely if it doesn't
* Mongo can be written to successfully
* We can fetch from our mongo document

## Feedback

This project is still young so we'd ❤️ to hear about any bugs, or features you'd like to see in forkpad. You can create an issue here: [github.com/pippinlee/forkpad/issues](https://github.com/pippinlee/forkpad/issues)

![young drake](http://media.giphy.com/media/MkC7MRSxLXUxG/giphy.gif)
