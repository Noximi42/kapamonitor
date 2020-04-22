import stepCounter from './stepCounter/stepCounter';
import registerUnit from './register/reducers';
import userNotice from './userNotice/reducers';
import user from './user/reducers';
import settings from './settings/settings';
import leaflet from './leaflet/reducers';
import offers from './offers/reducers';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    stepCounter,
    registerUnit,
    leaflet,
    userNotice,
    settings,
    user,
    offers,
});

export default reducers;
