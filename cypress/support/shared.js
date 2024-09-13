
import { faker } from "@faker-js/faker";

let locationName;
let locationEmail;
let validPhoneNumber;
let siteCode;

export const generateValues = () => {
  if (!locationName) {
    locationName = getLocationName();
    locationEmail = getLocationEmail();
    validPhoneNumber = getValidPhoneNumber();
    siteCode = getSiteCode(locationName);
  }
};

const getLocationName = () => {
  let rawLocationName = faker.address.city();
  const regex = /[^a-zA-Z0-9'_-]/g;
  locationName = rawLocationName.replace(regex, "");
  return locationName;
};

const getLocationEmail = () => {
  return faker.internet.email();
};

const getValidPhoneNumber = () => {
  const randomDigits = Math.floor(10000000 + Math.random() * 90000000).toString();
  validPhoneNumber = `08${randomDigits}`;
  return validPhoneNumber;
};

const getSiteCode = (locationName) => {
  siteCode = locationName.slice(0, 2);
  return siteCode;
};

export { locationName, locationEmail, validPhoneNumber, siteCode };