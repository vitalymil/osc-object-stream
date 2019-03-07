# osm-object-stream
Node.js module for a stream of osc or osm files (OpenStreetMap change file), parsing the given XML, and writing objects representing OSM entities

## Usage Example
```js
const OsmObjectStream = require('osm-object-stream');
const fs = require('fs');

const osmFileStream = fs.createReadStream('osm/file/path');
const osmObjectStream = new OsmObjectStream();

osmFileStream.pipe(osmObjectStream);
osmObjectStream.on('data', (osmEntitiesBulk) => {
    console.log(osmEntitiesBulk);
});
```