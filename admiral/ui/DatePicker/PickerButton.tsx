import React from 'react'
import { Button } from '@/admiral/ui'
import { ButtonProps } from '@/admiral/ui/Button/interfaces'

export default function PickerButton(props: ButtonProps) {
    return <Button size="M" type="primary" {...props} />
}
