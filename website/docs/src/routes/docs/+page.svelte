<script context="module">

</script>

<script>
  export let post;
</script>

<style type="text/scss">
  /*
    By default, CSS is locally scoped to the component,
    and any unused styles are dead-code-eliminated.
    In this page, Svelte can't know which elements are
    going to appear inside the {{{post.html}}} block,
    so we have to use the :global(...) modifier to target
    all elements inside .content
  */




</style>

<svelte:head>
  <title>{post.shortName}</title>
</svelte:head>

<section class="fd-section content page-{post.shortName}">
  <!-- <div class="fd-section__header">
    <h1 class="fd-section__title">LuigiClient uxManager methods</h1>
  </div> -->
  {@html post.contents}
</section>
