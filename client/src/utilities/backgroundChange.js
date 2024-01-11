const backgroundChange = () => {
    //fix for background displaying improperly on index
    if (window.location.href === 'http://localhost:5173/') {
        document.documentElement.classList.add('home-page');
        document.querySelector("body").classList.add('home-page');
      } else {
        document.documentElement.classList.remove('home-page');
        document.querySelector("body").classList.remove('home-page');
      }
}

export { backgroundChange }
