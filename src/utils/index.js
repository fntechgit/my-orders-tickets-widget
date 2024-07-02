import moment from "moment-timezone";

const THOUSAND = 1000;
const ONE = 1;
const FOUR = 4;
const SIX = 6;

export const PAGINATION_DISPLAY = 3;

export const formatCurrency = (value, { locale = "en-US", ...options }) => {
  const defaultOptions = {
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    ...defaultOptions,
    ...options,
  });

  return formatter.format(value);
};

export const getDaysBetweenDates = (startDate, endDate, timeZone) => {
  const startDay = moment(startDate * THOUSAND).tz(timeZone);
  const endDay = moment(endDate * THOUSAND).tz(timeZone);

  // Add day one
  const dates = [startDay.clone().unix()];

  // Add all additional days
  while (startDay.add(ONE, "days").diff(endDay) < 0) {
    dates.push(startDay.clone().unix());
  }

  return dates;
};

export const getFormattedDate = (datetime, timeZone) => {
  if (timeZone) return moment.tz(datetime * THOUSAND, timeZone).format("MMMM DD, YYYY");

  return moment.unix(datetime).format("MMMM DD, YYYY");
};

export const getFormattedTime = (datetime, timeZone = false) => {
  if (timeZone) {
    return moment.tz(datetime * THOUSAND, timeZone).format("HH:mm");
  }

  return moment.unix(datetime).format("HH:mm");
};

export const getSummitFormattedDate = (summit) => {
  if (!summit) return null;

  const dateRange = getDaysBetweenDates(
    summit.start_date,
    summit.end_date,
    summit.time_zone_id,
  );

  if (dateRange.length > ONE) {
    let startDate = getFormattedDate(dateRange[0], summit.time_zone_id);
    let endDate = getFormattedDate(
      dateRange[dateRange.length - ONE],
      summit.time_zone_id,
    );

    const startMonth = startDate.split(" ")[0];
    const endMonth = endDate.split(" ")[0];

    if (startMonth === endMonth) endDate = endDate.substr(endDate.indexOf(" ") + ONE);

    const startYear = startDate.substring(
      startDate.length,
      startDate.length - FOUR,
    );
    const endYear = endDate.substring(endDate.length, endDate.length - FOUR);

    if (startYear === endYear) startDate = startDate.substring(0, startDate.length - SIX);

    endDate = `${endDate.substring(0, endDate.length - SIX)
    }, ${
      endDate.substring(endDate.length - FOUR)}`;

    return `${startDate} - ${endDate}`;
  }

  return getFormattedDate(summit.start_date, summit.time_zone_id);
};

export const calculateOrderTotals = ({ order, summit, tickets }) => {
  if (!order || !summit || !tickets) return {};

  const {
    refunded_amount, discount_amount, taxes_amount, amount,
  } = order;
  const { ticket_types } = summit;

  const ticketSummary = [];
  let purchaseTicketTotal = 0;

  const currencyObject = { currency: order.currency };

  Object.keys(order.tickets_excerpt_by_ticket_type).map((ticket) => {
    const ticketType = ticket_types.find((tt) => tt.name === ticket);
    ticketSummary.push({
      ticket_type_id: ticketType.id,
      ticket_type: ticketType,
      name: ticket,
      qty: order.tickets_excerpt_by_ticket_type[ticket],
    });
    purchaseTicketTotal
      += ticketType.cost * order.tickets_excerpt_by_ticket_type[ticket];

    return ticketSummary;
  });

  const purchaseTotal = formatCurrency(purchaseTicketTotal, currencyObject);

  const discountTotal = formatCurrency(discount_amount, currencyObject);
  const refundTotal = formatCurrency(refunded_amount, currencyObject);
  const taxesTotal = formatCurrency(taxes_amount, currencyObject);
  const amountTotal = Object.prototype.hasOwnProperty.call(order, "amount")
    ? formatCurrency(amount, currencyObject)
    : formatCurrency(purchaseTotal, currencyObject);

  return {
    discountTotal, refundTotal, taxesTotal, amountTotal, ticketSummary,
  };
};

export const getOrderTickets = (memberOrders, orderId) => {
  const orders = memberOrders.filter((o) => o.id === orderId);
  return orders[0].memberTickets;
};
