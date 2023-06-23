const calcViews = (a) => {
  const totalViews =
    a > 1000000
      ? Math.round(a / 1000000) + "M"
      : a > 1000
      ? Math.round(a / 1000) + "K"
      : a;
  return totalViews;
};
const calcTime = (text) => {
  var date2 = new Date();
  var b = text?.slice(0, 10);
  var date1 = new Date(b);
  var DiffInTime = date2.getTime() - date1.getTime();
  var DiffInDays = DiffInTime / (1000 * 3600 * 24);
  const days = Math.round(DiffInDays);
  const time =
    days > 365
      ? Math.round(days / 365) + " year ago"
      : days > 30
      ? Math.round(days / 30) + " month ago"
      : Math.round(days > 7)
      ? days / 7 + " week ago"
      : days + " day ago";
  return time;
};
const formatNumber = (x) => {
  return x > 1
    ? x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " comments"
    : x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " comment";
};
export { calcTime, calcViews, formatNumber };
