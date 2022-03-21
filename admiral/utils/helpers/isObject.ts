export const isObject = (value: any) => {
    return typeof value === 'object' && !Array.isArray(value) && value !== null
}
