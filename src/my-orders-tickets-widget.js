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
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useTranslation } from "react-i18next";
import { useInitStore } from "./store";
import MyOrdersTickets from "./components/MyOrdersTickets";
import { RESET_STATE, setSummit, setUser } from "./actions";

function MyOrdersMyTicketsWidget(props) {
  const {
    loginUrl, supportEmail, getUserProfile, summit, apiBaseUrl, user,
  } = props;
  const { t } = useTranslation();

  const { store, persistor } = useInitStore({
    loginUrl,
    supportEmail,
    getUserProfile,
    summit,
    user,
    apiBaseUrl,
  });

  const handleBeforeLift = () => {
    const params = new URLSearchParams(window.location.search);
    const flush = params.has("flushState");
    if (flush) store.dispatch({ type: RESET_STATE, payload: null });
  };

  useEffect(() => {
    store.dispatch(setSummit(summit));
  }, [summit]);

  useEffect(() => {
    store.dispatch(setUser(user));
  }, [user]);

  return (
    <Provider store={store}>
      <PersistGate
        onBeforeLift={handleBeforeLift}
        loading={null}
        persistor={persistor}
      >
        <h3 className="widget-title">{t("orders.title")}</h3>
        <MyOrdersTickets
          loginUrl={loginUrl}
          supportEmail={supportEmail}
          getUserProfile={getUserProfile}
          summit={summit}
          apiBaseUrl={apiBaseUrl}
          user={user}
        />
      </PersistGate>
    </Provider>
  );
}

MyOrdersMyTicketsWidget.propTypes = {
  loginUrl: PropTypes.string,
  supportEmail: PropTypes.string,
  getUserProfile: PropTypes.func,
  summit: PropTypes.object,
  apiBaseUrl: PropTypes.string,
  user: PropTypes.object,
};

export default MyOrdersMyTicketsWidget;
