const renderDay = document.querySelector(".day");
const renderHour = document.querySelector(".hour");
const renderMin = document.querySelector(".min");
const renderSec = document.querySelector(".sec");

const timeOnLive = new Date("August 10, 2021 12:00:00").getTime();
const countDown = () => {
  const currentTime = new Date().getTime();

  const diff = timeOnLive - currentTime;

  const sec = 1000;
  const min = sec * 60;
  const hour = min * 60;
  const day = hour * 24;

  const disDay = Math.floor(diff / day);
  const disHour = Math.floor((diff %  day) / hour);
  const disMin = Math.floor((diff % hour) / min);
  const disSec = Math.floor((diff % min) / sec);

  renderDay.innerText = disDay;
  renderHour.innerText = disHour;
  renderMin.innerText = disMin;
  renderSec.innerText = disSec;
};


setInterval(countDown, 1000);
