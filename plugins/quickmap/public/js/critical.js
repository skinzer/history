const displayGeocode = (values) => {
  $('#out').text(JSON.stringify(values));
};

const parseGeocode = () => {
  const geocodePattern = /([-+]?\d{1,2}([.]\d+)?),\s*([-+]?\d{1,3}([.]\d+)?)/g;
  const notes = $('#notes').val();
  const geocodes = notes.match(geocodePattern);

  const feature = coordinates => ({
    type: 'Feature',
    geometry: { type: 'Point', coordinates },
    properties: null
  });
  const features = geocodes.map(geoPair => {
    const geo = geoPair.split(',');
    const coordinates = [parseFloat(geo[1]), parseFloat(geo[0])];

    return feature(coordinates);
  });
  const featureCollection = { type: 'FeatureCollection', features };
  displayGeocode(featureCollection);
}

{
  $('#getGeocode').click(parseGeocode);
}
