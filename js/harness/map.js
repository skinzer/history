function displayAlbum(response) {
	var count = 0;
	map = new Map({
		"album": meta.album,
		"gallery": meta.gallery,
		"events": {
			"highlightPlottedPin": function () {
				jQuery("#mapBox").removeClass("subtle");
			},
			"highlightOmittedPin": function () {
				jQuery("#mapBox").addClass("subtle");	
			}
		},
		"map": {
			"centre": [0, 0],
			"containerId": 'mapBox',
			"itemCount": response.json.album.photo.length + ((response.json.album.video && Array.isArray(response.json.album.video)) ? response.json.album.video.length : 0),
			"zoom": 10
		}
	});

	function setPin(i, photo) {
		var addOptions = {},
			filename = (Array.isArray(photo.filename)) ? photo.filename[0] : photo.filename;
		filename = filename.replace(/.mp4/g, '.jpg');

		i += count; // both photo and video use count

		addOptions.html = "<div class='thumbPlaceholder'><img src='" + map.util.filenamePath(filename) + "'></div><div class='caption'>" + photo.thumb_caption + "</div>";
		addOptions.id = filename || i;
		addOptions.index = i;
		
		if (photo.geo) {
			addOptions.coordinates = [photo.geo.lon, photo.geo.lat];
		}
		
		map.pin.add(addOptions);
	}

	$.each(response.json.album.photo, setPin);

	count = response.json.album.photo.length;

	if (Array.isArray(response.json.album.video) && response.json.album.video.length >= 1) {
		$.each(response.json.album.video, setPin);
	} else {
		setPin(0, response.json.album.video);
	}
	map.pin.next();

	bind();
}
function bind() {
	$("#next").click(map.pin.next);
	$("#prev").click(map.pin.prev);
	$("#three").click(function () {
		map.pin.go(3);
	});
}
var map,
	meta = {
		"gallery": 'demo',
		"album": 'sample'
	},
	xml;
xml = new Xml({"gallery": meta.gallery, "album": meta.album, "callback": displayAlbum});