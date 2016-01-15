// Set your user here - refer to config.js
var user = mykah;

 
  $(document).ready(function()
      {
          
      }
  );

  SC.initialize({
    // Get this after initializing your app on https://soundcloud.com/you/apps
    client_id: CLIENT_ID
      });

  // permalink to a track
  var track_url = user.track_url;
  var playlist_url = user.playlist_url;

  var map = new Map();
    var buyerData = {
      labels : [],
      datasets : [
        {
          fillColor : "rgba(172,194,132,0.4)",
          strokeColor : "#ACC26D",
          pointColor : "#fff",
          pointStrokeColor : "#9DB86D",
          data : []
        }
      ]
    }

  var Track = function(trackname, playcount) {
    this.trackname = trackname;
    this.playcount = playcount;
    //console.log('Track initialized ' + trackname + ' ' + playcount);
  };


  var getComments = function (track) {
    return SC.get('/tracks/' + track.id + '/comments');
  };

  var listComments = function (comments) {
    comments.forEach(function(comment){
      console.log(comment.body);
    });
  };

  var getPlayBackCount = function(track) {
    console.log("swtf");
    return SC.get('/tracks/' + track.id);
  };

  var printPlayBack = function(track){
    console.log(track.playback_count);
  };

  var getTracksinPlayList = function(playlist){
    return SC.get('/playlists/' + playlist.id);
    };

  var printTracksinPlayList = function(playlist){
    playlist.tracks.forEach(function(track) {
      //console.log(track.title + ' ' + track.playback_count);
      //var trackspecific = new Track(track.title, track.playback_count);
      map.set(track.title, track.playback_count);
      //console.log(map);
    });
  };

  var printMap = function(){
    console.log(map);
    console.log(map.get(238914974 ));

    for (var key of map.keys()){
      console.log("key: " + key + " value: " + map.get(key));
      //$('#twic-table').append('<tr><td>' + ' </td><td>33</td></tr>');

      $('#twic-table').append('<tr><td>' + key + '</td><td>' + map.get(key) + ' </td></tr>');
      buyerData.labels.push(key);
      buyerData.datasets[0].data.push(map.get(key));

    }
    $("#twic-table").tablesorter();


    //$('#twic-table').append('<tr><td>' + ' </td><td>33</td></tr>');

  }

// TODO: move buyerData to printMap to grab labels (track.title) and plots (track.playcount)
var plotGraph = function() {
    console.log(buyerData.labels);
    buyerData.labels.push("luck");
    console.log(buyerData.labels);

    var buyers = document.getElementById('buyers').getContext('2d');
    new Chart(buyers).Line(buyerData);
    
    
  }

  var getMap = function() {
    alert("sup");
  }

  SC.resolve(playlist_url).then(getTracksinPlayList).then(printTracksinPlayList).then(printMap).then(plotGraph);

  //SC.resolve(track_url).then(getPlayBackCount).then(printPlayBack);
  //  SC.resolve(track_url).then(getComments).then(listComments);
