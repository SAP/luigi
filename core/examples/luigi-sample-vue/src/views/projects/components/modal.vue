<template>
  <div v-if="visible" class="fd-ui__overlay fd-overlay fd-overlay--modal" aria-hidden="false">
    <div class="fd-modal" role="dialog">
      <div class="fd-modal__content" role="document">
        <header class="fd-modal__header">
          <slot name="header">
            <h1 class="fd-modal__title">Modal Header</h1>
            <button @click="hide" class=" fd-button--secondary fd-modal__close"></button>
          </slot>
        </header>
        <div class="fd-modal__body">
          <slot></slot>
        </div>
        <footer class="fd-modal__footer">
          <slot name="footer">
            <div class="fd-modal__actions">
              <button @click="hide" class=" fd-button--secondary">Cancel</button>
              <button @click="hide" class=" fd-button--primary">Confirm</button>
            </div>
          </slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import * as LuigiClient from '@kyma-project/luigi-client';

  export default {
    name: "modal",
    data: () => ({
      visible: false
    }),
    methods: {
      show () {
        this.visible = true
        this.luigiClient.uxManager().addBackdrop();
      },
      hide () {
        this.visible = false
        this.luigiClient.uxManager().removeBackdrop();
      },
    },
    mounted () {
      this.luigiClient = LuigiClient;
    },
    watch: {
      visible: function (val) {
        this.$emit('visibleChange', val)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $fd-icons-path: "~fundamental-ui/scss/icons/";
  $left-nav-width: 320px;

  @import '~fundamental-ui/scss/icons';
  @import '~fundamental-ui/scss/layout/overlay';
  @import '~fundamental-ui/scss/components/modal';
  @import '~fundamental-ui/scss/components/button';

  .fd-overlay--modal {
    width: calc(100% - #{$left-nav-width});
  }
</style>
