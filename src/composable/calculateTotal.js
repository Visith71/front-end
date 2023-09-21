export function calculateTotal(arr, field) {
    // console.log('hii')
    // console.log(field)
    let total = 0
    if (arr && arr.items) {
        arr.items.map((item) => {
            total += item[field]
        })
    }
    return total
}