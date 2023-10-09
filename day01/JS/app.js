//& 1- check whether serviceWorker suppoted or not
// if("serviceWorker" in navigator){

// }
if(navigator.serviceWorker){
    navigator.serviceWorker.register("./sw.js")
    .then(res=>console.log("file regestered" + res))
    .catch(err=>console.log(err))
}


//& Notification Api
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  Notification.requestPermission().then((p) => {
    if (p === "granted") {
        console.log("created")
      const notification = new Notification("ex", {
        body: "welcome to our website",
        tag: "wlc msg",
      });
    }
  });
});


//? https://schema.org/Organization 