import { describe, expect, test, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Form } from '../admiral/form/Form'
import { FilePictureInput } from '../admiral/form/fields'

const renderInput = () => {
    const utils = render(
        <MemoryRouter>
            <Form submitData={async () => ({})}>
                <FilePictureInput label="Avatar" name="avatar" maxCount={1} />
            </Form>
        </MemoryRouter>,
    )
    const fileInput = utils.container.querySelector('input[type="file"]') as HTMLInputElement
    const clicks = vi.fn()
    fileInput.addEventListener('click', clicks)
    return { ...utils, fileInput, clicks }
}

describe('FilePictureInput trigger area', () => {
    test('a click on the form-item label/empty area does not open the file dialog', () => {
        const { container, clicks } = renderInput()

        const label = container.querySelector('label')
        expect(label).not.toBeNull()
        fireEvent.click(label!)

        expect(clicks).not.toHaveBeenCalled()
    })

    test('a click on the upload button still opens the file dialog', () => {
        const { container, clicks } = renderInput()

        const button = container.querySelector('button') as HTMLButtonElement
        fireEvent.click(button)

        expect(clicks).toHaveBeenCalled()
    })
})
