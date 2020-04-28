(function ($) {
  let script = document.createElement("script");
  script.src =
    "https://www.google.com/recaptcha/api.js?render=6Lf9au4UAAAAAP-tEFPLIhYtkYwndSh3hXtCjJej";
  script.onload = function () {
    grecaptcha.ready(function () {
      grecaptcha
        .execute("6Lf9au4UAAAAAP-tEFPLIhYtkYwndSh3hXtCjJej", {
          action: "homepage",
        })
        .then((token) => {
          console.log("Token", token);
        });
    });
  };
  document.head.appendChild(script);
})(jQuery);
