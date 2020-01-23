sap.ui.define([
	"luigi/demo/controller/BaseController",
	"luigi/demo/libs/luigi-client/luigi-client",
], function (BaseController) {
	"use strict";

	return BaseController.extend("luigi.demo.controller.SampleTwo", {
		onInit: function () {
			LuigiClient.addInitListener(initialContext => {
				console.log('Luigi Client Initialized in Sample Two !');
			  });

			LuigiClient.addContextUpdateListener(updatedContext => {
				console.log('Luigi Client Updated in Sample Two !')
			  });
			
		}

	});

});
