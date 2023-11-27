const COMMON_MESSAGE = require("../common/lang/lang");
const Feedback = require("../model/feedbackModel");

const getAllFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find();
    res.send({
      status: true,
      statusCode: 200,
      message: COMMON_MESSAGE.COMMON.FETCH_SUCCESS,
      result: feedback,
    });
  } catch (error) {
    next(error);
  }
};

const addFeedback = async (req, res, next) => {
  const {
    customerId,
    customerName,
    feedbackType,
    feedbackSubject,
    feedback,
    rating,
  } = req.body;
  try {
    const newFeedback = new Feedback({
      customerId,
      customerName,
      feedbackType,
      feedbackSubject,
      feedback,
      rating,
    });

    const savedFeedback = await newFeedback.save();
    res.send({
      status: true,
      statusCode: 200,
      message: COMMON_MESSAGE.COMMON.FETCH_SUCCESS,
      result: savedFeedback,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleFeedback = async (req, res, next) => {
  const { customerId } = req.body;
  try {
    const feedback = await Feedback.find({ customerId });
    res.send({
      status: true,
      statusCode: 200,
      message: COMMON_MESSAGE.COMMON.FETCH_SUCCESS,
      result: feedback,
    });
  } catch (error) {
    next(error);
  }
};

const updateSingleFeedback = async (req, res, next) => {
  const {
    _id,
    customerId,
    customerName,
    feedbackType,
    feedbackSubject,
    feedback,
    rating,
  } = req.body;

  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      _id,
      {
        customerId,
        customerName,
        feedbackType,
        feedbackSubject,
        feedback,
        rating,
      },
      { new: true }
    );

    if (!updatedFeedback) {
      return res.send({
        status: false,
        statusCode: 404,
        message: "Feedback not found",
        result: null,
      });
    }

    res.send({
      status: true,
      statusCode: 200,
      message: COMMON_MESSAGE.COMMON.UPDATE_MESSAGE,
      result: updatedFeedback,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleFeedback = async (req, res, next) => {

  const { id } = req.params;

  if (!id) {
    return res.send({
      status: false,
      statusCode: 404,
      message: COMMON_MESSAGE.ERROR.INTERNAL_ERROR
    });
  }

  try {
    const deleteFeedback = await Feedback.findByIdAndDelete({ _id:id });

    if (!deleteFeedback) {
      return res.send({
        status: false,
        statusCode: 404,
        message: COMMON_MESSAGE.ERROR.INTERNAL_ERROR
      });
    }

    res.send({
      status: true,
      statusCode: 200,
      message: COMMON_MESSAGE.COMMON.DELETE_MESSAGE,
      result: deleteFeedback,
    });
  } catch (error) {
    next(error);
  }
};

const generateDashboardData = async (req, res, next) => {
  try { 
    
    const feedbackData = await Feedback.find();
    const overallCount = feedbackData.length;
    const uniqueCustomerIds = new Set(feedbackData.map((feedback) => feedback.customerId));
    const uniqueCustomerIdCount = uniqueCustomerIds.size;
    const feedbackTypeCounts = feedbackData.reduce((counts, feedback) => {
      counts[feedback.feedbackType] =  (counts[feedback.feedbackType] || 0) + 1;
      return counts;
    }, {});

    const dashboardData = {
      overallCount,
      uniqueCustomerIdCount,
      feedbackTypeCounts,
    };

    res.json({
      status: true,
      statusCode: 200,
      message: COMMON_MESSAGE.COMMON.FETCH_SUCCESS,
      result: dashboardData,
    });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  getAllFeedback,
  addFeedback,
  getSingleFeedback,
  updateSingleFeedback,
  deleteSingleFeedback,generateDashboardData
};
