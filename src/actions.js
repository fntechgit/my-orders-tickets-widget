import { getAccessToken } from "openstack-uicore-foundation/lib/security/methods";
import {
  authErrorHandler,
  getRequest,
  deleteRequest,
  createAction,
  stopLoading,
  startLoading,
  putRequest,
} from "openstack-uicore-foundation/lib/utils/actions";
import history from "./history";

export const RESET_STATE = "RESET_STATE";

// ORDERS CONSTS
export const GET_USER_ORDERS = "GET_ORDERS";
export const REFUND_ORDER = "REFUND_ORDER";
export const SET_ACTIVE_ORDER_ID = "SET_ACTIVE_ORDER_ID";

// TICKETS CONSTS
export const GET_TICKETS = "GET_TICKETS";
export const ASSIGN_TICKET = "ASSIGN_TICKET";
export const REMOVE_TICKET_ATTENDEE = "REMOVE_TICKET_ATTENDEE";
export const REFUND_TICKET = "REFUND_TICKET";
export const RESEND_NOTIFICATION = "RESEND_NOTIFICATION";
export const GET_TICKETS_BY_ORDER = "GET_TICKETS_BY_ORDER";
export const GET_NEXT_TICKETS_BY_ORDER = "GET_NEXT_TICKETS_BY_ORDER";
export const GET_TICKETS_BY_ORDER_ERROR = "GET_TICKETS_BY_ORDER_ERROR";
export const GET_ORDER_TICKET_DETAILS = "GET_ORDER_TICKET_DETAILS";
export const GET_TICKET_DETAILS = "GET_TICKET_DETAILS";
export const TICKET_ATTENDEE_KEYS = {
  email: "attendee_email",
  firstName: "attendee_first_name",
  lastName: "attendee_last_name",
  company: "attendee_company",
  disclaimerAccepted: "disclaimer_accepted",
  extraQuestions: "extra_questions",
};

// USER CONTS
export const START_LOADING_IDP_PROFILE = "START_LOADING_IDP_PROFILE";
export const STOP_LOADING_IDP_PROFILE = "STOP_LOADING_IDP_PROFILE";
export const UPDATE_IDP_PROFILE = "UPDATE_IDP_PROFILE";
export const SET_USER = "SET_USER";

// SUMMIT CONSTS
export const SET_SUMMIT = "SET_SUMMIT";
export const GET_MAIN_EXTRA_QUESTIONS = "GET_MAIN_EXTRA_QUESTIONS";
export const RECEIVE_MARKETING_SETTINGS = "RECEIVE_MARKETING_SETTINGS";
export const CLEAR_MARKETING_SETTINGS = "CLEAR_MARKETING_SETTINGS";

export const resetState = () => (dispatch) => {
  dispatch(createAction(RESET_STATE)({}));
};

// NUMBER CONSTS
export const ONE = 1;
export const FIVE = 5;

// ORDERS ACTIONS
export const getUserOrders = ({
  page = ONE,
  perPage = FIVE,
}) => async (dispatch, getState, { apiBaseUrl, loginUrl }) => {
  const { widgetState: { summit } } = getState();
  const accessToken = await getAccessToken().catch(() => history.replace(loginUrl));
  if (!accessToken) return Promise.reject();
  dispatch(startLoading());
  const params = {
    access_token: accessToken,
    order: "-id",
    filter: "status==Paid",
    relations: "none",
    page,
    per_page: perPage,
  };
  return getRequest(
    null,
    createAction(GET_USER_ORDERS),
    `${apiBaseUrl}/api/v1/summits/${summit.id}/orders/me`,
    authErrorHandler,
  )(params)(dispatch)
    .then((payload) => {
      dispatch(stopLoading());
      return payload;
    })
    .catch((e) => {
      dispatch(stopLoading());
      return e;
    });
};

export const setActiveOrderId = (
  orderId,
) => async (
  dispatch,
) => dispatch(
  createAction(SET_ACTIVE_ORDER_ID)(orderId),
);

// USER ACTIONS
export const setUser = (user) => (dispatch) => dispatch(createAction(SET_USER)(user));

export const updateProfile = (profile) => async (dispatch, { idpBaseUrl, loginUrl }) => {
  const accessToken = await getAccessToken().catch(() => history.replace(loginUrl));

  if (!accessToken) return null;

  dispatch(startLoading());

  const params = {
    access_token: accessToken,
  };

  dispatch(createAction(START_LOADING_IDP_PROFILE)());

  return putRequest(
    null,
    createAction(UPDATE_IDP_PROFILE),
    // TODO: need IDP_BASE_URL
    `${idpBaseUrl}/api/v1/users/me`,
    profile,
    authErrorHandler,
  )(params)(dispatch)
    .then((payload) => payload)
    .catch(() => dispatch(createAction(STOP_LOADING_IDP_PROFILE)()));
};

// TICKET ACTIONS

