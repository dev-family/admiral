import React from 'react'
import { Button } from '../../ui'
import { ButtonProps } from '../../ui/Button/interfaces'

export default function PickerButton(props: ButtonProps) {
    return <Button size="XS" view="primary" {...props} />
}
