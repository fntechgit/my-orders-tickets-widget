/**
 * Copyright 2024 OpenStack Foundation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * */
import { LOGOUT_USER } from "openstack-uicore-foundation/lib/security/actions";
import {
  RESET_STATE,
  SET_SUMMIT,
  SET_USER,
  GET_USER_ORDERS,
  GET_TICKETS,
  GET_TICKETS_BY_ORDER,
  GET_NEXT_TICKETS_BY_ORDER
} from "./actions";

const DEFAULT_ENTITY = {
  first_name: "",
  last_name: "",
  email: "",
  company: {
    name: "",
    id: null
  },
  billing_country: "",
  billing_address: "",
  billing_address_two: "",
  billing_city: "",
  billing_state: "",
  billing_zipcode: "",
  currentStep: null,
  tickets: [],
  reservation: {},
  checkout: {}
};

const DEFAULT_STATE = {
  settings: {},
  summit: null,
  user: {},
  widgetLoading: false,
  purchaseOrder: DEFAULT_ENTITY,
  memberOrders: [],
  memberTickets: [],
  selectedTicket: null,
  errors: {},
  stripeForm: false,
  loaded: false,
  loading: false,
  activeOrderId: null,
  isOrderLoading: false,
  current_page: 1,
  last_page: 1,
  per_page: 6,
  total: 0
};

const WidgetReducer = (state = DEFAULT_STATE, { type, payload } = {}) => {
  switch (type) {
    case LOGOUT_USER:
      return DEFAULT_STATE;
    case RESET_STATE:
      return { ...state, ...DEFAULT_STATE };
    case SET_SUMMIT:
      return { ...state, summit: payload };
    case SET_USER:
      return { ...state, user: payload };
    case GET_USER_ORDERS:
      return { ...state, memberOrders: payload.response.data };
    case GET_TICKETS_BY_ORDER: {
      let { memberOrders } = state;
      const { data, total, page, per_page, last_page } = payload.response;
      const orderToUpdate = memberOrders.filter(
        (o) => o.id === data[0].order_id
      );
      orderToUpdate[0].memberTickets = data;
      memberOrders = memberOrders.map((mo) =>
        mo.id === orderToUpdate.id ? orderToUpdate : mo
      );
      return {
        ...state,
        total,
        page,
        per_page,
        last_page,
        memberOrders
      };
    }
    case GET_NEXT_TICKETS_BY_ORDER: {
      let { memberOrders } = state;
      const { data } = payload.response;
      const orderToUpdate = memberOrders.filter(
        (o) => o.id === data[0].order_id
      );
      orderToUpdate[0].memberTickets = [
        ...orderToUpdate[0].memberTickets,
        ...data
      ];
      memberOrders = memberOrders.map((mo) =>
        mo.id === orderToUpdate.id ? orderToUpdate : mo
      );
      return { ...state, memberOrders };
    }
    case GET_TICKETS: {
      const { data, current_page, total, last_page } = payload.response;
      const lastEditedTicket = state.selectedTicket;
      let newData = data;
      if (lastEditedTicket) {
        const ticketToUpdate = data.find((t) => t.id === lastEditedTicket.id);
        newData = [
          ...data.filter((t) => t.id !== lastEditedTicket.id),
          { ...ticketToUpdate, ...lastEditedTicket }
        ];
      }
      return {
        ...state,
        memberTickets: newData,
        current_page,
        total,
        last_page,
        selectedTicket: null
      };
    }

    default:
      return state;
  }
};

export default WidgetReducer;
