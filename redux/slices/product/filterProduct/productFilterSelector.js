import { createSelector } from "reselect";

const selectFilter = state=>state.filter

export const selectSortPrice = createSelector(
    selectFilter,
    filter=>filter.sortPrice
)

export const selectSearch = createSelector(
    selectFilter,
    filter=>filter.text
)

export const selectPrice = createSelector(
    selectFilter,
    filter=>filter.price
)