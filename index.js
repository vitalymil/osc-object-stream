
const sax = require('sax');
const Transform = require('stream').Transform;
const xmlHandlers = require('./handlers');

const DEFAULT_BULK_SIZE = 1000;

class OsmObjectStream extends Transform {
    constructor(options) {
        super({ 
            objectMode: true,
            highWaterMark: options.highWaterMark,
            readableHighWaterMark: options.readableHighWaterMark,
            writableHighWaterMark: options.writableHighWaterMark
        });

        this._curEntity = {};
        this._curState = {};
        this._xmlHanlders = xmlHandlers;
        
        if (options.handlers) {
            this._xmlHanlders = [...this._xmlHanlders, ...options.handlers];
        }

        this._curBulk = [];
        this._bulkSize = options.bulkSize || DEFAULT_BULK_SIZE;

        this._xmlParser = sax.parser(true);

        this._xmlParser.onopentag = (xmlNode) => {
            for (const hanlder of this._xmlHanlders) {
                if(hanlder.onopentag && hanlder.onopentag.predicate(xmlNode)) {
                    hanlder.onopentag.action(xmlNode, this._curEntity, this._curState);
                }
            }
        }

        this._xmlParser.onclosetag = (closeTag) => {
            for (const hanlder of this._xmlHanlders) {
                if(hanlder.onclosetag && hanlder.onclosetag.predicate(closeTag)) {
                    hanlder.onclosetag.action(closeTag, this._curEntity, this._curState);
                }
            }

            if (this._isEntityDone(closeTag)) {
                this._pushEntity();
                this._curEntity = {};
            }
        }
    }

    _isEntityDone(closeTag) {
        return ['node', 'way', 'relation'].includes(closeTag);
    }

    _pushEntity() {
        this._curBulk.push({ ...this._curEntity, ...this._curState });

        if (this._curBulk.length >= this._bulkSize) {
            this.push(this._curBulk);
            this._curBulk = [];
        }
    }

    _transform(data, encoding, callback) {
        this._xmlParser.write(data);
        callback();
    }

    _flush(callback) {
        this._xmlParser.close();

        if (this._curBulk.length > 0) {
            callback(null, this._curBulk);
        }
        else {
            callback();
        }
    }
}

module.exports = OsmObjectStream;
