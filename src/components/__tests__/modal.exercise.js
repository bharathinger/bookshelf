// 🐨 you're gonna need this stuff:
import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal, ModalContents, ModalOpenButton } from '../modal'

test('can be opened and closed', async () => {
  render(
    <Modal>
      <ModalOpenButton>
        <button>Open</button>
      </ModalOpenButton>
      <ModalContents aria-label="Modal Label" title="Modal Title">
        <div>Modal content</div>
      </ModalContents>
    </Modal>,
  )
  await userEvent.click(screen.getByRole('button', { name: /open/i }))

  const modal = screen.getByRole('dialog')
  expect(modal).toHaveAttribute('aria-label', 'Modal Label')
  const inModal = within(modal)
  expect(inModal.getByRole('heading', { name: 'Modal Title' })).toBeInTheDocument()
  expect(inModal.getByText('Modal content')).toBeInTheDocument()
  await userEvent.click(inModal.getByRole('button', { name: /close/i }))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

})
// 🐨 render the Modal, ModalOpenButton, and ModalContents
// 🐨 click the open button
// 🐨 verify the modal contains the modal contents, title, and label
// 🐨 click the close button
// 🐨 verify the modal is no longer rendered
// 💰 (use `query*` rather than `get*` or `find*` queries to verify it is not rendered)
// 💰 Remember all userEvent utils are async, so you need to await them.
