<script>
  import { onMount } from "svelte";

  onMount(() => {
    import { Accordion } from './client-js/accordion';
    import { CopyCodeHandler } from './client-js/copy-code';
    import { InternalLinksHandler } from './client-js/internal-links';
    import { OuterFrameHandler } from './client-js/outer-frame-handler';
    import { ScrollAnchorsHandler } from './client-js/smooth-scroll-anchors';
    import { SearchTagHandler } from './client-js/search-tag';

    new CopyCodeHandler().init();
    new InternalLinksHandler().init();
    new Accordion().init();

    new ScrollAnchorsHandler().init();
    new OuterFrameHandler().init();
    new SearchTagHandler().init();
  });
</script>
