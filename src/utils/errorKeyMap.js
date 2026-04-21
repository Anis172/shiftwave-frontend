// Map backend error messages to translation keys
export const errorKeyMap = {
    // Auth errors
    'Invalid email or password': 'invalidCredentials',
    'Email already exists': 'emailAlreadyExists',
    'Account is inactive. Please contact your manager.': 'accountInactive',
    'Your account is inactive. Please contact your manager.': 'accountInactive',

    // User errors
    'Worker not found': 'workerNotFound',
    'User not found': 'workerNotFound',
    'Role not found': 'roleNotFound',
    'Email is required': 'emailRequired',
    'Invalid email format': 'invalidEmailFormat',
    'Password is required': 'passwordRequired',
    'Password must be at least 8 characters': 'passwordTooShort',
    'Password must be at least 6 characters': 'passwordTooShort6',
    'Name is required': 'nameRequired',
    'Name must be at least 2 characters': 'nameTooShort',
    'You cannot delete your own account': 'cannotDeleteSelf',
    'You cannot deactivate your own account': 'cannotDeactivateSelf',

    // Shift errors
    'Cannot create shift for inactive worker. Please activate the worker first.': 'workerInactive',
    'Cannot create shift for inactive worker': 'workerInactive',
    'Cannot assign shift to inactive worker': 'workerInactive',
    'Worker does not belong to your restaurant': 'workerWrongRestaurant',
    'Shift not found': 'shiftNotFound',
    'End time must be after start time': 'endTimeBeforeStart',
    'Worker is required': 'workerRequired',
    'Role is required': 'roleRequired',
    'Scheduled start time is required': 'startTimeRequired',
    'Scheduled end time is required': 'endTimeRequired',

    // Coverage rules
    'Minimum workers is required': 'minimumWorkersMin',
    'Minimum workers must be at least 1': 'minimumWorkersMin',
    'Coverage rule not found': 'coverageRuleNotFound',

    // Break requests
    'Break type is required': 'breakTypeRequired',
    'Shift is required': 'shiftRequired',
    'You can only request breaks for your own shifts': 'onlyOwnShifts',
    'You can only request breaks during active shifts': 'onlyActiveShifts',
    'Insufficient coverage. Cannot approve break request.': 'insufficientCoverage',
    'Cannot delete active or completed breaks': 'cannotDeleteActiveBreak',
    'Break request not found': 'breakRequestNotFound',

    // Restaurant signup
    'Restaurant name is required': 'restaurantNameRequired',
    'Restaurant name must be between 2 and 100 characters': 'restaurantNameLength',
    'Address is required': 'addressRequired',
    'Address must be between 5 and 200 characters': 'addressLength',
    'Phone number is required': 'phoneRequired',
    'Invalid phone number format': 'invalidPhoneFormat',
    'Owner name is required': 'ownerNameRequired',

    // Generic
    'Network error. Please try again.': 'networkError',
    'Failed to create worker': 'failedCreateWorker',
    'Failed to update worker': 'failedUpdateWorker',
    'Failed to create shift': 'failedCreateShift',
    'Failed to update shift': 'failedUpdateShift',
};

export const getErrorKey = (errorMessage) => {
    return errorKeyMap[errorMessage] || null;
};