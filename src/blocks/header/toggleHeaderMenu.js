export const initToggleHeaderMenu = () => {
  const openMenu = document.querySelector('.header__open-menu')
  const closeMenu = document.querySelector('.header__close-menu')
  const nav = document.querySelector('.header__nav')

  openMenu.addEventListener('click', event => {
    event.stopPropagation()
    nav.classList.add('_open')
  })

  closeMenu.addEventListener('click', event => {
    event.stopPropagation()
    nav.classList.remove('_open')
  })

  document.addEventListener('click', event => {
    if (
      nav.classList.contains('_open') &&
      !nav.contains(event.target) &&
      !openMenu.contains(event.target)
    ) {
      nav.classList.remove('_open')
    }
  })
}
