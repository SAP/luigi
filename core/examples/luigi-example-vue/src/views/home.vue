<template>
  <div>
    <section class="fd-section">
      <div class="fd-section__header">
        <h1 class="fd-section__title">Home</h1>
      </div>
      <div class="fd-panel">
        {{ message }}
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "home",
    data: () => ({
      message: ''
    }),
    components: {},
    methods: {},
    created () {
      this.luigiClient.addInitListener(initialContext => {
        this.message = 'Luigi Client initialized.'
      });
      this.luigiClient.addContextUpdateListener(updatedContext => {
        this.message = 'Luigi Client updated.'
      });
    }
  }
</script>

<style scoped lang="scss">
</style>
