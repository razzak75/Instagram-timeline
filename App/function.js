const showAlert = (msg, type = "danger") => {
  return `<p class="alert alert-${type} d-flex justify-content-between">
      ${msg}
      <button class="btn btn-close" data-bs-dismiss="alert"></button>
    </p>`;
};

const setLsData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getLsData = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return [];
};

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const secondsAgo = Math.floor((now - date) / 1000);

  if (secondsAgo < 10) {
    return "Just now";
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} ${minutesAgo !== 1 ? "minutes" : "minute"} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} ${hoursAgo !== 1 ? "hours" : "hour"} ago`;
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} ${daysAgo !== 1 ? "days" : "day"} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} ${monthsAgo !== 1 ? "months" : "month"} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} ${yearsAgo !== 1 ? "years" : "year"} ago`;
  }
}
