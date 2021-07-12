/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import { Note } from './Note'

test('renders content', () => {
  const note = {
    content: 'This is a test'
  }

  const component = render(<Note content={note.content} />)

  // const li = component.container.querySelector('li')
  // console.log(prettyDOM(li))
  // component.getByText('This is a test')
  expect(component.container).toHaveTextContent(note.content)
})
