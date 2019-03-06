
module.exports = {
    onopentag: {
        predicate: (xmlNode) => xmlNode.name === 'member',
        action: (xmlNode, entity) => {
            if (!entity.members) { 
                entity.members = []; 
            }

            entity.members.push({
                type: xmlNode.attributes.type,
                id: xmlNode.attributes.ref,
                role: xmlNode.attributes.role
            });
        }
    }
}