const calcViews = (input) => {
  const ranges = [
    {
      divider: 1e3,
      suffix: "K",
    },
    {
      divider: 1e6,
      suffix: "M",
    },
    {
      divider: 1e9,
      suffix: "B",
    },
  ];

  for (let index = ranges.length - 1; index >= 0; index--) {
    if (input > ranges[index].divider) {
      let quotient = input / ranges[index].divider;

      if (quotient < 10) {
        quotient = Math.floor(quotient * 10) / 10;
      } else {
        quotient = Math.floor(quotient);
      }

      return quotient?.toString() + ranges[index].suffix;
    }
  }

  return input?.toString();
};
const calcTime = (text) => {
  const currentTime = new Date();

  const publishedTime = new Date(text);

  const timeDiff = Math.floor((currentTime - publishedTime) / 1000);

  const years = Math.floor(timeDiff / (365 * 24 * 60 * 60));
  const months = Math.floor(timeDiff / (30 * 24 * 60 * 60));
  const weeks = Math.floor(timeDiff / (7 * 24 * 60 * 60));
  const days = Math.floor(timeDiff / (24 * 60 * 60));
  const hours = Math.floor(timeDiff / (60 * 60));
  const minutes = Math.floor(timeDiff / 60);
  const seconds = timeDiff;

  let timeUnit = "";
  let timeValue = 0;

  if (years > 0) {
    timeUnit = "year";
    timeValue = years;
  } else if (months > 0) {
    timeUnit = "month";
    timeValue = months;
  } else if (weeks > 0) {
    timeUnit = "week";
    timeValue = weeks;
  } else if (days > 0) {
    timeUnit = "day";
    timeValue = days;
  } else if (hours > 0) {
    timeUnit = "hour";
    timeValue = hours;
  } else if (minutes > 0) {
    timeUnit = "minute";
    timeValue = minutes;
  } else {
    timeUnit = "second";
    timeValue = seconds;
  }
  return `${timeValue} ${timeUnit}${timeValue !== 1 ? "s" : ""} ago`;
};
const formatNumber = (x) => {
  return x > 1
    ? x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " comments"
    : x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " comment";
};

const convertDuration = (t) => {
  var x = t.split("T"),
    duration = "",
    time = {},
    period = {},
    s = "string",
    v = "variables",
    l = "letters",
    d = {
      period: {
        string: x[0].substring(1, x[0].length),
        len: 4,
        letters: ["Y", "M", "W", "D"],
        variables: {},
      },
      time: {
        string: x[1],
        len: 3,
        letters: ["H", "M", "S"],
        variables: {},
      },
    };
  if (!d.time.string) {
    d.time.string = "";
  }

  for (var i in d) {
    var len = d[i].len;
    for (var j = 0; j < len; j++) {
      d[i][s] = d[i][s].split(d[i][l][j]);
      if (d[i][s].length > 1) {
        d[i][v][d[i][l][j]] = parseInt(d[i][s][0], 10);
        d[i][s] = d[i][s][1];
      } else {
        d[i][v][d[i][l][j]] = 0;
        d[i][s] = d[i][s][0];
      }
    }
  }
  period = d.period.variables;
  time = d.time.variables;
  time.H +=
    24 * period.D +
    24 * 7 * period.W +
    24 * 7 * 4 * period.M +
    24 * 7 * 4 * 12 * period.Y;

  if (time.H) {
    duration = time.H + ":";
    if (time.M < 10) {
      time.M = "0" + time.M;
    }
  }

  if (time.S < 10) {
    time.S = "0" + time.S;
  }

  duration += time.M + ":" + time.S;
  return duration;
};

export { calcTime, calcViews, formatNumber, convertDuration };

/* 
const calcTime = (text) => {
  const date2 = new Date();
  const date1 = new Date(text);

  var DiffInTime = date2.getTime() - date1.getTime();
  var DiffInDays = DiffInTime / (1000 * 3600 * 24);

  var days = DiffInDays;
  if (days < 1) {
    var DiffInHours = Math.abs(DiffInTime) / 1000;
    const time1 =
      Math.round(DiffInHours / 60) > 60
        ? Math.round(DiffInHours / 60 / 60) > 1
          ? Math.round(DiffInHours / 60 / 60) + " hours ago"
          : Math.round(DiffInHours / 60 / 60) + " hour ago"
        : Math.round(DiffInHours / 60) + " minutes ago";
    return time1;
  }
  days = Math.round(DiffInDays);
  const time =
    days > 365
      ? Math.round(days / 365) + " year ago"
      : days > 30
      ? Math.round(days / 30) + " month ago"
      : Math.round(days > 7)
      ? Math.round(days / 7) + " week ago"
      : days > 1
      ? days + " days ago"
      : days + " day ago";
  return time;
}
   */

/* 
const calcViews = (a) => {
  const totalViews =
    a > 1000000
      ? parseFloat((a / 1000000).toFixed(1)) + "M"
      : a > 1000
      ? parseFloat((a / 1000).toFixed(1)) + "K"
      : a;
  return totalViews; 
}
  */
