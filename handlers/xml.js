
const xmlescape = require('xml-escape');

const isRelevantName = (name) => !['create', 'modify', 'delete', 'osmChange'].includes(name);

module.exports = {
    onopentag: {
        predicate: (xmlNode) => isRelevantName(xmlNode.name),
        action: (xmlNode, entity) => {
            if (!entity.xml) { 
                entity.xml = '';
            }

            entity.xml += `<${xmlNode.name} ${Object.keys(xmlNode.attributes).reduce((acc, r) => acc + `${r}="${xmlescape(xmlNode.attributes[r])}" `, '')}>`;
        }
    },
    onclosetag: {
        predicate: isRelevantName,
        action: (closeTag, entity) => {
            entity.xml += `</${closeTag}>`;
        }
    }
}