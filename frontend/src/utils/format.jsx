export const numberFormat = value => (
    Intl.NumberFormat('tr').format(value)
)

export const dateFormat = value => (
    Intl.DateTimeFormat('tr').format(value)
)

