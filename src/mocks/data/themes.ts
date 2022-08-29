import { UploadFile } from '../../../admiral'

export interface ITheme {
    id: number | string
    key: number | string
    name: string
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

export class ThemeList {
    private id: number
    private themes: ITheme[]

    constructor() {
        this.id = 1
        this.themes = this.init()
    }

    private init() {
        const data: ITheme[] = [
            {
                id: 1,
                key: 1,
                name: 'My Theme Default',
                color_typo_primary: 'rgb(95, 14, 187)',
                color_typo_secondary: 'rgb(141, 118, 162)',
                color_typo_alert: 'rgb(68, 158, 29)',
                color_control_bg_system: 'rgb(68, 158, 29)',
                color_control_typo_system: 'rgb(253, 253, 253)',
            },
        ]

        return data
    }

    add(data: Partial<ITheme>) {
        const newId = data.id || ++this.id
        const newTheme: ITheme = {
            name: '',
            ...data,
            id: newId,
            key: newId,
        }

        this.themes = [newTheme, ...this.themes]
        return newTheme
    }

    delete(id: number | string): ITheme | null {
        let removed: ITheme | null = null

        this.themes = this.themes.filter((theme) => {
            if (theme.id !== +id) {
                return true
            } else {
                removed = theme
                return false
            }
        })
        return removed
    }

    update(id: number | string, data: ITheme) {
        this.themes = this.themes.map((theme) => {
            if (+theme.id === +id) return { ...theme, ...data }
            return theme
        })
    }

    getThemes(start: number = 0, end: number = -1) {
        return [this.themes.slice(start, end), this.themes]
    }

    getThemeById(id: number | string) {
        return this.themes.find((theme) => theme.id == id)
    }

    get length() {
        return this.themes.length
    }
}
