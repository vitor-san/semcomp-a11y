const riddleGroupService = require("../../services/riddle-group.service");

const {
  handleValidationResult,
} = require("../../lib/handle-validation-result");
const { handleError } = require("../../lib/handle-error");

module.exports = {
  list: async (req, res, next) => {
    try {
      handleValidationResult(req);

      const groupsFound = await riddleGroupService.get();

      return res.status(200).json(groupsFound);
    } catch (error) {
      return handleError(error, next);
    }
  },
  delete: async (req, res, next) => {
    try {
      handleValidationResult(req);

      const { id } = req.params;

      const groupDeleted = await riddleGroupService.adminDelete(
        id,
        req.adminUser
      );

      return res.status(200).send(groupDeleted);
    } catch (error) {
      return handleError(error, next);
    }
  },
};
