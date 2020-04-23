//data required for DashoboardOffers:
//ResourceName, number, Uom, location (postal code)

const Offer1 = {
    id: "1", 
    contactInfoId: "1",
    locationId: "1",
    resourceId: "1",
    number: "200",
    creationDate: "19.04.2020",
    lastChangedDate: "19.04.2020"

};
const Offer2 = {
    id: "2", 
    contactInfoId: "1",
    locationId: "1",
    resourceId: "1",
    number: "100",
    creationDate: "18.04.2020",
    lastChangedDate: "19.04.2020"

};

const Resource1 = {
    id: "1", 
    name: "Desinfektionsmittel", 
    uomId: "1"
};
const Resource2 = {
    id: "2", 
    name: "Beatmungsgerät", 
    uomId: "2"
};

const Uom1 = {
    id: "1", 
    uomName: "l"
};
const Uom2 = {
    id: "2",
    uomName: "m^2"
};

const Location1 = {
    id: "0", 
    name: "BeispielUnternehmen1",
    addressId: "1"
};
const Location2 = {
    id: "2", 
    name: "BeispielUnternehmen2",
    addressId: "2"
};

const Offers = [Offer1, Offer2];
const Resources = [Resource1, Resource2];
const Locations = [Location1, Location2];
const Uom = [Uom1, Uom2];

export const getAllOffers = () => Offers;
export const getAllResources = () => Resources;
export const getAllLocations = () => Locations;
export const getAllUom = () => Uom;