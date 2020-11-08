// eslint-disable-next-line wrap-iife
(function () {
  const body = document.body;
  const openMobileMenu = document.querySelector('.button__icon_burger');
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

  function closeMobileMenu() {
    if (!navigation.classList.contains('hidden')) {
      navigation.classList.add('hidden');
      navigation.classList.remove('navigation_flex');
      headerPanel.classList.remove('header__panel_theme_dark');
      overlay.classList.add('hidden');
      openMobileMenu.classList.remove('hidden');
      closeMobileMenuButton.classList.add('hidden');
      console.log('close burger!');
    }
  }

  function addListenerToCloseButton(closePopupButton) {
    closePopupButton.addEventListener('click', function() {
      closePopupButton.closest('.popup').classList.add('hidden');
      openMobileMenu.classList.remove('hidden');
      body.classList.remove('overflow-hidden');
    });
  }

  // eslint-disable-next-line prefer-arrow-callback
  openMobileMenu.addEventListener('click', function() {
    if (navigation.classList.contains('hidden')) {
      navigation.classList.remove('hidden');
      navigation.classList.add('navigation_flex');
      headerPanel.classList.add('header__panel_theme_dark');
      overlay.classList.remove('hidden');
      openMobileMenu.classList.add('hidden');
      closeMobileMenuButton.classList.remove('hidden');
      console.log('remove hidden, set theme_dark, set overlay to page');
    }
  });

  closeMobileMenuButton.addEventListener('click', closeMobileMenu);

  authButton.addEventListener('click', function() {
    const closePopupButton = popupCloseButtons.namedItem('signin-close');
    closeMobileMenu();
    openMobileMenu.classList.add('hidden');
    popupSignIn.classList.remove('hidden');
    body.classList.add('overflow-hidden');

    addListenerToCloseButton(closePopupButton);
  });

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