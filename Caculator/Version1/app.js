const percent = document.querySelector('#percent');

percent.addEventListener('click', function() {
  const display = document.querySelector('input[name="display"]');
  const currentValue = display.value;
  const resultValue = currentValue / 100;
  display.value = resultValue;
});