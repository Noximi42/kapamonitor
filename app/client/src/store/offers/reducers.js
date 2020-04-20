import types from '../types';

const initState = {
    offers: [],
    filteredOffers: [],
    filter: {
        text: '',
    },
};

function removeFromArray(original, remove) {
    let copy = original.slice();
    return copy.filter((value) => !remove.includes(value));
}

export default function registerUnitReducer(state = initState, action) {
    switch (action.type) {
        case types.SET_OFFERS:
            return {
                ...state,
                offers: action.newOffers,
                filteredOffers: action.newOffers,
            };

        case types.UPDATE_OFFERS:
            let updatedOffers = state.offers.map(
                (obj) =>
                    action.updatedOffers.find((o) => o.id === obj.id) || obj
            );
            let updatedfilteredOffers = state.filteredOffers.map(
                (obj) =>
                    action.updatedOffers.find((o) => o.id === obj.id) || obj
            );
            return {
                ...state,
                offers: updatedOffers,
                filteredOffers: updatedfilteredOffers,
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
                    ...state.filter,
                    text: '',
                },
            };
        case types.SET_SEARCH_FILTER:
            return {
                ...state,
                filter: action.filter,
                filteredOffers: state.offers.filter((offer) => {
                    return offer.ikId
                        .toUpperCase()
                        .includes(action.filter.text.toUpperCase());
                }),
            };
        default:
            return state;
    }
}
