
module.exports = {
    onopentag: {
        predicate: (xmlNode) => xmlNode.name === 'nd',
        action: (xmlNode, entity) => {
            if (!entity.nds) { 
                entity.nds = []; 
            }

            entity.nds.push(xmlNode.attributes.ref);
        }
    }
}