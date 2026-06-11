import { Button } from '../Button'
import { ButtonProps } from '../Button/interfaces'

export default function PickerButton(props: ButtonProps) {
    return <Button size="XS" view="primary" {...props} />
}
