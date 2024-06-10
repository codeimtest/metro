$('.form_toggle_widget div').click(function() {
	// Сначала мы удаляем класс active у всех div внутри form_toggle_widget
	$('.form_toggle_widget div').removeClass('active');
	
	// Затем мы добавляем класс active к текущему div
	$(this).addClass('active');
	
	// Мы скрываем все формы внутри form_toggle_items
	$('.form_toggle_items form').hide();
	
	// Находим соответствующую форму внутри form_toggle_items и показываем ее
	var index = $(this).index();
	$('.form_toggle_items form').eq(index).show();
});

$('.application_filter div').click(function() {
	$('.application_filter div').removeClass('active');
	$(this).addClass('active');
});
$('.choice_button').click(function() {
	$('.choice_button').removeClass('active');
	$(this).addClass('active');
	var choice_value = $(this).find('input').val();
	
	$('input[name="company_type"]').val(choice_value);

});
$(document).ready(function() {
	var companyTypeInput = $('input[name="company_type"]').val();

	// Показываем блоки без атрибута data-company-type
	$('.input-choice:not([data-company-type])').show();

	$('.input-choice').each(function() {
			var company_type_input = $(this).data('company-type');
			if (typeof company_type_input !== 'undefined') {
					if (companyTypeInput === company_type_input) {
							$(this).show(); // Отображаем .input_file_widget, если значение совпадает
					} else {
							$(this).attr('style','display:none !important'); // Скрываем .input_file_widget, если значение не совпадает
					}
			}
	});

	$('.choice_button input').on('change', function() {
			checkAndUpdate($(this).closest('.choice_button'));
	});
});

function checkAndUpdate($button) {
	var $input = $button.find('input');
	var totalChoice = $input.val();

	$('.input-choice').each(function() {
			var company_type_input = $(this).data('company-type');

			if (typeof company_type_input !== 'undefined') {
					if (totalChoice !== company_type_input) {
							$(this).attr('style','display:none !important');// Скрываем .input_file_widget, если значение не совпадает
							$(this).find('input').prop('disabled', true);
							$(this).find('input').val('');
							$(this).removeClass('active');
							$(this).find('label.file_label').text('Загрузить');
							$(this).find('.remove_file').remove();
					} else {
							$(this).show(); // Показываем .input_file_widget, если значение совпадает
							$(this).find('input').prop('disabled', false);
							$(this).find('input').val('');
					}
			} else {
					// Показываем .input_file_widget, если нет атрибута data-company-type
					$(this).show();
					$(this).find('input').prop('disabled', false);
					$(this).find('input').val('');
			}
	});
}





$('.application_filter > div').click(function(){
	$('.application_filter > div').removeClass('active');
	$(this).addClass('active');
	var docsItem = $(this).data('docs-item');
	var docsTab = $('.documents_widget');
	docsTab.hide();
	docsTab.filter('[data-docs="' + docsItem + '"]').fadeIn(100); 

	var productTarget = $(this).data('product-target');
	var productTab = $('.product_tabs > div');
	productTab.hide();
	productTab.filter('[data-tab="' + productTarget + '"]').fadeIn(100); 
});

// Fieldset hide\show
$('.next_form').click(function() {
	var currentFieldset = $(this).closest('fieldset');
	var nextFieldset = currentFieldset.next('fieldset');
  var $allDivs = $('.verification_steps_item');
    var $currentDiv = $('.verification_steps_item.active');
    var $nextDiv = $currentDiv.next('div');

    // Удаляем класс active у всех div внутри form_toggle_widget
    $allDivs.removeClass('active');
		// Если следующий div существует, добавляем класс active к нему
    if ($nextDiv.length) {
			$nextDiv.addClass('active');
	} else {
			// Если следующий div не существует, добавляем класс active к первому div
			$allDivs.first().addClass('active');
	}
	// Скрываем текущий fieldset плавно
 	currentFieldset.fadeOut('100', function() {
     nextFieldset.fadeIn('100');
  });
});
$('.verification_steps > div').click(function(){
	$('.verification_steps > div').removeClass('active');
	$(this).addClass('active');
	var step = $(this).data('step');
	var stepField = $('fieldset');

	stepField.each(function() {
			var fieldStep = $(this).data('field');
			if (fieldStep === step) {
					$(this).fadeIn(100);
			} else {
					$(this).hide();
			}
	});
});

// File widget

	$('.input_file_widget input[type="file"]').change(function() {
			var filename = $(this).val().split('\\').pop();
			$(this).closest('.input_file_widget').addClass('active');
			$(this).siblings('.input_file_widget_item').find('label').text(filename);
			$(this).siblings('.input_file_widget_item').find('label').append('<div class="remove_file"><img src="images/icons/remove.svg"></div>');
			$(this).prop('disabled', true);
			$(this).parent().addClass('active')
	});
	$(document).on('click', '.remove_file', function() {
			var $inputFileWidget = $(this).closest('.input_file_widget');
			$inputFileWidget.find('input[type="file"]').val('');
			$inputFileWidget.removeClass('active');
			$inputFileWidget.find('.input_file_widget_item label').text('Загрузить');
			setTimeout(function() {
				$inputFileWidget.find('input[type="file"]').prop('disabled', false);
		}, 1000);
			$(this).remove();
	});

$('.input_file_widget:last').addClass('last')

//mask
$(".phone").mask("+7(999) 999-9999");

