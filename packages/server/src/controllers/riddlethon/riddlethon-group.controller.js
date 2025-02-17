const riddlethonGroupService = require("../../services/riddlethon-group.service");

const {
  handleValidationResult,
} = require("../../lib/handle-validation-result");
const { handleError } = require("../../lib/handle-error");

module.exports = {
  create: async (req, res, next) => {
    try {
      handleValidationResult(req);

      const { name } = req.body;
      const { user } = req;

      const createdGroup = await riddlethonGroupService.create({
        name,
        userId: user._id,
      });

      return res.status(200).json(createdGroup);
    } catch (error) {
      return handleError(error, next);
    }
  },
  join: async (req, res, next) => {
    try {
      const { id } = req.query;
      const { user } = req;

      const joinedGroup = await riddlethonGroupService.join(id, {
        userId: user._id,
      });

      return res.status(200).json(joinedGroup);
    } catch (error) {
      return handleError(error, next);
    }
  },
  leave: async (req, res, next) => {
    try {
      const { user } = req;

      await riddlethonGroupService.leave({ userId: user._id });

      return res.status(200).json();
    } catch (error) {
      return handleError(error, next);
    }
  },
};
