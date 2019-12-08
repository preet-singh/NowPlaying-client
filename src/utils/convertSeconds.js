function convertSeconds(seconds) {
  let secondsValue = seconds % 60;
  let hoursValue = seconds > 3600 ? (seconds - (seconds % 3600)) / 3600 : 0;
  let minutesValue = seconds < 3600 ? (seconds - secondsValue) / 60 : (seconds - secondsValue) % 3600 / 60
  let timeArray = [hoursValue, minutesValue, secondsValue]
  let timeStringArray = timeArray.map(time => convertTimeString(time))

  let timeString = timeStringArray.join(':')
  return timeString;
}

export default convertSeconds;

function convertTimeString(timeValue) {
  if(timeValue < 10) {
    return `0${timeValue}`;
  }
  else {
    return `${timeValue}`;
  }
}
