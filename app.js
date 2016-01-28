// User defined variables
var port = 3001;
var plex_location = '/Applications/Plex\\ Media\\ Server.app/Contents/MacOS/Plex\\ Media\\ Scanner';
var movie_section = 1;
var tv_section = 2;

// App variables
var terminal = require('child_process').spawn('bash');
var express = require('express');
var app = express();

var refresh = function(section_name) {
  var date = new Date();
  console.log(date.toUTCString() + ': Refreshing ' + section_name);
  var args = '--scan --refresh'

  if (section_name === 'movies') {
    args = args + ' --section 1';
  } else if (section_name === 'shows') {
    args = args + ' --section 2';
  }

  var input = plex_location + ' ' + args + '\n';
  terminal.stdin.write(input);
}

app.post('/update_shows', function (req, res) {
  refresh('shows');
  res.status(200).end();
});

app.post('/update_movies', function (req, res) {
  refresh('movies');
  res.status(200).end();
});

app.listen(port, function() {
  console.log('\nplex-refresh listening on port ' + port + '\n');
});

