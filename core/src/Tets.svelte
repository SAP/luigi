<script>
  import Alerts from './Alerts.svelte';
  import { onMount, setContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import { CSS_BREAKPOINTS } from './utilities/constants';
  import { GenericHelpers } from './utilities/helpers'

  onMount(() => {});

	let name = 'tets';
	let showLoadingIndicator = false;

	/// RESIZING

	let hideNav;
	let hideSideNav;
	let previousWindowWidth;

  let closeLeftNav = () => {
    document.body.classList.remove('lui-leftNavToggle');
  };

	let onResize = () => {
    const isMobileToDesktop =
      window.innerWidth >= CSS_BREAKPOINTS.desktopMinWidth &&
      previousWindowWidth < CSS_BREAKPOINTS.desktopMinWidth;
    const isDesktopToMobile =
      window.innerWidth < CSS_BREAKPOINTS.desktopMinWidth &&
      previousWindowWidth >= CSS_BREAKPOINTS.desktopMinWidth;

    if (isMobileToDesktop || isDesktopToMobile) {
      closeLeftNav();
    }
    previousWindowWidth = window.innerWidth;
  };

	//// ALERTS

	let alerts =
  	 [
  	  {
  	    settings: {
  	      text: `Ut enim ad minim veniam, {goToHome} quis nostrud exercitation
            ullamco {relativePath} laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor {goToOtherProject} in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur!?`,
          links: {
            goToHome: { text: 'homepage', url: '/overview' },
            goToOtherProject: { text: 'other project', url: '/projects/pr2' },
            relativePath: { text: 'relative hide side nav', url: 'hideSideNav' }
          },
  	      type: 'warning',
  	      id: '123456',
  	    }
  	  }
  	];


  let getAlertWithId = (alertQueue, id) => {
    if (!alertQueue || !alertQueue.length) return;
    return alertQueue.filter(alert => alert.settings.id === id)[0];
  };

	let handleAlertDismiss = (event) => {
	 const id = event.detail.id;
   const alert = getAlertWithId(alerts, id);

   if (!alert) {
     console.error(
       'An unexisting alert has been dismissed.',
       alerts,
       id
     );
     return;
   }

   const openFromClient = alert.openFromClient;

   console.log('removing alert ', id);

   alerts = alerts.filter(a => a.settings.id !== id);
  /*TODO
   if (openFromClient) {
     const iframe = Iframe.getActiveIframe(this.get().contentNode);
     const message = {
       msg: 'luigi.ux.alert.hide',
       id
       //TODO: update docu for this param
     };
     IframeHelpers.sendMessageToIframe(iframe, message);
   }
   */
 };

 //// MODALS

  let confirmationModal;
  let unsavedChanges = {
    isDirty: false,
    persistUrl: null
  };

  let showModal = (settings, openFromClient = false) => {
    return new Promise((resolve, reject) => {
      confirmationModal = {
        displayed: true,
        settings,
        openFromClient,
        promise: { resolve, reject }
      }
    });
  };

  let shouldShowUnsavedChangesModal = (source) => {
    if (
      GenericHelpers.canComponentHandleModal(this) &&
      unsavedChanges.dirtySet
    ) {
      if (source) {
        return unsavedChanges.dirtySet.has(source);
      } else if (unsavedChanges.dirtySet.size > 0) {
        return true;
      }
    }
    return false;
 };

  let showUnsavedChangesModal = () => {
    return showModal({
      header: LuigiI18N.getTranslation('luigi.unsavedChangesAlert.header'),
      body: LuigiI18N.getTranslation('luigi.unsavedChangesAlert.body'),
      buttonDismiss: LuigiI18N.getTranslation('luigi.button.dismiss'),
      buttonConfirm: LuigiI18N.getTranslation('luigi.button.confirm')
    });
  };

  let getUnsavedChangesModalPromise = (source) => {
    return new Promise(resolve => {
      if (shouldShowUnsavedChangesModal(source)) {
        showUnsavedChangesModal().then(
          () => {
            if (
              unsavedChanges &&
              unsavedChanges.dirtySet
            ) {
              if (source) {
                unsavedChanges.dirtySet.delete(source);
              } else {
                unsavedChanges.dirtySet.clear();
              }
            }
            resolve();
          },
          () => {}
        );
      } else {
        resolve();
      }
    });
  };

 setContext('getUnsavedChangesModalPromise', getUnsavedChangesModalPromise);

</script>

<svelte:window on:resize="{onResize}"/>
<div
  id="app"
  class="{hideNav? 'no-nav' : ''} {hideSideNav? 'no-side-nav' : ''}"
>

  <h1>Hello {name}!</h1>

  {#if alerts && alerts.length}
    <Alerts alertQueue="{alerts}" on:alertDismiss="{handleAlertDismiss}"></Alerts>
  {/if}

  {#if showLoadingIndicator}
    <div
      in:fade="{{delay: 250, duration: 250}}"
      out:fade="{{duration: 250}}"
      class="fd-page spinnerContainer"
      aria-hidden="false"
      aria-label="Loading"
    >
      <div class="fd-spinner">
        <div></div>
      </div>
    </div>
  {/if}

</div>
