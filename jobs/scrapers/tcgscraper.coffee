util = require('util');
require("coffee-script/register");
Promise = require("bluebird");
request = Promise.promisify(require("request"));
cheerio = require('cheerio');

workerFarm = require('worker-farm')
writerWorker = workerFarm({maxConcurrentCalls : 1}, require.resolve('./card-write-job'))

Money = require('money-formatter')
cardService = require('./../../data/card');

sets = []

setsPath = 'http://shop.tcgplayer.com/magic'
setPath = "http://magic.tcgplayer.com/db/search_result.asp?Set_Name="

headers = {
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36",
  "Referer" : "http://shop.tcgplayer.com/magic",
  "Cookie" : "setting=CD=US&M=1; tcgpartner=PK=WWWTCG&M=1; ASPSESSIONIDSQSQAABA=NJGANBIAGHPBJKJGHBKPIGOM; ASPSESSIONIDSQQTDBBB=BLOBDJPADEFEADLGPANFJPMG; StoreCart_PRODUCTION=CK=5ace322850dc46aeaba4ab7f4186ec16&Ignore=false; TCG_Data=M=1&SearchGameNameID=magic&CustomerClosedTips=4; SearchCriteria=M=1&WantGoldStar=False&WantCertifiedHobbyShop=False&WantDirect=False&WantSellersInCart=False&magic_MinQuantity=1&GameName=Magic&Magic_Language=English; __utma=92457496.317151749.1433534628.1433534628.1433534628.1; __utmc=92457496; __utmz=92457496.1433534628.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)"
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

module.exports = () ->
  console.log('doin it.')
  defer = Promise.pending();
  request {url: setsPath, headers: headers}
    .then (response) ->
      $ = cheerio.load(response[1])

      $('.magicSets ul a.default_9_link')
        .map () ->
          console.log($(this).text());
          return $(this).text()
        .get()
    .map (setName) ->
      console.log(setPath + setName)
      request {url:setPath + setName , headers: headers}
        .then (response) ->
          $ = cheerio.load response[1]
          #console.log(response[1])
          $('div.bodyWrap table')
            .find('tr')
            .map () ->
              $r = $('td > a', this)
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
        .each (card) ->
          writerWorker
          cardService.addCard(card)
    .then () ->
      defer.fulfill(1)
  return defer.promise
