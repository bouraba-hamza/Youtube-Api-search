
// la méthode load est appelée après le chargement de l'api javascript google
function load() {
    var q1 = localStorage.getItem("searchvalue");
    gapi.client.setApiKey("AIzaSyDNqoQhf2IpAftF02GUlVie3aeOnqA_6_4");
    gapi.client.load('youtube', 'v3', requestVideoPlaylist);
}

var nextPageToken, prevPageToken;
function requestVideoPlaylist(q1, pageToken) {
    var q1 = localStorage.getItem("searchvalue");
    $('.sanadtech').html('');
    var requestOptions = {
        q: q1,
        part: 'snippet',
        maxResults: 10
    };
    if (pageToken) {
        requestOptions.pageToken = pageToken;
    }
    var request = gapi.client.youtube.search.list(requestOptions);
    request.execute(function(response) {
        // Only show pagination buttons if there is a pagination token for the
        // next or previous page of results.
        console.log(response.result);
        nextPageToken = response.result.nextPageToken;
        var nextVis = nextPageToken ? 'visible' : 'hidden';
        $('#next-button').css('visibility', nextVis);
        prevPageToken = response.result.prevPageToken;
        var prevVis = prevPageToken ? 'visible' : 'hidden';
        $('#prev-button').css('visibility', prevVis);

        var playlistItems = response.result.items;
        if (playlistItems) {
            $.each(playlistItems, function(index, item) {
                displayResult(item.snippet,item.id);
            });
        }
    });
}

// Create a listing for a video.
function displayResult(videoSnippet,videourl) {

    var img = new Image(300,300); // width, height values are optional params
    img.src = videoSnippet.thumbnails.high.url;
    $('.sanadtech').append('<h1>'+videoSnippet.title+'</h1>');
      var url= videourl.videoId;


    console.log(url);
    //$('.sanadtech').append('<a id="test" href="hello">lien de la video</a>');
    var createA = document.createElement('a');
    var createAText = document.createTextNode("le lien de la video");
    createA.setAttribute('href', 'https://www.youtube.com/watch?v='+url);
    createA.appendChild(createAText);
    $('.sanadtech').append(createA);
    $('.sanadtech').append(img);
}

// Retrieve the next page of videos in the playlist.
function nextPage() {
    var q1 = localStorage.getItem("searchvalue");
    requestVideoPlaylist(q1, nextPageToken);
}

// Retrieve the previous page of videos in the playlist.
function previousPage() {
    var q1 = localStorage.getItem("searchvalue");
    requestVideoPlaylist(q1, prevPageToken);
}

