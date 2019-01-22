// All error messages would be listed here.
exports.errorMessages = {
    'paymentFailed': 'Payment Failed',
    'adminUserExist': "Admin user already exist.",
    'noPostDataProvided': "No data was posted.",
    'incorrectPassword': "Password is incorrect.",
    'dbNoUserFound': "User not found.",
    'dbNoDataFound': "No data found in Db.",
    'duplicateData': "Duplicate data.",
    'noDataFound': "There is some problem with this event. Please try again.",
    'noSeatAvial': "Number of seat you have selected are not available.",
    'noCategoryFound': "No Categories found.",
    'duplicateDataFound': "Duplicate data found.",
    'incorrectSeatFormat': "Please select your seat again.",
    'noTransactionId': "Something went wrong while processing your request.",
    'noTransactionIdInDb': "Something went wrong while processing your request.",
    'unReserveOrder': "Seat for this Performance cannot be reserved.",
    'reserveCancel': "Your reservation has been cancelled.",
    'unsuccessfulAttempt': "Something went wrong while processing your request. Please try again.",
    'noEventUpdated': "No event updated.",
    'notValidPostCode': "Not a valid post code.",
    'successPostCode': "Post Code update successfully.",
    'postDataHasNoInterest': "Post Data must have interests field in it.",
    'failedEventUpdate': 'Failed to update event.',
    'incorrectCard': "Incorrect card details. Please try again.",
    'requiredVenueFields':'Required venue fields unfilled.',
    'venueDoesNotExists': 'This Venue does not exists.',
    'probLoadingVenues': 'Problem with loading Venues, Please try after some time.',
    'probLoadingEvents': 'Problem with loading Events, Please try after some time.',
    'invalidEventDetails': "Please Enter Valid Event Details.",
    'internalServerError': 'Internal Server Error.',
    'cantModifyPublishedEvents': 'You cannot modify "Published" Events.',
    'cantPublishEvents': 'You can"t "Publish" any events.',
    'cantHideEvents': 'You cannot "Hide Events".',
    'onlyAwaitingReview': 'You can only set status as "Awaiting Review".',
    'sameNameVenue':'Venue with the same name already exists.',
    'invalidCustomerDetails': 'Invalid customer details, please enter again.',
    'customerDoesNotExist': 'Customer does not exist.',
    'invalidKidsDetails': 'Please enter enter valid child details.',
    'loginAgain': 'Please login Again.',
    'invalidDetails': 'Invalid Details, Please try again.',
    'restartApp': 'Opps! Something went wrong. Please restart the app.',
    'invalidFilterTag': 'You cannot provide more than one filter tag.',
	  'noOpeningHours': 'No opening hours exist for this venue',
    'orderExpired': 'Sorry the order has expired, Please try again!',
    entityDoesNotExists(entity) {
      return `${entity} does not exists, please try again.`;
    },
    invalidEntityDetails(entity) {
      return `${entity} details invalid, please enter again.`;
    },
    allEntityFeildsRequired(entity) {
      return `Please fill all the required fields for ${entity.toLowerCase()}.`;
    },
    setEntityCharLimit(entityName, charLimit) {
        return `Character limit for ${entityName} can not exceed ${charLimit}.`;
    },
	missingParameter(param) {
		return `${param} is missing`;
	}
};
