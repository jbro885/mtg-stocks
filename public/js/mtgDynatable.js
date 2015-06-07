var MtgDynatable = function (tableSelector, templateSelector, searchSelector, records) {
  var dynatable, writerFunction;

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

  var search = function(key, value){
    if (value === "") {
      dynatable.queries.remove(key);
    } else {
      dynatable.queries.add(key, value);
    }
    dynatable.process();
  }

  var initialize = function(tableSelector, templateSelector, searchSelector, records){
    setTemplate(templateSelector);
    $(searchSelector).attr("data-dynatable-query", "search");

    dynatable = $(tableSelector)
      .bind('dynatable:init', function(e, dynatable) {
        dynatable.queries.functions['set_name'] = function(record, queryValue) {
          if ( record.set_name == queryValue )
            return true;
          else
            return false;
        };
      })
      .dynatable({
      table: {
        bodyRowSelector: 'li'
      },
      dataset: {
        records: records,
        perPageDefault: 100
      },
      features: {
        pushState: false,
        sort: true,
        perPageSelect: false,
        search: false
      },
      writers: {
        _rowWriter: writerFunction
      },
      inputs: {
        queries: $(searchSelector)
      }
    }).data('dynatable');
    dynatable.dom.update();
  };

  if(tableSelector && templateSelector  && searchSelector && records){
    initialize(tableSelector, templateSelector, searchSelector, records);
  }

  return {
    sort: sort,
    search: search
  }
};
