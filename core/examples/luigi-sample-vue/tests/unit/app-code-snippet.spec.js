import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import AppCodeSnippet from '@/components/app-code-snippet.vue'

describe('app-code-snippet.vue', () => {
  it('renders code slot when passed', () => {
    const someCode = 'HelloWorld()'
    const wrapper = shallowMount(AppCodeSnippet, {
      slots: {
        default: someCode
      }
    })

    expect(wrapper.find('code').text()).to.equal(someCode)
  })
})
