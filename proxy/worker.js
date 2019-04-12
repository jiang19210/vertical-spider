"use strict";
const mongodb = require('./mongodb/mongodb');
const redis = require('./redis/redis');
const mysql = require('./mysql/mysql');
const events = require('events');
const util = require('util');

function Worker() {
    var prototypes = ["rpop", "spop", "rpoplpush", "spopsadd"];
    for (var i = 0; i < prototypes.length; i++) {
        this.on(prototypes[i], this[prototypes[i]]);
    }
}

util.inherits(Worker, events.EventEmitter);

function handlerRestul(callback, err, result, m) {
    if (err) {
        console.error('[%s]-[%s]-异常. error_message:[%s]', __dirname, m, JSON.stringify(err));
    }
    if (callback) {
        callback(err, result);
    }
}

///////////=================mongodb
Worker.prototype.save = function (collection, callback) {
    var name = collection.name;
    var data = collection.data;
    mongodb.save(name, data, function (err, result) {
        handlerRestul(callback, err, result, 'mongodb.save');
    });
};

Worker.prototype.saveOrUpdate = function (collection, callback) {
    var name = collection.name;
    var data = collection.data;
    mongodb.saveOrUpdate(name, data.query, data.update, function (err, result) {
        handlerRestul(callback, err, result, 'mongodb.saveOrUpdate');
    });
};
///////////=================redis
Worker.prototype.lpushs = function (collection, callback) {
    var name = collection.name;
    var data = collection.data;
    redis.lpushs(name, data, function (err, result) {
        handlerRestul(callback, err, result, 'redis.lpushs');
    });
};
Worker.prototype.multilpush = function (collection, callback) {
    var name = collection.name;
    var data = collection.data;
    redis.multilpush(name, data, function (err, result) {
        handlerRestul(callback, err, result, 'redis.multilpush');
    });
};
Worker.prototype.sadds = function (collection, callback) {
    var name = collection.name;
    var data = collection.data;
    redis.sadds(name, data, function (err, result) {
        handlerRestul(callback, err, result, 'redis.sadds');
    });
};
Worker.prototype.multisadd = function (collection, callback) {
    var name = collection.name;
    var data = collection.data;
    redis.multisadd(name, data, function (err, result) {
        handlerRestul(callback, err, result, 'redis.multisadd');
    });
};
Worker.prototype.saddDistinct = function (collection, callback) {
    var name = collection.name;
    var data = collection.data;
    redis.saddDistinct(name, data, function (err, result) {
        handlerRestul(callback, err, result, 'redis.saddDistinct');
    });
};
Worker.prototype.saddDistincts = function (collection, callback) {
    var name = collection.name;
    var data = collection.data;
    redis.saddDistincts(name, data, function (err, result) {
        handlerRestul(callback, err, result, 'redis.saddDistincts');
    });
};
Worker.prototype.spop = function (collection, callback) {
    var name = collection.name;
    redis.spop(name, function (err, result) {
        handlerRestul(callback, err, result, 'redis.spop');
    });
};
Worker.prototype.rpop = function (collection, callback) {
    var name = collection.name;
    redis.rpop(name, function (err, result) {
        handlerRestul(callback, err, result, 'redis.rpop');
    });
};
Worker.prototype.lpop = function (collection, callback) {
    var name = collection.name;
    redis.lpop(name, function (err, result) {
        handlerRestul(callback, err, result, 'redis.lpop');
    });
};
Worker.prototype.delOrBak = function (collection, callback) {
    var name = collection.name;
    redis.delOrBak(name, function (err, result) {
        handlerRestul(callback, err, result, 'redis.delOrBak');
    });
};
Worker.prototype.del = function (collection, callback) {
    var name = collection.name;
    redis.del(name, function (err, result) {
        handlerRestul(callback, err, result, 'redis.del');
    });
};
Worker.prototype.multisaddOrBak = function (collection, callback) {
    var name = collection.name;
    var data = collection.data;
    if (typeof data == 'string') {
        data = JSON.parse(data)
    }
    redis.multisaddOrBak(name, data, function (err, result) {
        handlerRestul(callback, err, result, 'redis.multisaddOrBak');
    });
};
Worker.prototype.spopsadd = function (collection, callback) {
    var name = collection.name;
    redis.spopsadd(name, function (err, result) {
        handlerRestul(callback, err, result, 'redis.spopsadd');
    });
};

Worker.prototype.rpoplpush = function (collection, callback) {
    var name0 = collection.name0;
    var name1 = collection.name1;
    redis.rpoplpush(name0, name1, function (err, result) {
        handlerRestul(callback, err, result, 'redis.rpoplpush');
    });
};
Worker.prototype.exists = function (collection, callback) {
    var name = collection.name;
    redis.exists(name, function (err, result) {
        handlerRestul(callback, err, result, 'redis.exists');
    });
};
Worker.prototype.incr = function (collection, callback) {
    var name = collection.name;
    redis.incr(name, function (err, result) {
        handlerRestul(callback, err, result, 'redis.exists');
    });
};
Worker.prototype.remove = function (collection, callback) {
    var name = collection.name;
    var data = collection.data;
    if (typeof data == 'string') {
        data = JSON.parse(data)
    }
    mongodb.remove(name, data, function (err, result) {
        handlerRestul(callback, err, result, 'mongodb.remove');
    });
};
Worker.prototype.set = function (collection, callback) {
    var name = collection.name;
    var value = collection.data.value;
    redis.set(name, value, function (err, result) {
        handlerRestul(callback, err, result, 'redis.set');
    });
};
Worker.prototype.get = function (collection, callback) {
    var name = collection.name;
    redis.get(name, function (err, result) {
        handlerRestul(res, err, result, 'redis.get');
    });
};
///////////=================mysql
Worker.prototype.mysql_save = function (collection, callback) {
    mysql.insert(collection, function (err, results) {
        handlerRestul(callback, err, results, 'mysql.mysql_save');
    });
};

Worker.prototype.mysql_update = function (collection, callback) {
    mysql.update(collection, function (err, results) {
        handlerRestul(callback, err, results, 'mysql.mysql_update');
    });
};

Worker.prototype.mysql_select = function (collection, callback) {
    mysql.select(collection, function (err, results) {
        handlerRestul(callback, err, results, 'mysql.mysql_select');
    });
};
module.exports = new Worker();