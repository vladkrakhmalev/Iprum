export const initFocusHandler = () => {
  const inputs = document.querySelectorAll('.input__field')

  if (inputs.length) {
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.closest('.input').classList.add('_focus')
      })

      input.addEventListener('blur', () => {
        input.closest('.input').classList.remove('_focus')
      })
    })
  }
}
