<template>
  <div>
    <section class="fd-section">
      <div class="fd-section__header">
        <h1 class="fd-section__title">Settings of {{ projectId }}</h1>
      </div>
      <div class="fd-panel">
        LuigiClient hasBack/GoBack:<br>
        {{luigiClient.linkManager().hasBack()}}
        {{hasBack}}
        <div v-if="hasBack">
          <p>
            <label>Modify goBackContext value, that you receive then via LuigiClient.addContextUpdateListener(): <br/>
              <input type="text" v-model="callbackValue"/>
            </label>
          </p>
          <p>
            <button class="fd-button" @click="goBack()">Click here</button> to go back to your preserved view.
          </p>
        </div>
        <div v-if="!hasBack">
          No go back state available, <a href="#" @click.prevent="luigiClient.linkManager().navigate('/projects/pr2')">Click
          here</a>
          to go to <i>project two</i>, where you can try out hasBack functionality
        </div>
      </div>
    </section>

    <section class="fd-section">
      <div class="fd-section__header">
        <h1 class="fd-section__title">Settings</h1>
      </div>
      <div class="fd-panel">
        Settings content.
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "settings",
    data: () => ({
      hasBack: false,
      callbackValue: 'default value'
    }),
    created () {
      this.luigiClient.addInitListener(() => {
        this.hasBack = this.luigiClient.linkManager().hasBack();
      });
    },
    methods: {
      goBack() {
        // going back with some sample callback context,
        // that will be handed over to previous view
        this.luigiClient.linkManager().goBack(this.callbackValue);
      }
    },
    props: {
      'projectId': {
        type: String,
        required: true,
        default: null
      }
    }
  }
</script>

<style scoped>

</style>
