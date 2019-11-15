import * as sapper from '@sapper/app';
import LuigiClient from '@kyma-project/luigi-client';

sapper.start({
	target: document.querySelector('#sapper')
});

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

window.navigateInternal = (evt, elem) => {
	evt.preventDefault();
	evt.stopPropagation();
	LuigiClient.linkManager().navigate(new URL(elem.getAttribute('href')).pathname);
}

const selectText = (node) => {
	if (document.body.createTextRange) {
		const range = document.body.createTextRange();
		range.moveToElementText(node);
		range.select();
	} else if (window.getSelection) {
		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(node);
		selection.removeAllRanges();
		selection.addRange(range);
	} else {
		console.warn("Could not select text in node: Unsupported browser.");
	}
}

window.copyCode = (evt, elem) => {
	evt.preventDefault();
	evt.stopPropagation();
	try {
		selectText(elem.parentNode.querySelector('code'));
		document.execCommand('copy');
	} catch(e) {
		console.error('Browser copy command not supported?', e);
	}
}
