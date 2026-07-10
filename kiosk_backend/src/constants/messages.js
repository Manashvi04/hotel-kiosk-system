export const MESSAGES = {
  // Success Messages
  GUEST_CREATED: "Guest created successfully.",
  RESERVATION_CREATED: "Reservation created successfully.",
  PAYMENT_SUCCESS: "Payment completed successfully.",
  DIGITAL_KEY_CREATED: "Digital key generated successfully.",
  EXTENSION_CREATED: "Room extension approved successfully.",
  FEEDBACK_CREATED: "Feedback submitted successfully.",
  SERVICE_REQUEST_CREATED: "Service request created successfully.",
  VISITOR_CREATED: "Visitor added successfully.",
  VISITOR_CHECKOUT: "Visitor checked out successfully.",
  AVAILABLE_ROOMS_FETCHED: "Available rooms fetched successfully.",
  NO_ROOMS_AVAILABLE: "No rooms available.",
  CHECKOUT_SUCCESS: "Checkout completed successfully.",

  // Validation Messages
  REQUIRED_FIELDS: "All required fields must be provided.",
  INVALID_EMAIL: "Invalid email address.",
  INVALID_MOBILE: "Mobile number must contain exactly 10 digits.",
  INVALID_RATING: "Rating must be between 1 and 5.",
  INVALID_AMOUNT: "Amount must be greater than zero.",
  INVALID_GUESTS: "Total guests must be greater than zero.",
  INVALID_ROOMS: "Total rooms must be greater than zero.",
  INVALID_PAYMENT_METHOD: "Invalid payment method.",
  INVALID_SERVICE_TYPE: "Invalid service type.",

  // Not Found Messages
  GUEST_NOT_FOUND: "Guest not found.",
  RESERVATION_NOT_FOUND: "Reservation not found.",
  VISITOR_NOT_FOUND: "Visitor not found.",

  // Duplicate Messages
  GUEST_ALREADY_EXISTS:
    "Guest already exists with the provided email, mobile number, or document number.",
  BOOKING_ALREADY_EXISTS: "Booking ID already exists.",
  DIGITAL_KEY_ALREADY_EXISTS:
    "Digital key already exists for this reservation.",

  // Failure Messages
  GUEST_CREATE_FAILED: "Failed to create guest.",
  RESERVATION_CREATE_FAILED: "Failed to create reservation.",
  PAYMENT_FAILED: "Failed to process payment.",
  DIGITAL_KEY_FAILED: "Failed to generate digital key.",
  EXTENSION_FAILED: "Failed to extend reservation.",
  FEEDBACK_FAILED: "Failed to submit feedback.",
  SERVICE_REQUEST_FAILED: "Failed to create service request.",
  VISITOR_CREATE_FAILED: "Failed to add visitor.",
  VISITOR_CHECKOUT_FAILED: "Failed to checkout visitor.",
  ROOMS_FETCH_FAILED: "Failed to fetch available rooms.",
  CHECKOUT_FAILED: "Failed to complete checkout.",
};
