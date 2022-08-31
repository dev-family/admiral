import { UploadFile } from '../../../admiral'

export interface ITheme {
    color_typo_primary?: string
    color_typo_secondary?: string
    color_typo_alert?: string
    color_control_bg_system?: string
    color_control_typo_system?: string
    logo?: UploadFile | null
    logo_text?: string
    color_logo?: string
    color_header?: string
    color_header_control_bg?: string
    color_header_control_typo?: string
    color_modal_header_bg?: string
    color_modal_header_typo?: string
    color_control_bg_primary?: string
    color_control_typo_primary?: string
}

export class Theme {
    data: ITheme

    constructor() {
        this.data = this.init()
    }

    private init() {
        const data: ITheme = {
            color_typo_primary: 'rgb(95, 14, 187)',
            color_typo_secondary: 'rgb(141, 118, 162)',
            color_typo_alert: 'rgb(68, 158, 29)',
            color_control_bg_system: 'rgb(68, 158, 29)',
            color_control_typo_system: 'rgb(253, 253, 253)',
        }

        return data
    }

    update(data: ITheme) {
        this.data = { ...this.data, ...data }
    }
}
