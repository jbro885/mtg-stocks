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
streamBuffers = require("stream-buffers");

myWritableStreamBuffer = new streamBuffers.WritableStreamBuffer({
    initialSize: (100 * 1024),
    incrementAmount: (10 * 1024)
});

headers = {
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36",
  "Referer" : "http://shop.tcgplayer.com/magic",
  "Cookie" : "ASP.NET_SessionId=jligezzzlppz2rwrrbmkivdz; setting=CD=US&M=1; D_SID=75.151.1.209:sXysCj/2+F3TH9EbhpOdB+pf44MItqSCps8GZH9ZXPU; SearchCriteria=M=1&WantGoldStar=False&WantCertifiedHobbyShop=False&WantDirect=False&WantSellersInCart=False&magic_MinQuantity=1&GameName=Magic&Magic_Language=English; TCG_Data=M=1&SearchGameNameID=magic&CustomerClosedTips=4; valid=set=true; X-Mapping-fjhppofk=1D90B0366A2F3DF8AD85BC0FC32CD406; __utma=1.82903360.1433515852.1433523679.1433529061.4; __utmb=1.5.10.1433529061; __utmc=1; __utmz=1.1433515852.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); D_PID=65B66C68-6EC9-3B18-99EC-5F2B8F8D3C20; D_IID=9F440A5E-8853-3317-BC23-D4A6316C87F6; D_UID=B380C62D-862A-3DFD-A2A9-BACBF2DC5481; D_HID=cNwD+GhG5Tfdd3fD3zxZP0E3bZplXtesLdOdXn1/nGU"
};

imageBuffer = null;

module.exports = (cardPath) ->
  defer = Promise.pending();
  # cardPath.replace(/\s+/g, '-').toLowerCase()
  request {url: cardPath, headers: headers}
    .then (response) ->
      $ = cheerio.load(response[1])
      console.log(response[1]);
      imageurl = $('#cardImage').attr('src')
      request
        .get(imageurl)
        .pipe(fs.createWriteStream(__dirname + '\\doodle.jpg'))
        .on('finish', () ->
          imageStream = fs.readFileSync(__dirname + '\\doodle.jpg')
          imageBuffer = new Buffer(imageStream, 'binary')
          image = imageBuffer.toString('base64')
          filepicker.store(image, "zombie", 'image/jpeg', "")
        )
      return $('#cardImage').attr('src')
    .then (src) ->
      defer.fulfill(src)
  return defer.promise
