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
