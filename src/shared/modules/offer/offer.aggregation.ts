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
  { $addFields: { commentsCount: { $size: '$comments'} } },
  { $unset: 'comments' }
];
