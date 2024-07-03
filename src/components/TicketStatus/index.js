import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Container, Button } from "@mui/material";
import * as styles from "./styles.module.scss";

function TicketStatus({ ticket }) {
  const { t } = useTranslation();
  const refund_requests = ticket.refund_requests.find(
    (r) => r.status === "Requested"
  );
  const ticket_status_incomplete =
    ticket.owner?.status === "Incomplete" && ticket.owner;
  const ticket_owner = ticket.owner;
  const ticket_complete = ticket.owner?.status === "Complete";

  return (
    <Container className={styles.ticketStatusContainer}>
      {refund_requests && (
        <Button className={styles.buttonRefundRequested}>
          {t("ticket_status.status_refund_requested")}
        </Button>
      )}
      {ticket_status_incomplete && (
        <Button className={styles.buttonIncomplete}>
          {t("ticket_status.status_incomplete")}
        </Button>
      )}
      {!ticket_owner && (
        <Button className={styles.buttonUnassigned}>
          {t("ticket_status.status_unassigned")}
        </Button>
      )}
      {ticket_complete && (
        <Button className={styles.buttonComplete}>
          {t("ticket_status.status_complete")}
        </Button>
      )}
    </Container>
  );
}

TicketStatus.propTypes = {
  ticket: PropTypes.shape({
    owner: PropTypes.shape({
      status: PropTypes.string
    }),
    refund_requests: PropTypes.arrayOf(Object)
  })
};

export default TicketStatus;
