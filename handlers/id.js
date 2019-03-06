
module.exports = {
    onopentag: {
        predicate: (xmlNode) => !!xmlNode.attributes.id,
        action: (xmlNode, entity) => {
            entity.id = xmlNode.attributes.id;
        }
    }
}