/// <reference path="../../app.js" />

app.controller(
  "createController",
  function (formService, articleService, authService, $cookies, $location) {
    this.form = {
      title: "",
      text: "",
      errors: [],
    };
    const token = "Bearer " + $cookies.get("token");
    authService
      .isAuthorized(token)
      .then((authorised) => {
        this.create = function () {
          this.form.errors = [];

          if (formService.inputsIsEmpty(this.form)) {
            toastr.error("You must be fill all inputs");
            return;
          }

          articleService
            .createArticle(this.form.title, this.form.text, token)
            .catch((err) => {
              if (err.status === 401) {
                toastr.error("You must be logged in");
              }
            });
        };
      })
      .catch((notauthorised) => {
        $location.url("/auth/login");
      });
  }
);
