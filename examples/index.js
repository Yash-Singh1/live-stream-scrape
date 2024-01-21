// AppLab used ES3, so we can't use ES5 features such as arrow functions and template literals

var streamers = [];
var editIdx = -1;

function genLinkCallback(link) {
  return function() {
    open(link);
  };
}

function genEditCallback(streamerIdx) {
  return function() {
    editIdx = streamerIdx;
    setText("editStreamerTwitchInput", streamers[editIdx].twitch);
    setText("editStreamerYoutubeInput", streamers[editIdx].youtube);
    setScreen("editStreamer");
  };
}

function refreshStreamers(indices) {
  for (var i = 1; i <= 4; ++i) {
    if (indices.indexOf(i-1) === -1) continue;
    if (i >= streamers.length + 1) {
      hideElement("streamer" + i + "Border");
      hideElement("streamer" + i + "EditIcon");
      hideElement("streamer" + i + "Name");
      hideElement("streamer" + i + "Youtube");
      hideElement("streamer" + i + "Twitch");
    } else {
      showElement("streamer" + i + "Border");
      showElement("streamer" + i + "EditIcon");
      showElement("streamer" + i + "Name");
      showElement("streamer" + i + "Youtube");
      showElement("streamer" + i + "Twitch");
      setText("streamer" + i + "Name", streamers[i - 1].twitch);
      setImageURL(
        "streamer" + i + "Twitch",
        "https://live-stream-scrape.vercel.app/api/" + streamers[i - 1].twitch + "/twitch?" + Date.now()
      );
      setImageURL(
        "streamer" + i + "Youtube",
        "https://live-stream-scrape.vercel.app/api/" + streamers[i - 1].youtube + "/youtube?" + Date.now()
      );
      onEvent(
        "streamer" + i + "Twitch",
        "click",
        genLinkCallback("https://twitch.tv/" + streamers[i - 1].twitch)
      );
      onEvent(
        "streamer" + i + "Youtube", 
        "click",
        genLinkCallback("https://youtube.com/@" + streamers[i - 1].youtube)
      );
      setStyle("streamer" + i + "Twitch", "cursor: pointer;");
      setStyle("streamer" + i + "Youtube", "cursor: pointer;");
      setStyle("streamer" + i + "EditIcon", "cursor: pointer;");
      onEvent("streamer" + i + "EditIcon", "click", genEditCallback(i - 1));
    }
  }
  if (streamers.length > 0) {
    hideElement("noTrackLabel");
  } else {
    showElement("noTrackLabel");
  }
}

refreshStreamers([0, 1, 2, 3]);

onEvent("addBtn", "click", function() {
  setScreen("trackStreamer");
});

onEvent("refreshBtn", "click", function() {
  refreshStreamers(Object.keys(streamers).map((key) => parseInt(key, 10)));
});

onEvent("trackBtn", "click", function() {
  var streamerYoutubeId = getText("newYoutubeInput");
  var streamerTwitchId = getText("newTwitchInput");
  
  if (streamerYoutubeId.length > 0 && streamerTwitchId.length > 0) {
    streamers.push({ twitch: streamerTwitchId.toLowerCase(), youtube: streamerYoutubeId });
    setText("newTwitchInput", "");
    setText("newYoutubeInput", "");
    refreshStreamers([streamers.length - 1]);
    setScreen("main");
  }
});

onEvent("cancelEditBtn", "click", function() {
  setScreen("main");
});

onEvent("cancelTrackBtn", "click", function() {
  setText("newTwitchInput", "");
  setText("newYoutubeInput", "");
  setScreen("main");
});

onEvent("saveBtn", "click", function() {
  var streamerYoutubeId = getText("editStreamerYoutubeInput");
  var streamerTwitchId = getText("editStreamerTwitchInput");
  
  if (streamerYoutubeId.length > 0 && streamerTwitchId.length > 0) {
    streamers[editIdx] = { twitch: streamerTwitchId.toLowerCase(), youtube: streamerYoutubeId };
    setText("editStreamerTwitchInput", "");
    setText("editStreamerYoutubeInput", "");
    refreshStreamers([editIdx]);
    setScreen("main");
  }
});
