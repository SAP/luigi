import * as sapper from '@sapper/app';

import { Accordion } from './client-js/accordion';
import { CopyCodeHandler } from './client-js/copy-code';
import { InternalLinksHandler } from './client-js/internal-links';
import { OuterFrameHandler } from './client-js/outer-frame-handler';
import { ScrollAnchorsHandler } from './client-js/smooth-scroll-anchors';

sapper.start({
	target: document.querySelector('#sapper')
});

new CopyCodeHandler().init();
new InternalLinksHandler().init();
new Accordion().init();

new ScrollAnchorsHandler().init();
new OuterFrameHandler().init();
