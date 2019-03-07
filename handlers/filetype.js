
module.exports = {
    onopentag: {
        predicate: (xmlNode) => ['osmChange', 'osm'].includes(xmlNode.name),
        action: (xmlNode, entity, state) => {
            state.filetype = xmlNode.name === 'osm' ? 'osm' : 'osc';
        }
    }
}
