
  const validateFields = (form, fieldsArray)=>{
    fieldsArray.forEach(elem =>{
  
      elem.removeClass('error');
      if(elem.val().trim() == ""){
        elem.addClass('error');
      }
    })
  
    const withError = form.find('.error');
  
    return withError.length == 0;
  }
  
  $('.form').on('submit', e =>{
    e.preventDefault();
  
    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");
    const modal = $('#modal');
    const modalText = modal.find('.modal__text');
  
    modalText.removeClass('error');
  
    const isValid = validateFields(form, [name, phone, comment, to]);
  
      if(isValid) {
      const request = $.ajax({
        url: "https://webdev-api.loftschool.com/sendmail",
        method: "post",
        data: {
          name: name.val(),
          phone: phone.val(),
          comment: comment.val(),
          to: to.val(),
        }
      })
      
      request.done(data =>{
        modalText.text(data.message);
      })
  
      request.fail(
        data =>{
          const errorText = data.responseJSON.message;
          modalText.text(errorText);
          modalText.addClass('error');
        })
  
        request.always(
          $.fancybox.open({
            src: "#modal",
            type: "inline",
            smallBtn: false
          })
        )
    }
  })
  
  $(".app-modal-close").on('click', e =>{
    e.preventDefault();
    $.fancybox.close();
  })


