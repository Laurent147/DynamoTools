const convertDuration = (startTimeMs) => {
  let hours, mins, secs;
  let d_ms = new Date().getTime() - startTimeMs;

  if (d_ms / (60 * 60 * 1000) > 0) {
    hours = Math.floor(d_ms / (60 * 60 * 1000));
    d_ms = d_ms - hours * 60 * 60 * 1000;
  }

  if (d_ms / (60 * 1000) > 0) {
    mins = Math.floor(d_ms / (60 * 1000));
    d_ms = d_ms - mins * 60 * 1000;
  }

  if (d_ms / (1000) > 0) {
    secs = Math.floor(d_ms / 1000);
    d_ms = d_ms - secs * 1000;
  }

  return `${hours? hours + 'h ' : ''}${mins? mins + 'min ' : ''}${secs? secs + 's ' : ''}${d_ms + 'ms'}`;
  
};

module.exports = {
  convertDuration
}