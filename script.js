const module = document.querySelector(".module");
const wifi = document.querySelector(".icon i");
const title = document.querySelector(".module .title");
const description = document.querySelector(".desc");
const reconnetBtn = document.querySelector(".reconnet");
let isOnline = true,
  intervalId,
  timer = 10;
const checkConnection = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    isOnline = response.status >= 200 && response.status < 300;
  } catch (error) {
    isOnline = false;
  }
  timer = 10;
  clearInterval(intervalId);
  handleModule(isOnline);
};
const handleModule = (status) => {
  if (status) {
    wifi.className = "uil uil-wifi";
    title.innerText = "Connection Restored";
    description.innerHTML =
      "Your device is connected successfully to the internet ";
    module.classList.add("online");
    return setTimeout(() => module.classList.remove("show"), 2000);
  }
  wifi.className = "uil uil-wifi-slash";
  title.innerText = "Lost connection";
  description.innerHTML =
    "Your network is unavailable.We will attempt to reconnet you in <b>10</b> seconds. ";
  module.className = "module show";
  intervalId = setInterval(() => {
    timer--;
    if (timer === 0) checkConnection();
    module.querySelector(".desc b").innerHTML = timer;
  }, 1000);
};

setInterval(() => isOnline && checkConnection(), 3000);
reconnetBtn.addEventListener("click", checkConnection);
