function toast({ title = "", message = "", type = "", duration = 0 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");
    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 3000);
    // Remove toast when click close icon
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };
    const icons = {
      success: "fa-solid fa-circle-check",
      info: "fa-solid fa-circle-info",
      warning: "fa-solid fa-triangle-exclamation",
      error: "fa-solid fa-circle-exclamation",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);
    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 0.8s ${delay}s forward`;
    toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__message"> ${message} </p>
            </div>
            <div class="toast__close">
                <i class="fa-regular fa-circle-xmark"></i>
            </div>
        `;
    main.appendChild(toast);
  }
}

// toast({
//     title: 'Error',
//     message: 'Any one with access cam view your invited visions',
//     type: 'error',
//     duration: 3000
// });

function showSuccessToast() {
  toast({
    title: "Success!",
    message: "Action pass!",
    type: "success",
    duration: 3000,
  });
}
function showErrorToast() {
  toast({
    title: "Error!",
    message: "Some thing wrong!",
    type: "error",
    duration: 3000,
  });
}