// const normalizeTicket = (entity) => {
//   const normalizedEntity = { ...entity };

//   if (!entity.attendee_company.id) {
//     normalizedEntity.attendee_company = entity.attendee_company.name;
//   } else {
//     delete normalizedEntity.attendee_company;
//     normalizedEntity.attendee_company_id = entity.attendee_company.id;
//   }

//   return normalizedEntity;
// };

export const getUserTickets = ({
  page = ONE,
  perPage = FIVE,
}) => async (
  dispatch,
  getState,
  {
    apiBaseUrl,
    loginUrl,
  },
) => {
  const {
    userState: { userProfile },
    summit,
  } = getState();
  if (!summit) return Promise.reject();
  const accessToken = await getAccessToken().catch(() => history.replace(loginUrl));
  if (!accessToken) return Promise.reject();
  if (!userProfile.id) return Promise.reject();
  dispatch(startLoading());
  const params = {
    access_token: accessToken,
    filter: "status==Paid",
    expand: "order, owner, ticket_type",
    order: "-id",
    fields:
        "order.id,order.owner_first_name,order.owner_last_name,order.owner_email,owner.first_name,owner.last_name,owner.status",
    relations: "none",
    page,
    per_page: perPage,
  };
  return getRequest(
    null,
    createAction(GET_TICKETS),
    `${apiBaseUrl}/api/v1/summits/${summit.id}/orders/all/tickets/me`,
    authErrorHandler,
  )(params)(dispatch)
    .then(() => {
      dispatch(stopLoading());
    })
    .catch((e) => {
      dispatch(stopLoading());
      return e;
    });
};

export const getTicketsByOrder = ({
  orderId,
  page = ONE,
  perPage = FIVE,
  next = false,
}) => async (
  dispatch,
  getState,
  {
    apiBaseUrl,
    loginUrl,
  },
) => {
  dispatch(startLoading());
  const accessToken = await getAccessToken().catch(() => history.replace(loginUrl));
  if (!accessToken) return null;
  const params = {
    access_token: accessToken,
    expand:
        "refund_requests,owner,owner.extra_questions,badge,badge.features,ticket_type",
    order: "+id",
    page,
    per_page: perPage,
  };
  return getRequest(
    null,
    next ? createAction(GET_NEXT_TICKETS_BY_ORDER) : createAction(GET_TICKETS_BY_ORDER),
    `${apiBaseUrl}/api/v1/summits/all/orders/${orderId}/tickets`,
    authErrorHandler,
  )(params)(dispatch)
    .then((payload) => {
      dispatch(stopLoading());
      return payload;
    })
    .catch((e) => {
      dispatch(stopLoading());
      dispatch(createAction(GET_TICKETS_BY_ORDER_ERROR));
      return e;
    });
};

export const resendNotification = (
  ticket,
) => async (
  dispatch,
  {
    apiBaseUrl,
    loginUrl,
  },
) => {
  const accessToken = await getAccessToken().catch(() => history.replace(loginUrl));

  if (!accessToken) return null;

  const { message } = ticket;

  dispatch(startLoading());

  const orderId = ticket.order ? ticket.order.id : ticket.order_id;

  const params = {
    access_token: accessToken,
  };

  return putRequest(
    null,
    createAction(RESEND_NOTIFICATION),
    `${apiBaseUrl}/api/v1/summits/all/orders/${orderId}/tickets/${ticket.id}/attendee/reinvite`,
    { message },
    authErrorHandler,
  )(params)(dispatch)
    .then(() => {
      dispatch(stopLoading());
    })
    .catch((e) => {
      dispatch(stopLoading());
      return e;
    });
};

export const refundTicket = ({
  ticket,
}) => async (
  dispatch,
  getState,
  {
    apiBaseUrl,
    loginUrl,
  },
) => {
  const accessToken = await getAccessToken().catch(() => history.replace(loginUrl));

  if (!accessToken) return null;

  dispatch(startLoading());

  const {
    orderState: { current_page: orderPage },
    ticketState: { current_page: ticketPage },
  } = getState();

  const orderId = ticket.order ? ticket.order.id : ticket.order_id;

  const params = {
    access_token: accessToken,
  };

  return deleteRequest(
    null,
    createAction(REFUND_TICKET),
    `${apiBaseUrl}/api/v1/summits/all/orders/${orderId}/tickets/${ticket.id}/refund`,
    {},
    authErrorHandler,
  )(params)(dispatch)
    .then((payload) => {
      dispatch(stopLoading());

      if (ticket.order_id) {
        dispatch(getUserOrders({ page: orderPage }));
      } else {
        dispatch(getUserTickets({ page: ticketPage }));
      }
      return payload;
    })
    .catch((e) => {
      dispatch(stopLoading());
      throw e;
    });
};

// SUMMIT ACTIONS
export const setSummit = (summit) => async (dispatch) => dispatch(createAction(SET_SUMMIT)(summit));
