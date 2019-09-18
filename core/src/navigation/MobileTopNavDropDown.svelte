<script>
  import BadgeCounter from './BadgeCounter.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let label;
  export let nodes;
  export let getTestId;
  export let hasOpenUIicon;
  export let getNodeLabel;

  // [svelte-upgrade suggestion]
  // review these functions and remove unnecessary 'export' keywords
  export function onActionClick(value) {
    dispatch('listClick', value);
  }
</script>

<div
  class="fd-modal y-fd-modal--full-screen"
  on:click|stopPropagation="{()=>{}}"
>
  <div class="fd-modal__content" role="document">
    <div class="fd-action-bar">
      <div class="fd-action-bar__back">
        <button
          class="fd-button--light fd-button--compact sap-icon--nav-back"
          on:click
          data-testid="mobile-topnav-close"
        ></button>
      </div>
      <div class="fd-action-bar__header">
        <h5 class="fd-action-bar__title fd-has-type-1">{label}</h5>
      </div>
    </div>
    <div class="fd-modal__body">
      <ul class="y-full-width-list">
        {#if nodes}
        {#each nodes as node}
        <li
          class="y-full-width-list__item"
          on:click="{() => onActionClick(node)}"
          data-e2e="mobile-topnav-item"
          data-testid="{getTestId(node)}"
        >
          <span
            class="y-full-width-list__icon {node.icon && hasOpenUIicon(node) ? 'sap-icon--' + node.icon + ' sap-icon--m' : '' }"
          >
            {#if !hasOpenUIicon(node)}
            <img src="{node.icon}">
            {/if}
            <BadgeCounter {node}/>
          </span>
          <span class="y-full-width-list__title">{getNodeLabel(node)}</span>
        </li>
        {/each}
        {/if}
      </ul>
    </div>
  </div>
</div>

<style type="text/scss">
  $topNavHeight: 48px;
  $mobileTopNavHeight: 64px;

  .y-fd-modal--full-screen {
    z-index: 1000;
    position: fixed;
    box-sizing: border-box;
    top: $topNavHeight;
    left: 0;
    margin: auto auto;

    .fd-modal__content {
      $margin: 0px; //distance from viewport borders. Please remove the line below (border-radius) if not set to 0.
      border-radius: 0;

      width: calc(100vw - 2 * #{$margin});
      height: 100vh; /* Fallback for browsers that do not support Custom Properties */
      height: calc(var(--vh, 1vh) * 100);
      margin: $margin;
      display: grid;
      grid-template-rows: 1fr auto; //no row for title by default
    }

    .fd-modal__title {
      text-align: left;
      @at-root {
        .y-fd-modal--full-screen .fd-modal__content {
          grid-template-rows: auto 1fr auto; //add another row to the top of the modal if __title is present
        }
      }
    }

    .fd-modal__body {
      max-height: calc(100vh - #{$topNavHeight} - #{$mobileTopNavHeight});
      max-height: calc(
        var(--vh, 1vh) * 100 - #{$topNavHeight} - #{$mobileTopNavHeight}
      );
      padding: 0;
      -webkit-overflow-scrolling: touch;
    }
  }

  @media (min-width: 320px) {
    .fd-action-bar__back {
      display: block !important;
    }
  }

  @media (max-width: 1023px) {
    .y-full-width-list {
      &__icon {
        img {
          width: 16px;
          vertical-align: top;
        }
      }
    }
  }

  .y-full-width-list {
    width: 100%;
    text-align: left;
    list-style: none;

    &__item {
      display: block;
      padding: 12px 15px;
      cursor: pointer;
      cursor: pointer;

      &:hover {
        background: #f5faff;
        .y-full-width-list__title {
          font-weight: bold;
        }
      }
    }

    &__title {
      color: #515559;
    }

    &__subtitle {
      color: #74777a;
    }
  }
</style>
