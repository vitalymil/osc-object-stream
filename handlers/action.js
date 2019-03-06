
module.exports = {
    onopentag: {
        predicate: (xmlNode) => ['create', 'modify', 'delete'].includes(xmlNode.name),
        action: (xmlNode, entity, state) => {
            state.action = xmlNode.name;
        }
    }
}
