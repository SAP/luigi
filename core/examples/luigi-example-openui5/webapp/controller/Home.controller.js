sap.ui.define([
	"luigi/demo/controller/BaseController",
	"luigi/demo/libs/luigi-client/luigi-client"
], function (BaseController) {
	"use strict";

	return BaseController.extend("luigi.demo.controller.Home", {

		onInit: function () {
		
			LuigiClient.addInitListener(initialContext => {
				this.getView().byId("luigi-initialized").setText("Luigi Client Initialized!");
				console.log('Luigi Client Initialized at Home!');
			  });

			LuigiClient.addContextUpdateListener(updatedContext => {
				console.log('Luigi Client Updated at Home!')
			  });
		},

	});

});
