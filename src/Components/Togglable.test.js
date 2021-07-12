/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let component
  const showButtonLabel = 'Show'
  const hideButtonLabel = 'Hide'

  beforeEach(() => {
    component = render(
      <Togglable showButtonLabel={showButtonLabel} hideButtonLabel={hideButtonLabel}>
        <div>testDiv</div>
      </Togglable>
    )
  })

  test('visible content can be hided', () => {
    expect(component.container).toHaveTextContent(showButtonLabel)
    expect(component.container).toHaveTextContent(hideButtonLabel)

    const el = component.getByText('testDiv')
    expect(el.parentNode).toHaveStyle('display: none')

    const showButton = component.getByText(showButtonLabel)
    fireEvent.click(showButton)

    expect(el.parentNode).not.toHaveStyle('display: none')

    const hideButton = component.getByText(hideButtonLabel)
    fireEvent.click(hideButton)

    expect(el.parentNode).toHaveStyle('display: none')
  })
})
