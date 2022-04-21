import { Editor as TinyEditor } from '@tinymce/tinymce-react'
import { AutocompleterConfig, AutocompleterItem } from '../interfaces'

type TinyMCEEditor = TinyEditor['editor']

// FIXME: dont work on mobile

export function setupAutocompleters(
    editor: TinyMCEEditor,
    config: AutocompleterConfig | AutocompleterConfig[],
) {
    const configs = Array.isArray(config) ? config : [config]
    const onAction = (autocompleteApi: any, rng: any, value: string) => {
        editor!.selection.setRng(rng)
        editor!.insertContent(value)
        autocompleteApi.hide()
    }

    const getMatchedChars = (items: AutocompleterItem[], pattern: string) => {
        return items.filter((item) => {
            return item.text.toLowerCase().indexOf(pattern.toLowerCase()) !== -1
        })
    }

    configs.forEach((config) => {
        const {
            id,
            trigger = '@',
            minCharsToTrigger = 0,
            items,
            highlightOnSearch = true,
            filterOnInput = false,
            mode = 'cardmenuitem',
            includeValueInTitle = true,
            columns = 1,
        } = config

        editor!.ui.registry.addAutocompleter(id, {
            ch: trigger,
            minChars: minCharsToTrigger,
            columns,
            onAction: onAction,
            fetch: (pattern) => {
                return new Promise((resolve) => {
                    const filteredItems = filterOnInput ? getMatchedChars(items, pattern) : items
                    const results = filteredItems.map((item) => {
                        switch (mode) {
                            case 'cardmenuitem': {
                                return createCardMenuItem(item, includeValueInTitle)
                            }
                            case 'autocompleteitem': {
                                return createAutocompleteItem(item)
                            }
                            default:
                                return null
                        }
                    })
                    resolve(results as any)
                })
            },
            ...(highlightOnSearch && { highlightOn: ['item_name'] }),
        })
    })
}

function createAutocompleteItem({ value, text, icon }: AutocompleterItem) {
    return {
        type: 'autocompleteitem',
        value: value,
        text: text,
        icon: icon ?? value,
    }
}

function createCardMenuItem({ value, text }: AutocompleterItem, includeValue?: boolean) {
    return {
        type: 'cardmenuitem',
        value: value,
        label: text,
        items: [
            {
                type: 'cardcontainer',
                direction: 'vertical',
                items: [
                    {
                        type: 'cardtext',
                        text: includeValue ? `${text} ${value}` : `${text}`,
                        name: 'item_name',
                    },
                ],
            },
        ],
    }
}
