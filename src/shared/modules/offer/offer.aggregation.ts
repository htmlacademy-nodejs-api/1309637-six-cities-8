import { Types } from 'mongoose';
import { OFFER_RATING } from '../../constants/offer.js';

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

export const populateComments = [
  {
    $lookup: {
      from: 'comments',
      let: { offerId: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$offerId', '$$offerId'] } } },
        { $project: { _id: 1, rating: 1 } },
      ],
      as: 'comments',
    }
  },
  { $addFields: { commentsCount: { $size: '$comments'} } },
  { $addFields: { commentRatingSum: {
    $reduce: {
      input: '$comments',
      initialValue: { sum: 0 },
      in: {
        sum: { $add: ['$$value.sum', '$$this.rating'] }
      }
    }
  } } },
  { $addFields: { rating: {
    $cond: {
      if: {
        $ne: ['$commentsCount', 0]
      },
      then: { $round: [{
        $divide: [
          '$commentRatingSum.sum',
          '$commentsCount'
        ]
      }, OFFER_RATING.MAX_NUM_AFTER_DIGIT] },
      else: null,
    }
  } } },
  { $unset: 'commentRatingSum' },
  { $unset: 'comments' },
];

export const getIsFavorite = (userId: string, offerId: string = '') => {
  if (userId) {
    return [
      {
        $lookup: {
          from: 'users',
          pipeline: [
            { $match: { '_id': new Types.ObjectId(userId) } },
            { $project: { favorites: 1 } }
          ],
          as: 'currentUser'
        },
      },
      { $unwind: '$currentUser' },
      { $addFields: { isFavorite: {
        $in: [offerId ? new Types.ObjectId(offerId) : '$_id' , '$currentUser.favorites']
      } }},
      { $unset: 'currentUser' }
    ];
  }

  return [
    { $addFields: { isFavorite: false } },
  ];
};
