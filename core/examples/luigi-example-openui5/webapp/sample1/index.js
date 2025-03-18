sap.ui.require(['sap/ui/core/mvc/XMLView'], (XMLView) => {
  'use strict';

  XMLView.create({ viewName: 'luigi.demo.sample1.Sample1' }).then(function(
    oView
  ) {
    oView.placeAt('content');
  });
});
