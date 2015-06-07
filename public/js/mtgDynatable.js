var MtgDynatable = function (tableSelector, searchSelector, writerFunction) {
  var dynatable, writer;

  var setTemplate = function(templateSelector){
    _.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g
    };
    var template = _.template($(templateSelector).text());
    writerFunction = function(rowIndex, data){
      return template(data);
    };
  };

  var initialize = function(tableSelector, templateSelector, records){
    setTemplate(templateSelector);

    dynatable = $(tableSelector).dynatable({
      table: {
        bodyRowSelector: 'li'
      },
      dataset: {
        records: records,
        perPageDefault: 100,
        perPageOptions: [100, 500, 1000]
      },
      features: {
        pushState: false,
        sort: false
      },
      writers: {
        _rowWriter: writerFunction
      }
    }).data('dynatable');
    dynatable.dom.update();
  };

  if(tableSelector && searchSelector && writerFunction){
    initialize(tableSelector, searchSelector, writerFunction);
  }

  return {
  }
};
