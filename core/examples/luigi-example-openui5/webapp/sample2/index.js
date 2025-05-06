sap.ui.require(['sap/ui/core/mvc/XMLView'], (XMLView) => {
  'use strict';

  XMLView.create({ viewName: 'luigi.demo.sample2.Sample2' }).then(function(
    oView
  ) {
    oView.placeAt('content');
  });
});
