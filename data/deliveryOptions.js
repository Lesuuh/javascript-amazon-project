import dayjs from "https://cdn.skypack.dev/dayjs";

export const deliveryOptions = [
  {
    id: 1,
    deliveryDays: "7",
    priceCents: 0,
  },
  {
    id: 2,
    deliveryDays: "3",
    priceCents: 499,
  },
  {
    id: 3,
    deliveryDays: "1",
    priceCents: 999,
  },
];

export function calculateDeliveryDate(deliveryOption) {
  // Using the dayjs library
  const today = dayjs();
  // const deliveryDay = today.add(deliveryOption.deliveryDays, "day");
  const deliveryDays = deliveryOption.deliveryDays;
  // const dateString = deliveryDay.format("dddd, MMMM D");
  const dateString = addWorkingDays(deliveryDays)
  return dateString;
}

function addWorkingDays(numberOfDays) {
  let date = dayjs();
  // let addedDays = 0;
  // date = date.add(1, "days");

  while (numberOfDays > 0) {
    date = date.add(1, "days");
    const isWeekend = date.day() === 0 || date.day() === 6;
    if (!isWeekend) {
      numberOfDays--;
    }
  }
  console.log(date.format("dddd, MMMM D"));
  return date.format("dddd, MMMM D");
}
// addWorkingDays(3);
