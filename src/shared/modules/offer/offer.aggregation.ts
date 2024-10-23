import { DEFAULT_COMMENTS_COUNT } from '../../constants/index.js';
import { ESortType } from '../../types/index.js';

export const populateAuthor = [
  {
    $lookup: {
      from: 'users',
      localField: 'authorId',
      foreignField: '_id',
      as: 'author',
    },
  },
  { $unwind: '$author' },
];

export const selectOfferFields = {
  $project: {
    _id: 1,
    title: 1,
    description: 1,
    city: 1,
    previewImagePath: 1,
    photos: 1,
    isPremium: 1,
    housingType: 1,
    roomsNumber: 1,
    visitorsNumber: 1,
    price: 1,
    facilities: 1,
    coords: 1,
    author: {
      _id: 1,
      email: 1,
      name: 1,
      type: 1,
      avatarPath: 1,
    }
  },
};

export const populateCommentsCount = [
  {
    $lookup: {
      from: 'comments',
      let: { offerId: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$offerId', '$$offerId'] } } },
        { $project: { _id: 1 } },
      ],
      as: 'comments',
    }
  },
  { id: { $toString: '$_id'}, commentsCount: { $size: '$comments'} },
  { $unset: 'comments' }
];

export const populateComments = [
  {
    $lookup: {
      from: 'comments',
      let: { offerId: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$offerId', '$$offerId'] } } },
        { $project: { _id: 1, text: 1, rating: 1 } },
      ],
      as: 'comments',
    }
  },
  { $limit:  DEFAULT_COMMENTS_COUNT },
  { $sort: { createdDate: ESortType.DESC } }
];
