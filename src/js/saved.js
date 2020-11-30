import '../pages/saved.css';

(function () {
  const body = document.body;
  const openMobileMenuButton = document.querySelector('.button__icon_burger');
  const closeMobileMenuButton = document.querySelector('.button__icon_close');

  const overlay = document.querySelector('.overlay');
  const navigation = document.querySelector('.navigation');
  const headerPanel = document.querySelector('.header__panel');
  const logo = document.querySelector('.logo');


  // закрыть мобильное меню
  function closeMobileMenu() {
    if (!navigation.classList.contains('hidden')) {
      navigation.classList.add('hidden');
      navigation.classList.remove('navigation_flex');
      headerPanel.classList.remove('header__panel_theme_dark');
      headerPanel.classList.add('header__panel_theme_white');
      logo.classList.add('logo_theme_white');
      overlay.classList.add('hidden');
      openMobileMenuButton.classList.remove('hidden');
      closeMobileMenuButton.classList.add('hidden');
    }
  }

  // открыть мобильное меню: добавляем темную тему в панель хедера,
  // затемняем страницу, скрываем иконку бургера, показываем кнопку Х
  function openMobileMenu() {
    if (navigation.classList.contains('hidden')) {
      navigation.classList.remove('hidden');
      navigation.classList.add('navigation_flex');
      headerPanel.classList.add('header__panel_theme_dark');
      headerPanel.classList.remove('header__panel_theme_white');
      logo.classList.remove('logo_theme_white');
      overlay.classList.remove('hidden');
      openMobileMenuButton.classList.add('hidden');
      closeMobileMenuButton.classList.remove('hidden');
    }
  }

  function addListenerToCloseButton(closePopupButton) {
    closePopupButton.addEventListener('click', function() {
      closePopupButton.closest('.popup').classList.add('hidden');
      openMobileMenuButton.classList.remove('hidden');
      body.classList.remove('overflow-hidden');
      overlay.classList.add('hidden');
    });
  }

  //listeners

  // eslint-disable-next-line prefer-arrow-callback
  openMobileMenuButton.addEventListener('click', openMobileMenu);
  closeMobileMenuButton.addEventListener('click', closeMobileMenu);
})();