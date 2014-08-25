/**
 * Created by Dang Binh on 8/11/2014.
 */
var express = require('express');
var res = express.respone;

res.message = function(msg, type) {
    type = type || 'info';
    var sees = this.req.session;
    sees.message = sees.message || [];
    sees.message.push({type : type, string : msg});
};

res.error = function(msg) {
    return this.message(msg, 'error');
};

module.export = function(req, res, next) {
    res.locals.messages = req.session.message || [];
    res.locals.removeMessages = function() {
        req.session.messages = [];
    };
    next();
}