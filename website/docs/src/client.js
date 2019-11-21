import * as sapper from '@sapper/app';

import { CopyCodeHandler } from './client-js/copy-code';
import { InternalLinksHandler } from './client-js/internal-links';
import { ScrollAnchorsHandler } from './client-js/smooth-scroll-anchors';
import { Accordion } from './client-js/accordion';

sapper.start({
	target: document.querySelector('#sapper')
});

new CopyCodeHandler().init();
new InternalLinksHandler().init();
new Accordion().init();

const scrollHandler = new ScrollAnchorsHandler();
scrollHandler.init();
window.scrollAnchor = scrollHandler.scrollAnchor;
