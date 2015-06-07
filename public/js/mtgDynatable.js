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

  var sort = function(sortType){
    dynatable.sorts.clear();
    dynatable.sorts.add(sortType, 1);
    dynatable.process();
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
        sort: true
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
    sort: sort
  }
};
