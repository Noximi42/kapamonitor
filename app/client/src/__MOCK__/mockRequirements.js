const rawRequirement1 = {
    id: "1",
    locationId: "1",
    resourceId: "1", 
    number: 200    
};
const rawRequirement2 = {
    id: "2", 
    locationId: "1", 
    resourceId: "2", 
    number: 300
};
const rawRequirement3 = {
    id: "3", 
    locationId: "0", 
    resourceId: "1", 
    number: 300
};

const Resource1 = {
    id: "1", 
    resourceName: "Desinfektionsmittel", 
    uomId: "1"
};
const Resource2 = {
    id: "2", 
    resourceName: "Lokalität", 
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
    locationName: "Beispielkrankenhaus0"
};
const Location2 = {
    id: "1", 
    locationName: "Beispielkrankenhaus1"
};

const RawRequirements = [rawRequirement1, rawRequirement2, rawRequirement3];
const Resources = [Resource1, Resource2];
const Uom = [Uom1, Uom2];
const Locations = [Location1, Location2];

//const pickRandomEntry = versions => Math.floor(Math.random() * 10) % versions;

//const rows = (new Array(30)).fill(null).map(entry => mockEntries[pickRandomEntry(3)]);

export const getAllRequirements = () => RawRequirements;
export const getAllResources = () => Resources;
export const getAllUom = () => Uom;
export const getAllLocations = () => Locations;