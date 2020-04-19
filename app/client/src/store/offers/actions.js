import types from '../types';

export const setOffers = (newOffers) => ({
    type: types.SET_OFFERS,
    newOffers,
});

export const deleteOffers = (deletedOffers) => ({
    type: types.DELETE_OFFERS,
    deletedOffers,
});

export const resetSearchFilter = () => ({
    type: types.RESET_SEARCH_FILTER,
});

export const setSearchFilter = (searchtext) => ({
    type: types.setSearchFilter,
    filter: {
        text: searchtext,
    },
});
