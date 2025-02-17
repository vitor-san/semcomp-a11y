const createError = require("http-errors");
const ObjectId = require("mongodb").ObjectID;

const SubscriptionModel = require("../models/subscription");

const subscriptionService = {
  get: async (filter) => {
    const subscriptions = await SubscriptionModel.find(filter);

    return subscriptions;
  },
  getOne: async (id) => {
    const subscription = await SubscriptionModel.findById(id);

    if (!subscription) {
      throw new createError.NotFound(
        `Não foi encontrada inscrição com o id ${id}`
      );
    }

    return subscription;
  },
  count: async (filter) => {
    const numberOfSubscriptions = await SubscriptionModel.count(filter);

    return numberOfSubscriptions;
  },
  create: async (userId, eventId, info, hasGroup) => {
    const newSubscription = new SubscriptionModel();

    newSubscription._id = new ObjectId();
    newSubscription.user = userId;
    newSubscription.event = eventId;
    newSubscription.info = info;
    newSubscription.hasGroup = hasGroup;

    await newSubscription.save();

    return newSubscription;
  },
  update: async (info, hasGroup) => {
    const updatedSubscription = await SubscriptionModel.findByIdAndUpdate(
      id,
      {
        info,
        hasGroup,
      },
      { new: true }
    );

    return updatedSubscription;
  },
  delete: async (filter) => {
    const deletedSubscription = await SubscriptionModel.deleteMany(filter);

    return deletedSubscription;
  },
};

module.exports = subscriptionService;
