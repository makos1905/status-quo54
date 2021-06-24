//маска для телефона
$('[type=tel]').mask('+7 (000) 000-00-00')

// Валидация форм
$('#formQuestion').validate({
  errorClass: "form__control",
  errorElement: "div",
  errorPlacement: function (error, element) {
    if (element.attr("type") == "checkbox") {
      return element.next('label').append(error);
    }

    error.insertAfter($(element));
  },
  rules: {
    // строчное правило
    questionUserName: {
      required: true,
      minlength: 2,
      maxlength: 15,
    },
    questionUserPhone: {
      required: true,
      minlength: 18,
    },
    // правило-объект (блок)
    questionUserEmail: {
      required: true,
      email: true
    },
    formQuestPolicy: {
      required: true
    }
  },
  //сообщения
  messages: {
    questionUserName: {
      required: "Заполните поле",
      minlength: "Имя не короче двух букв",
      maxlength: "Имя не длиннее 15 букв"
    },
    questionUserPhone: {
      required: "Заполните поле",
      minlength: "Введите 10 цифр",
    },
    questionUserEmail: {
      required: "Заполните поле",
      email: "Введите корректный email"
    },
    formQuestPolicy: "Пожалуйста, дайте согласие на обработку данных"
  },
  submitHandler: function (form) {
    $.ajax({
      type: "POST",
      url: "sendQuestion.php",
      data: $(form).serialize(),
      success: function (response) {
        // alert('Ваша заявка отправлена. Наши специалисты свяжутся с Вами в ближайшее время');
        $(form)[0].reset();
        // modal.addClass('modal--visible');
        // modalRequest.addClass('hidden');
        // modalSending.addClass('hidden');
        // controlSending.removeClass('hidden');
        // footerSending.addClass('hidden');
      },
      error: function (response) {
        console.error('Ошибка запроса ' + response);
      }
    });
  }
});

$('#modalCallback').validate({
  errorClass: "form__control",
  errorElement: "div",
  errorPlacement: function (error, element) {
    if (element.attr("type") == "checkbox") {
      return element.next('label').append(error);
    }

    error.insertAfter($(element));
  },
  rules: {
    // строчное правило
    callbackUserName: {
      required: true,
      minlength: 2,
      maxlength: 15,
    },
    callbackUserPhone: {
      required: true,
      minlength: 18,
    },
    // правило-объект (блок)
    formQuestPolicy: {
      required: true
    }
  },
  //сообщения
  messages: {
    callbackUserName: {
      required: "Заполните поле",
      minlength: "Имя не короче двух букв",
      maxlength: "Имя не длиннее 15 букв"
    },
    callbackUserPhone: {
      required: "Заполните поле",
      minlength: "Введите 10 цифр",
    },
    formQuestPolicy: "Пожалуйста, дайте согласие на обработку данных"
  },
  submitHandler: function (form) {
    $.ajax({
      type: "POST",
      url: "sendCallback.php",
      data: $(form).serialize(),
      success: function (response) {
        // alert('Ваша заявка отправлена. Наши специалисты свяжутся с Вами в ближайшее время');
        $(form)[0].reset();
        // modal.addClass('modal--visible');
        // modalRequest.addClass('hidden');
        // modalSending.addClass('hidden');
        // controlSending.removeClass('hidden');
        // footerSending.addClass('hidden');
      },
      error: function (response) {
        console.error('Ошибка запроса ' + response);
      }
    });
  }
});