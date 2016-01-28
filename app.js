// User defined variables
var port = 3001;
var plex_location = '/Applications/Plex\\ Media\\ Server.app/Contents/MacOS/Plex\\ Media\\ Scanner';
var movie_section = 1;
var tv_section = 2;

// App variables
var terminal = require('child_process').spawn('bash');
var express = require('express');
var app = express();
var last_scanned_movies, last_scanned_shows;

function timeOrNever(time) {
  return (typeof time !== 'undefined' && time) ? time.toUTCString() : "never";
}

function refreshSection(section_name) {
  var date = new Date();
  console.log(date.toUTCString() + ': Refreshing ' + section_name);
  var args = '--scan --refresh'

  if (section_name === 'movies') {
    args = args + ' --section 1';
    last_scanned_movies = date
  } else if (section_name === 'shows') {
    args = args + ' --section 2';
    last_scanned_movies = shows
  }

  var input = plex_location + ' ' + args + '\n';
  terminal.stdin.write(input);
}

app.post('/update_shows', function(req, res) {
  refreshSection('shows');
  res.status(200).end();
});

app.post('/update_movies', function(req, res) {
  refreshSection('movies');
  res.status(200).end();
});

app.get('/', function(req, res) {
  res.send(
      '<h1><a href="http://github.com/squarefrog/plex-refresh">plex-refresh</a></h1>' +
      '<p>Movies refreshed at: <em>' + timeOrNever(last_scanned_movies) + '</em></p>' +
      '<p>Shows refreshed at: <em>' + timeOrNever(last_scanned_shows) + '</em></p>'
      );
});

app.listen(port, function() {
  console.log('\nplex-refresh listening on port ' + port + '\n');
});

