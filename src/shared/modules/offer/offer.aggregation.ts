import { DEFAULT_COMMENTS_COUNT } from '../../constants/index.js';
import { ESortType } from '../../types/index.js';

export const populateAuthor = {
  $lookup: {
    from: 'users',
    localField: 'authorId',
    foreignField: '_id',
    as: 'author',
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
