import types from '../types';

const initState = {
    offers: [],
    filteredOffers: [],
    filter: {
        text: '',
    },
};

function removeFromArray(original, remove) {
    return original.filter((value) => !remove.includes(value));
}

export default function registerUnitReducer(state = initState, action) {
    console.log(action);
    console.log(state);
    switch (action.type) {
        case types.SET_OFFERS:
            return {
                ...state,
                offers: action.newOffers.map(
                    (obj) => state.offers.find((o) => o.id === obj.id) || obj
                ),
                filteredOffers: action.newOffers.map(
                    (obj) => state.offers.find((o) => o.id === obj.id) || obj
                ),
            };
        case types.DELETE_OFFERS:
            return {
                ...state,
                offers: removeFromArray(state.offers, action.deletedOffers),
                filteredOffers: removeFromArray(
                    state.offers,
                    action.deletedOffers
                ),
            };
        case types.RESET_SEARCH_FILTER:
            return {
                ...state,
                filter: {
                    text: '',
                },
            };
        case types.SET_SEARCH_FILTER:
            return {
                ...state,
                filter: action.filter,
                filteredOffers: state.offers.filter((offer) => {
                    return offer.ikId.includes(action.filter.text);
                }),
            };
        default:
            return state;
    }
}
