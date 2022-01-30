<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://use.typekit.net/qub8wsq.css">
  <?php echo $css; ?>
  <title>Bembo Big Time</title>
</head>
<body>
  <header class="menu">
    <input type="checkbox" class="menu__check" id="nav-check">
    <label for="nav-check" class="menu__check--label">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="100" viewBox="0 0 36 100">
        <g id="Group_311" data-name="Group 311" transform="translate(-132 5)">
          <rect id="Rectangle_174" data-name="Rectangle 174" width="100" height="36" rx="20" transform="translate(168 -5) rotate(90)"/>
          <path class="navigation__triangle" id="Polygon_1" data-name="Polygon 1" d="M11.617,0,23.234,14.929H0Z" transform="translate(161.617 81.658) rotate(180)" fill="#fff"/>
        </g>
      </svg>
    </label>
    <div class="menu__wrapper">
        <nav class="menu__navigation">
          <ul class="navigation__list">
          <p class="menu__title bembo">Contents</p>
            <li class="navigation__list--item">
              <a class="navigation__list--link bembo" href="">
                Prologue
              </a>
            </li>

            <li class="navigation__list--item">
              <a class="navigation__list--link bembo" href="">
                chapter1
              <div class="navigation__link--sub">Big in History</div>
              </a>
            </li>

            <li class="navigation__list--item">
              <a class="navigation__list--link bembo" href="">
                chapter2
              <div class="navigation__link--sub">Big in Beauty</div>
              </a>
            </li>

            <li class="navigation__list--item">
              <a class="navigation__list--link bembo" href="">
                chapter3
                <div class="navigation__link--sub">Big in Time</div>
              </a>
            </li>

            <li class="navigation__list--item">
              <a class="navigation__list--link bembo" href="">
                Next week
              </a>
            </li>
          </ul>
        </nav>
    </div>
  </header>
  <div class="container">

      <?php echo $content;?>
  </div>
  <?php echo $js; ?>
<footer class="footer">
  <p class="footer__text">© slanted publishers 2022 x Kaat Clinckemaillie </p>
</footer>
</body>
</html>
