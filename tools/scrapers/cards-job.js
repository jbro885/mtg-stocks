var Money, Promise, cardService, cheerio, currency, fixCurrencies, headers, imageWorker, isEmpty, properties, reduceCurrencies, request, rowToObject, setPath, sets, setsByName, setsPath, util, workerFarm, writerWorker,
  __slice = [].slice;

util = require('util');

require("coffee-script/register");

Promise = require("bluebird");

request = Promise.promisify(require("request"));

cheerio = require('cheerio');

workerFarm = require('worker-farm');

writerWorker = require('./card-write-job');

  workerFarm({
  maxConcurrentCalls: 1
}, require.resolve('./card-write-job'));

imageWorker = workerFarm({}, require.resolve('./card-image-job'));

Money = require('money-formatter');

cardService = require('./../../data/card');

sets = [];

setsPath = 'http://shop.tcgplayer.com/magic';

setPath = "http://magic.tcgplayer.com/db/search_result.asp?Set_Name=";

properties = [["name", 0], ["set", 1], ["max", 2], ["mid", 3], ["min", 4]];

reduceCurrencies = function(cur, list) {
  if (!list.includes(cur)) {
    list.append(cur);
  }
  return list;
};

currency = function() {
  var cur, currencies;
  currencies = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  cur = null;
  currencies.filter(function(obj) {
    return !!obj;
  }).map(function(obj) {
    return obj.getCurrency();
  }).reduce(reduceCurrencies, []);
  if (currencies.length === 1) {
    cur = currencies[1];
  } else if (currencies.lengh === 0) {
    cur = "NONE";
  } else {
    cur = "MIXED";
  }
  return cur;
};

isEmpty = function(obj) {
  return obj.name || obj.max || obj.min || obj.mid;
};

fixCurrencies = function(obj) {
  var max, mid, min;
  min = Money.valueOf(obj.min);
  mid = Money.valueOf(obj.mid);
  max = Money.valueOf(obj.max);
  obj.min = min.floatValue();
  obj.mid = mid.floatValue();
  obj.max = max.floatValue();
  return obj;
};

rowToObject = function($r) {
  var txt;
  txt = function(i) {
    return $r.eq(i).text();
  };
  return new ((function() {
    function _Class() {
      var prop, _i, _len;
      for (_i = 0, _len = properties.length; _i < _len; _i++) {
        prop = properties[_i];
        this[prop[0]] = txt(prop[1]);
      }
    }

    return _Class;

  })());
};

module.exports = function(setStuff, done) {
  var setsByName = setStuff.setsByName;

  return request({
    url: setPath + setStuff.setName,
    headers: headers
  }).then(function (response) {
    var $;
    $ = cheerio.load(response[1]);
    return $('div.bodyWrap table').find('tr').map(function () {
      var $r;
      $r = $('td > a', this);
      console.log(rowToObject($r));
      return rowToObject($r);
    }).get();
  }).then(function (cards) {
    return cards.filter(function (card) {
      return card && card.name && card.mid && /^\$/.test(card.mid);
    });
  }).map(function (obj) {
    defer = Promise.pending();
    try {
      obj = fixCurrencies(obj);

      imageWorker(obj, function (err, id) {
        obj.imageUrl = id;
        obj.set = setsByName[obj.set];
        console.log(obj);
        return defer.fulfill(obj);
      });
    } catch (_error) {

    }console.log(obj);
    return defer.promise;
  }).then(function (cards) {
    if (cards.length > 0) {
      console.log(cards[0].name);
      return writerWorker(cards, function () {
      });
    }
  }).then(function(){
    done(1);
  })
};
