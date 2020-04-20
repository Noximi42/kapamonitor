import types from '../types';

export const setOffers = (newOffers) => ({
    type: types.SET_OFFERS,
    newOffers,
});

export const updateOffers = (updatedOffers) => ({
    type: types.UPDATE_OFFERS,
    updatedOffers,
});

export const deleteOffers = (deletedOffers) => ({
    type: types.DELETE_OFFERS,
    deletedOffers,
});

export const resetSearchFilter = () => ({
    type: types.RESET_SEARCH_FILTER,
});

export const setSearchFilter = (searchtext) => ({
    type: types.SET_SEARCH_FILTER,
    filter: {
        text: searchtext,
    },
});
