util = require('util');
require("coffee-script/register");
Promise = require("bluebird");
request = Promise.promisify(require("request"));
cheerio = require('cheerio');

fs = require('fs');
url = require('url');
http = require('http');

headers = {
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36",
  "Referer" : "http://shop.tcgplayer.com/magic",
  "Cookie" : "setting=CD=US&M=1; tcgpartner=PK=WWWTCG&M=1; TCG_Data=M=1&SearchGameNameID=magic&CustomerClosedTips=4; SearchCriteria=M=1&WantGoldStar=False&WantCertifiedHobbyShop=False&WantDirect=False&WantSellersInCart=False&magic_MinQuantity=1&GameName=Magic&Magic_Language=English; ASPSESSIONIDSQSQAABA=NJGANBIAGHPBJKJGHBKPIGOM; StoreCart_PRODUCTION=CK=5ace322850dc46aeaba4ab7f4186ec16&Ignore=false; __utma=1.2047100343.1433516199.1433516199.1433524019.2; __utmc=1; __utmz=1.1433516199.1.1.utmcsr=magic.tcgplayer.com|utmccn=(referral)|utmcmd=referral|utmcct=/db/search_result.asp"
};

properties = [["name", 0], ["set", 1], ["max", 2], ["mid", 3], ["min", 4]]

reduceCurrencies = (cur, list) ->
  if not list.includes(cur)
    list.append(cur)
  return list

currency = (currencies...) ->
  cur = null

  currencies
  .filter((obj) -> !!obj)
  .map((obj) -> obj.getCurrency())
  .reduce(reduceCurrencies, [])

  if currencies.length == 1
    cur = currencies[1]
  else if currencies.lengh == 0
    cur = "NONE"
  else
    cur = "MIXED"
  return cur

isEmpty = (obj) ->
  obj.name || obj.max || obj.min || obj.mid;

fixCurrencies = (obj) ->
# console.log(obj)
  min = Money.valueOf(obj.min)
  mid = Money.valueOf(obj.mid)
  max = Money.valueOf(obj.max)

  # console.log(min.getValue())

  #obj.currency = currency(min, mid, max)

  obj.min = min.floatValue()
  obj.mid = mid.floatValue()
  obj.max = max.floatValue()

  return obj

rowToObject = ($r) ->
  txt = (i) -> $r.eq(i).text()
  new class then constructor: -> @[prop[0]] = txt(prop[1]) for prop in properties


module.exports = (setName) ->
  defer = Promise.pending();
  setPath = "http://magic.tcgplayer.com/db/search_result.asp?Set_Name="+setName
  request {uri: setPath , headers: headers}
    .then (response) ->
      $ = cheerio.load response[1]
      #console.log(response[1])
      $('div.bodyWrap table tr').eq(3)
        .map () ->
          $r = $('td > a', this)
          console.log($r.html())
          rowToObject($r)
        .get()
    .map (obj) ->
      if(obj.min)
        try
          return fixCurrencies(obj)
        catch
          return null
    .then (cards) ->
      cards.filter((card) ->
        !!card
      )
    .then (cards) ->
      if(cards.length)
        console.log(cards)
  .then (src) ->
    defer.fulfill(src)
  return defer.promise
