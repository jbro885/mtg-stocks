util = require('util');
require("coffee-script/register");
Promise = require("bluebird");
request = Promise.promisify(require("request"));
cheerio = require('cheerio');
Filepicker = require('node-filepicker');
filepicker = new Filepicker('ACBZFYxDQlSdFKZq0uHjBz');
fs = require('fs');
url = require('url');
http = require('http');

headers = {
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36",
  "Referer" : "http://shop.tcgplayer.com/magic",
  "Cookie" : "setting=CD=US&M=1; D_SID=107.5.215.152:0iI8B2ciHplKQgV7Izv6z9qPGjt4VhWIEfht8yypVLs; tcgpartner=PK=WWWTCG&M=1; ASP.NET_SessionId=3gbcm4egf5g1jr3xpg1sgjqy; __gads=ID=55d1108aabd4954b:T=1433541548:S=ALNI_MaLEVAlAMpbwoWpkRzAWeddViokbA; TCG_Data=M=1&SearchGameNameID=magic&CustomerClosedTips=4; SearchCriteria=M=1&WantGoldStar=False&WantCertifiedHobbyShop=False&WantDirect=False&WantSellersInCart=False&magic_MinQuantity=1&GameName=Magic&Magic_Language=English; StoreCart_PRODUCTION=CK=5ace322850dc46aeaba4ab7f4186ec16&Ignore=false; __utmt=1; __utma=1.2076492045.1433542775.1433545258.1433548218.3; __utmb=1.6.10.1433548218; __utmc=1; __utmz=1.1433542775.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); D_PID=65B66C68-6EC9-3B18-99EC-5F2B8F8D3C20; D_IID=AA15186E-5B84-39F9-8202-DBCAA93B1604; D_UID=B11177FE-7F6A-38AC-987B-299EC733F123; D_HID=i3f8LL1uTvaeG1yH1dxCtRA71Qd7ACNetq3KFbBcLmc; X-Mapping-fjhppofk=1D90B0366A2F3DF8AD85BC0FC32CD406; valid=set=true"
};

setsPath = 'http://shop.tcgplayer.com/magic';

module.exports = (cardPath, name) ->
  defer = Promise.pending()
  console.log(cardPath);
  cardPath.replace(/\s+/g, '-').toLowerCase()
  request {url: cardPath, headers: headers}
    .then (response) ->
      $ = cheerio.load(response[1])
      console.log($('#cardImage').attr('src'));
      imageurl = $('#cardImage').attr('src')
      request
        .get(imageurl)
        .pipe(fs.createWriteStream(__dirname + name))
        .on('finish', () ->
          imageStream = fs.readFileSync(__dirname + name)
          imageBuffer = new Buffer(imageStream, 'binary')
          image = imageBuffer.toString('base64')
          filepicker.store(image, name, 'image/jpeg', "")
        )
      return $('#cardImage').attr('src')
    .then (src) ->
      defer.fulfill(src)
  return defer.promise
