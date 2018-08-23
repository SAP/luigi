<template>
  <div>
    <section class="fd-section">
      <div class="fd-section__header">
        <h1 class="fd-section__title">Project {{ projectId }}</h1>
      </div>
      <div class="fd-panel">
        <p>
          <strong>LuigiClient uxManager methods:</strong></p>
          <button class="fd-button" @click.prevent="showModal()">Add backdrop</button>
        <p>
          <app-code-snippet>
            luigiClient.uxManager().addBackdrop()
          </app-code-snippet>
          <app-code-snippet>
            luigiClient.uxManager().removeBackdrop()
          </app-code-snippet>
        </p>
      </div>
    </section>

    <section class="fd-section" v-if="preservedViewCallbackContext">
      <div class="fd-panel">
        <div class="fd-alert" role="alert">
          <span class="fd-status-label fd-status-label--available"></span> Context received from linkManager().goBack():<br />
          <pre>{{ JSON.stringify(preservedViewCallbackContext, null, 2) }}</pre>
        </div>
      </div>
    </section>

    <section class="fd-section" v-if="projectId">
      <div class="fd-panel">
        <p><strong>LuigiClient linkManager methods:</strong></p>
        <ul class="fd-list-group">
          <li class="fd-list-group__item">
            <a href="#" @click.prevent="luigiClient.linkManager().navigate('/overview')">absolute: to overview</a>
            <app-code-snippet>luigiClient.linkManager().navigate('/overview')</app-code-snippet>
          </li>
          <li class="fd-list-group__item">
            <a href="#" @click.prevent="luigiClient.linkManager().navigate('users/groups/stakeholders')">relative: to stakeholders</a>
            <app-code-snippet>luigiClient.linkManager().navigate('users/groups/stakeholders')</app-code-snippet>
          </li>
          <li class="fd-list-group__item">
            <a href="#" @click.prevent="luigiClient.linkManager().fromClosestContext().navigate('/users/groups/stakeholders')">closest parent: to stakeholders</a>
            <app-code-snippet>luigiClient.linkManager().fromClosestContext().navigate('/users/groups/stakeholders')</app-code-snippet>
          </li>
          <li class="fd-list-group__item">
            <a href="#" @click.prevent="luigiClient.linkManager().fromContext('project').navigate('/settings')">parent by name: project to settings</a>
            <app-code-snippet>luigiClient.linkManager().fromContext('project').navigate('/settings')</app-code-snippet>
          </li>
          <li class="fd-list-group__item">
            <a href="#" @click.prevent="luigiClient.linkManager().fromContext('FOOMARK').navigate('/settings')">parent by name: with nonexisting context</a> (look at the console)
            <app-code-snippet>luigiClient.linkManager().fromContext('FOOMARK').navigate('/settings')</app-code-snippet>
          </li>
          <li class="fd-list-group__item">
            <a href="#" @click.prevent="luigiClient.linkManager().fromContext('project').navigate('/settings', null, true)">with preserved view: project to settings and back</a>
            <app-code-snippet>luigiClient.linkManager().fromContext('project').navigate('/settings', null, true)</app-code-snippet>
          </li>
        </ul>
      </div>
    </section>
    <modal ref="myModalRef">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    </modal>
  </div>
</template>

<script>
  import AppCodeSnippet from '@/components/app-code-snippet.vue'
  import Modal from '@/views/projects/components/modal.vue'

  export default {
    name: "projects",
    data: () => ({
      preservedViewCallbackContext: null
    }),
    components: {
      AppCodeSnippet,
      Modal
    },
    methods: {
      showModal () {
        this.$refs.myModalRef.show()
      },
      hideModal () {
        this.$refs.myModalRef.hide()
      }
    },
    created () {
      this.luigiClient.addInitListener(initialContext => {
        console.info(
          'project ID as luigi param: ' + initialContext.currentProject
        );
      });

      this.luigiClient.addContextUpdateListener(updatedContext => {
        this.preservedViewCallbackContext = updatedContext.goBackContext;
        console.info(
          'context update: project ID as luigi param: ' +
          updatedContext.currentProject,
          'goBackContext?',
          this.preservedViewCallbackContext
        );
      });
    },
    props: {
      'projectId': {
        type: String,
        required: false,
        default: null
      }
    }
  }
</script>

<style scoped lang="scss">
  section {
    button {
      margin-bottom: 0.75rem;
    }
    & > * {
        line-height: 1.75em;
      }
    li {
      display: block;
    }
    li:not(:last-of-type) {
      padding-bottom: 20px;
    }
  }
</style>
