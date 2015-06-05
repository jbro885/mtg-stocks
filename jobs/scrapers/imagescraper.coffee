util = require('util');
require("coffee-script/register");
Promise = require("bluebird");
request = Promise.promisify(require("request"));
cheerio = require('cheerio');
Filepicker = require('node-filepicker');
filepicker = new Filepicker('ACBZFYxDQlSdFKZq0uHjBz');

headers = {
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36",
  "Referer" : "http://shop.tcgplayer.com/magic",
  "Cookie" : "setting=CD=US&M=1; SearchCriteria=M=1&WantGoldStar=False&WantCertifiedHobbyShop=False&WantDirect=False&WantSellersInCart=False&magic_MinQuantity=1&GameName=Magic&Magic_Language=English; TCG_Data=M=1&SearchGameNameID=magic&CustomerClosedTips=4; __utmt=1; ASP.NET_SessionId=i0dbvnrmvm4c40m5iyl5tf5y; __utma=1.82903360.1433515852.1433521005.1433523679.3; __utmb=1.2.10.1433523679; __utmc=1; __utmz=1.1433515852.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)"
};

module.exports = (cardPath) ->
  defer = Promise.pending();
  # cardPath.replace(/\s+/g, '-').toLowerCase()
  request {url: cardPath, headers: headers}
    .then (response) ->
      $ = cheerio.load(response[1])
      return $('#cardImage').attr('src')
    .then (src) ->
      defer.fulfill(src)
  return defer.promise
