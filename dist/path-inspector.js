(function() {
    'use strict';

    var exports = {};

    exports.read = function(str) {
        var protocol;
        var queryString;
        var queryObject;
        var arr1;
        var arr2;

        arr1 = exports.getProtocol(str);
        arr2 = exports.getQueryString(arr1[1]);

        protocol = arr1[0];
        queryString = arr2[0];
        queryObject = exports.toQueryObject(queryString);

        return {
            protocol: protocol,
            query: queryObject,
            host: arr2[1],
        }
    }

    exports.getProtocol = function(str) {
        var patt = /^[0-9a-z]+(\:\/\/)/i;
        var res;
        try {
            res = patt.exec(str)[0];
            return [
                res,
                str.replace(res, "")
            ];
        } catch(err) {
            return [
                undefined,
                str
            ];
        }
    }

    exports.getQueryString = function(str) {
        var patt = /(\?)+(.*\=.*)/;
        var res;
        try {
            res = patt.exec(str)[0];
            return [
                res,
                str.replace(res, "")
            ];
        } catch (err) {
            return [
                undefined,
                str
            ];
        }
    }

    exports.toQueryObject = function(str) {
        var params = new URLSearchParams(str);
        var obj = {}
        for (var key of params.keys()) {
            if (params.getAll(key).length > 1) {
                obj[key] = params.getAll(key)
            } else {
                obj[key] = params.get(key)
            }
        }
        return obj;
    }

    if (typeof(window.pathInspector) === "undefined") {
        window.pathInspector = exports;
    }
})();