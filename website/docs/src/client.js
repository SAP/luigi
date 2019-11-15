import * as sapper from '@sapper/app';
import LuigiClient from '@kyma-project/luigi-client';

sapper.start({
	target: document.querySelector('#sapper')
});

window.navigateInternal = (evt, elem) => {
	evt.preventDefault();
	evt.stopPropagation();
	LuigiClient.linkManager().navigate(new URL(elem.getAttribute('href')).pathname);
}

LuigiClient.addInitListener((ctx) => {
	const links = document.querySelectorAll('a[data-linktype]');
	if (links) {
		links.forEach((link, index) => {
			if (link.getAttribute('data-linktype') === 'internal') {
				const url = new URL(link.href);
				link.setAttribute('href', ctx.coreBaseUrl + url.pathname.replace('.md', '').replace('/docu-microfrontend', ''));
			}
		});
	}
});