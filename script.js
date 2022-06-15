// Validator object
function Validator(options) {
  function validate(inputElement, rule) {
    let errorElement =
      inputElement.parentElement.querySelector(".form-message");
    // Value: inputElement.value
    // test func: rule.test
    let errorMessage = rule.test(inputElement.value);
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }

  //   Get form element which need to be validated
  let formElement = document.querySelector(options.form);
  if (formElement) {
    options.rules.forEach((rule) => {
      let inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        inputElement.onblur = () => {
          validate(inputElement, rule);
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
