import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Modal from '@/views/projects/components/modal.vue';

describe('modal.vue', () => {
  it('show modal', () => {
    const someText = 'Fancy content of modal';

    const wrapper = shallowMount(Modal, {
      slots: {
        default: someText
      }
    });

    expect(wrapper.vm.visible).to.equal(false);
    wrapper.vm.show();
    expect(wrapper.vm.visible).to.equal(true);
    expect(wrapper.find('.fd-modal__body').text()).to.equal(someText);
  });
});
