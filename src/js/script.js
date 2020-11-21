// eslint-disable-next-line wrap-iife
(function () {
  const body = document.body;
  const openMobileMenuButton = document.querySelector('.button__icon_burger');
  const closeMobileMenuButton = document.querySelector('.button__icon_close');
  const authButton = document.querySelector('.navigation__button');

  const overlay = document.querySelector('.overlay');
  const navigation = document.querySelector('.navigation');
  const headerPanel = document.querySelector('.header__panel');

  const popupSignIn = document.getElementById('popup-signin');
  const popupSignUp = document.getElementById('popup-signup');
  const popupCloseButtons = document.getElementsByClassName('popup__mobile-button');
  const signUpButton = document.getElementById('open-signup');
  const signInButton = document.getElementById('open-signin');

  // закрыть мобильное меню
  function closeMobileMenu() {
    if (!navigation.classList.contains('hidden')) {
      navigation.classList.add('hidden');
      navigation.classList.remove('navigation_flex');
      headerPanel.classList.remove('header__panel_theme_dark');
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

  function openAuthPopup() {
    const closePopupButton = popupCloseButtons.namedItem('signin-close');
    closeMobileMenu();
    openMobileMenuButton.classList.add('hidden');
    popupSignIn.classList.remove('hidden');
    overlay.classList.remove('hidden');

    addListenerToCloseButton(closePopupButton);
  }

  //listeners


  // eslint-disable-next-line prefer-arrow-callback
  openMobileMenuButton.addEventListener('click', openMobileMenu);
  closeMobileMenuButton.addEventListener('click', closeMobileMenu);
  authButton.addEventListener('click', openAuthPopup);

  signUpButton.addEventListener('click', function() {
    popupSignIn.classList.add('hidden');
    popupSignUp.classList.remove('hidden');
    const closePopupButton = popupCloseButtons.namedItem('signup-close');
    closePopupButton.classList.remove('hidden');
    addListenerToCloseButton(closePopupButton);
  });

  signInButton.addEventListener('click', function() {
    popupSignIn.classList.remove('hidden');
    popupSignUp.classList.add('hidden');
    const closePopupButton = popupCloseButtons.namedItem('signin-close');
    closePopupButton.classList.remove('hidden');
    addListenerToCloseButton(closePopupButton);
  });
})();