import {
  OFFER_TITLE_LENGTH,
  OFFER_DESCRIPTION_LENGTH,
  PHOTOS_LENGTH,
  ROOMS_NUMBER,
  VISITORS_NUMBER,
} from '../../../constants/index.js';

export const OfferValidationMessage = {
  title: {
    invalidFormat: 'Field title must be a string',
    minLength: `Minimum title length must be ${OFFER_TITLE_LENGTH.MIN}`,
    maxLength: `Maximum title length must be ${OFFER_TITLE_LENGTH.MAX}`,
  },
  description: {
    invalidFormat: 'Field description must be a string',
    minLength: `Minimum description length must be ${OFFER_DESCRIPTION_LENGTH.MIN}`,
    maxLength: `Maximum description length must be ${OFFER_DESCRIPTION_LENGTH.MAX}`,
  },
  city: {
    invalid: 'city must be Paris, Cologne, Brussels, Amsterdam, Hamburg or Dusseldorf',
  },
  previewImagePath: {
    invalidFormat: 'Field photos must be a string',
  },
  photos: {
    invalidFormat: 'Field photos must be an array',
    invalidLength: `Photos length must be ${PHOTOS_LENGTH}`,
  },
  isPremium: {
    invalidFormat: 'Field isPremium must be a boolean',
  },
  housingType: {
    invalid: 'housingType must be apartment, house, room or hotel',
  },
  roomsNumber: {
    invalidFormat: 'Field roomsNumber must be an integer',
    min: `Min roomsNumber must be ${ROOMS_NUMBER.MIN}`,
    max: `Max roomsNumber must be ${ROOMS_NUMBER.MAX}`,
  },
  visitorsNumber: {
    invalidFormat: 'Field visitorsNumber must be an integer',
    min: `Min visitorsNumber must be ${VISITORS_NUMBER.MIN}`,
    max: `Max visitorsNumber must be ${VISITORS_NUMBER.MAX}`,
  },
  price: {
    invalidFormat: 'Field price must be an integer',
    min: `Min price must be ${VISITORS_NUMBER.MIN}`,
    max: `Max price must be ${VISITORS_NUMBER.MAX}`,
  },
  facilities: {
    invalidFormat: 'Field photos must be an array',
    invalid: 'facilities must be an unique array of Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels or Fridge',
  },
  authorId: {
    invalid: 'Field authorId must be a valid MongoDB identifier',
  },
  coords: {
    invalidFormat: 'Field coords must be an object of latitude and longitude fields',
    latitude: {
      invalidFormat: 'Field latitude must be an integer',
    },
    longitude: {
      invalidFormat: 'Field longitude must be an integer',
    },
  }
};
