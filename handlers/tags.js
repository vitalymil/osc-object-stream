
module.exports = {
    onopentag: {
        predicate: (xmlNode) => xmlNode.name === 'tag',
        action: (xmlNode, entity) => {
            if (!entity.tags) { 
                entity.tags = []; 
            }

            entity.tags.push(xmlNode.attributes);
        }
    }
}
