`plex-refresh` is a small Node application acts as a web hook to facilitate refreshing a Plex server.

### Why?

[Sonarr](https://github.com/Sonarr/Sonarr) supports [Plex](http://plex.tv) notifications out of the box, so you may want to know my rationale for this project.

For some reason, using built in Plex notifications caused [an issue](https://github.com/Sonarr/Sonarr/issues/1093) with my setup where the triggered refresh would __remove__ items from my Plex library. Thankfully, Plex scanner has a [command line interface](https://support.plex.tv/hc/en-us/articles/201242707-Plex-Media-Scanner-via-Command-Line), so I thought it would be a nice simple project for me to try Node.

### Installing the app

First clone the repository:

```bash
$ git clone https://github.com/squarefrog/plex-refresh.git
```

Then install the dependencies:

```bash
$ cd plex-refresh
$ npm install
```

### Edit the `app.js` file

At the top of `app.js` there are some variables that you may want to tweak to setup `plex-refresh` for your setup.

```node
var port = 3001;
var plex_location = '/Applications/Plex\\ Media\\ Server.app/Contents/MacOS/Plex\\ Media\\ Scanner';
var movie_section = 1;
var tv_section = 2;
```

You can request section numbers directly from Plex Media Scanner using:

```bash
path/to/Plex\ Media\ Scanner --list
```

### Install the `launchd`

In order to get the `plex-refresh` server to run continuously in the background in OS X, you need to use a [launch daemon](http://launchd.info/).

### Setting up the web hook

To use the app simply send a `POST` request to either `/update_movies' or '/update_shows'.

### Suggestions?

As this is the first Node app I've created, theres a strong possibility that theres a better way of doing things. If you have any suggestions for cleaner code or a more appropriate way of performing this function, feel free to [open an issue](https://github.com/squarefrog/plex-refresh/issues/new).

