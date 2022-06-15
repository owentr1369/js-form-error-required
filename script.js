// Validator object
function Validator(options) {
  let formElement = document.querySelector(options.form);
  if (formElement) {
    options.rules.forEach((rule) => {
      let inputElement = formElement.querySelector(rule.selector);
      let errorElement =
        inputElement.parentElement.querySelector(".form-message");
      if (inputElement) {
        inputElement.onblur = () => {
          // Value: inputElement.value
          // test func: rule.test
          let errorMessage = rule.test(inputElement.value);
          if (errorMessage) {
            errorElement.innerText = errorMessage;
          }
        };
      }
    });
  }
}

// Define Rules
// Rule of rules
// When false => return error massage
// When success => no returning (undefined)
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Vui lòng nhập trường này";
    },
  };
};
Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function () {},
  };
};
