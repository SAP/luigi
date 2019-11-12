import * as sapper from '@sapper/app';
import LuigiClient from '@kyma-project/luigi-client';

sapper.start({
	target: document.querySelector('#sapper')
});

window.navigateInternal = (evt, elem) => {
	evt.preventDefault();
	evt.stopPropagation();
	LuigiClient.linkManager().navigate(elem.getAttribute('href'));
}