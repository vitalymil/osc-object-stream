
module.exports = {
    onopentag: {
        predicate: (xmlNode) => ['node', 'way', 'relation'].includes(xmlNode.name),
        action: (xmlNode, entity) => {
            entity.type = xmlNode.name;
            entity.attributes = xmlNode.attributes;
        }
    }
}
