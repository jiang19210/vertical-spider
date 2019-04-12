"use strict";
const cryptoUtils = require('./crypto_utils');

exports.buildHttpcontext = function (options, data, postdate, timeout, proxy) {
    let op = {};
    if (typeof options === 'string') {
        op.method = options;
        op.path = data.url;
    } else {
        op = options;
    }
    let md5str = op.path + '-' + op.method;
    if (!postdate) {
        md5str = md5str + '-' + postdate;
    }
    if (!data.md5_extra_key) {
        md5str = md5str + '-' + data.md5_extra_key;
    }
    if (!data.next) {
        md5str = md5str + '-' + data.next;
    }
    let md5 = cryptoUtils.MD5(md5str);
    let httpcontext =
        {
            'md5': md5,
            'request': {
                'proxy': proxy,
                'postdata': postdate,
                'options': op,
                'timeout': timeout
            },
            'response': {},
            'data': data
        };
    return httpcontext;
};