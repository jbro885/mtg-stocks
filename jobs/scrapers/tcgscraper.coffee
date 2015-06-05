util = require('util');
require("coffee-script/register");
Promise = require("bluebird");
request = Promise.promisify(require("request"));
cheerio = require('cheerio');

Money = require('money-formatter')

sets = []

setsPath = 'http://shop.tcgplayer.com/magic'
setPath = "http://magic.tcgplayer.com/db/search_result.asp?Set_Name="

headers = {
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36",
  "Referer" : "http://shop.tcgplayer.com/magic",
  "Cookie" : "setting=CD=US&M=1; D_SID=107.5.215.152:0iI8B2ciHplKQgV7Izv6z9qPGjt4VhWIEfht8yypVLs; tcgpartner=PK=WWWTCG&M=1; ASP.NET_SessionId=3gbcm4egf5g1jr3xpg1sgjqy; StoreCart_PRODUCTION=CK=5ace322850dc46aeaba4ab7f4186ec16&Ignore=false; TCG_Data=M=1&SearchGameNameID=magic&CustomerClosedTips=4; valid=set=true; __utma=1.1856536970.1432144001.1433347259.1433463275.8; __utmb=1.6.10.1433463275; __utmc=1; __utmz=1.1432653347.4.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); D_PID=65B66C68-6EC9-3B18-99EC-5F2B8F8D3C20; D_IID=AA15186E-5B84-39F9-8202-DBCAA93B1604; D_UID=B11177FE-7F6A-38AC-987B-299EC733F123; D_HID=i3f8LL1uTvaeG1yH1dxCtRA71Qd7ACNetq3KFbBcLmc; X-Mapping-fjhppofk=CBFD5247BC2C9BE04196BCA8AB195803"
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
        .then (cards) ->
          if(cards.length)
            console.log(cards)
    .then () ->
      defer.fulfill(1)
  return defer.promise