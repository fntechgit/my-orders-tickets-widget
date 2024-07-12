import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Container, Button } from "@mui/material";
import * as styles from "./styles.module.scss";

function TicketStatus({ ticket }) {
  const { t } = useTranslation();
  const isActive = ticket.is_active;
  const refund_requests = ticket.refund_requests.find(
    (r) => r.status === "Requested"
  );
  const ticket_status_incomplete = ticket.owner?.status === "Incomplete";
  const ticket_unassigned = ticket.owner_id === 0;
  const ticket_complete = ticket.owner && ticket.owner?.status === "Complete";

  return (
    <Container className={styles.ticketStatusContainer}>
      {isActive ? (
        <>
          {refund_requests && (
            <Button
              className={`${styles.buttonPill} ${styles.buttonRefundRequested}`}
            >
              {t("ticket_status.status_refund_requested")}
            </Button>
          )}
          {ticket_status_incomplete && (
            <Button
              className={`${styles.buttonPill} ${styles.buttonIncomplete}`}
            >
              {t("ticket_status.status_incomplete")}
            </Button>
          )}
          {ticket_unassigned && (
            <Button
              className={`${styles.buttonPill} ${styles.buttonUnassigned}`}
            >
              {t("ticket_status.status_unassigned")}
            </Button>
          )}
          {ticket_complete && (
            <Button className={`${styles.buttonPill} ${styles.buttonComplete}`}>
              {t("ticket_status.status_complete")}
            </Button>
          )}
        </>
      ) : (
        <Button className={`${styles.buttonPill} ${styles.buttonCancelled}`}>
          {t("ticket_status.status_cancelled")}
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
