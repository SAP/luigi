<template>
  <div class="app-code-snippet">
    <code>
      <slot></slot>
    </code>
  </div>
</template>

<script>
export default {
  name: 'appCodeSnippet'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  code {
    display: block;
  }
</style>