$('.close').click(function() {
	$('.popup').removeClass('active')
});
$('.send').click(function(e) {
	$('.for-contact').addClass('active')
	e.preventDefault();
});
$('.to-application').click(function(e) {
	$('.for-profile').addClass('active')
	e.preventDefault();
});
$('.to-application-send').click(function(e) {
	$('.popup').removeClass('active')
	$('.for-application').addClass('active')
	e.preventDefault();
});
$('.to-application-check').click(function(e) {
	$('.popup').removeClass('active')
	$('.for-check').addClass('active')
	e.preventDefault();
});
$('.docs_link').click(function(e){
	$('.for-docs').addClass('active')
	e.preventDefault();
})

// Menu


$(document).mouseup(function (e) {
var container = $(".menu_toggle_dropdown");
var toggle = $('.menu_toggle.active');

// Если цель клика не является контейнером и не является дочерним элементом контейнера
if (!container.is(e.target) && container.has(e.target).length === 0) {
 			container.removeClass('active');
 			toggle.removeClass('active');
 	} else { 
 			container.toggleClass('active');
 			toggle.toggleClass('active');
 	}
 });
$('.toggle_button_widget').click(function() {
	var container = $(this).children().next();
	var toggle = $(this);
	
	container.toggleClass('active');
	toggle.toggleClass('active');
	
});


//other form items

$('.minus').click(function() {
	var input = $(this).siblings('input[type="number"]');
	var value = parseFloat(input.val());
	var min = parseFloat(input.attr('min'));
	var step = parseFloat(input.attr('step'));
	if (value > min) {
			input.val((value - step).toFixed(2)); // Округляем до двух знаков после запятой
	}
});

$('.plus').click(function() {
	var input = $(this).siblings('input[type="number"]');
	var value = parseFloat(input.val());
	var max = parseFloat(input.attr('max'));
	var step = parseFloat(input.attr('step'));
	if (value + step <= max) {
			input.val((value + step).toFixed(2)); // Округляем до двух знаков после запятой
	}
});

$('input[type="number"]').on('input', function() {
	var input = $(this);
	var value = parseFloat(input.val());
	var max = parseFloat(input.attr('max'));
	if (value > max) {
			input.val(max.toFixed(2)); // Округляем до двух знаков после запятой
	}
});


	// FAQ
$('.faq_widget_item').each(function() {
  $(this).find('div:last').hide();
});

$(document).ready(function() {
  $(".faq_widget_item").each(function(index) {
    var $this = $(this);
    var $activeBlock = $this.find("div:last");

    if (index === 0) { // РџРµСЂРІС‹Р№ СЌР»РµРјРµРЅС‚
      $this.find("div:last").show();
    } else {
      $activeBlock.hide();
    }
  });
});

$(".faq_widget_item").click(function() {
  var $this = $(this);
  var $activeBlock = $this.find("div:last");
console.log('123')
  $this.siblings(".faq_widget_item").find("div:last").slideUp(function() {
    $(this).prev().removeClass("active");
  });
  $activeBlock.slideDown();	$('.faq_widget_item').removeClass('active')
  $this.addClass('active');
});


$('#delivery_type').change(function() {
	var selectedValue = $(this).val();
	var $secondSelect = $(this).closest('.select-group').find('#delivery_type_list');

	// Очищаем второй селект от старых опций
	$secondSelect.empty();

	// В зависимости от выбранного значения первого селекта, добавляем нужные опции второму селекту
	if (selectedValue === 'ЖД') {
		$('#delivery_type_list').prop('disabled', false);
			$secondSelect.append($('<option>', {value: 'Москва-1', text: 'Москва-1'}));
	}  else if (selectedValue === 'Автодоставка') {
		$('#delivery_type_list').prop('disabled', false);
			$secondSelect.append($('<option>', {value: 'Автодоставка-1', text: 'Выбрать адрес доставки', disabled: 'disabled', selected: 'selected'}));
			$secondSelect.append($('<option>', {value: 'Автодоставка-2', text: 'г. Менделеевск'}));
	}else if (selectedValue === 'Самовывоз') {
		$('#delivery_type_list').prop('disabled', true);
		$secondSelect.append($('<option>', {value: 'Самовывоз-1', text: 'Выбрать адрес самовывоза', disabled: 'disabled', selected: 'selected'}));
		$secondSelect.append($('<option>', {value: 'Автодоставка-2', text: 'г. Менделеевск'}));
}
var $secondSelectLabel = $('#delivery_type_list').prev('label');

// В зависимости от выбранного значения первого селекта, изменяем текст метки второго селекта
if (selectedValue === 'ЖД') {
		$secondSelectLabel.text('Станция назначения').css('opacity','1');
} else if (selectedValue === 'Самовывоз') {
		$secondSelectLabel.text('Самовывоз').css('opacity','0');
} else if (selectedValue === 'Автодоставка') {
		$secondSelectLabel.text('Адрес доставки').css('opacity','1');
}
});
$('.documents_download').attr('style','display:none !important');
$('.documents_download_toggle').click(function(){
	$(this).toggleClass('active')
	$(this).parent().parent().next().slideToggle(100)
})
$('.download_docs_choice').click(function(){
	$(this).toggleClass('active')
	$(this).next().closest('.droplist_docs').toggleClass('active')
})
$(document).mouseup(function (e) {
	var container1 = $(".droplist_docs");
	
	// Если цель клика не является контейнером и не является дочерним элементом контейнера
	if (!container1.is(e.target) && container1.has(e.target).length === 0) {
				 container1.removeClass('active');
				 $('.download_docs_choice').removeClass('active')
		 } else { 
				 container1.toggleClass('active');
				 
		 }
	 });
$('.js-select-single').select2({
	minimumResultsForSearch: -1,
});





