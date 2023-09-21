import {FilterService,FilterMatchMode} from 'primevue/api';

export function filteredGroupedArr(e, groupedArray) {
  let query = e.query
  let filteredDayPart = []

  for (let item of groupedArray) {
    let filteredItems = FilterService.filter(item.items, ['name'], query, FilterMatchMode.CONTAINS);
    if (filteredItems && filteredItems.length) {
      filteredDayPart.push({...item, ...{items: filteredItems}})
    }
  }
  return filteredDayPart
}
