//Yandex map
{
  if (window.ymaps) {
    ymaps.ready(init);
  }

  function init() {
    if (!window.ymaps) return;

    const catEnergyOffice = [59.938631, 30.323055];

    const center = [59.939631, 30.310055];

    const getCenter = () => {
      const w = window.innerWidth;
      if (w <= 1439) return catEnergyOffice;
      return center;
    };

    const map = new ymaps.Map(
      "map",
      {
        center: getCenter(),
        zoom: 15,
        controls: [],
      },
      {
        suppressMapOpenBlock: true,
      }
    );

    const placemark = new ymaps.Placemark(
      catEnergyOffice,
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "assets/map_pin.png",
        iconImageSize: [80, 80],
        iconImageOffset: [-40, -80],
      }
    );

    map.geoObjects.add(placemark);

    let t;
    window.addEventListener("resize", () => {
      clearTimeout(t);
      t = setTimeout(() => {
        map.setCenter(getCenter(), map.getZoom(), { duration: 200 });
      }, 100);
    });
  }
}

//Live example desc & tablet (range)
{
  function initRangeCompare(compare) {
    const range = compare.querySelector("[data-compare-range]");
    if (!range) return;

    const stage = compare.querySelector(".compare__stage");
    const afterImg = compare.querySelector(".compare__img--after");
    const beforeImg = compare.querySelector(".compare__img--before");
    if (!stage || !afterImg || !beforeImg) return;

    const THUMB_RADIUS = 17;

    const disableAnim = () => {
      afterImg.style.transition = "none";
      beforeImg.style.transition = "none";
    };

    const updateByRange = () => {
      disableAnim();

      const min = Number(range.min) || 0;
      const max = Number(range.max) || 1000;
      const val = Number(range.value) || 0;
      const t = (val - min) / (max - min); // 0..1

      const rangeRect = range.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();

      const xOnRange = THUMB_RADIUS + t * (rangeRect.width - THUMB_RADIUS * 2);
      const xInStage = rangeRect.left + xOnRange - stageRect.left;

      const rightInsetPx = Math.max(0, stageRect.width - xInStage);
      const leftInsetPx = Math.max(0, xInStage);

      afterImg.style.clipPath = `inset(0px ${rightInsetPx}px 0px 0px)`;
      beforeImg.style.clipPath = `inset(0px 0px 0px ${leftInsetPx}px)`;
    };

    range.addEventListener("input", updateByRange);
    window.addEventListener("resize", updateByRange);

    // первый запуск
    updateByRange();

    return { updateByRange };
  }
}

//Live example mobile (toogle)
{
  function initToggleCompare(compare) {
    const toggle = compare.querySelector("[data-compare-toggle]");
    if (!toggle) return;

    const afterImg = compare.querySelector(".compare__img--after");
    const beforeImg = compare.querySelector(".compare__img--before");
    if (!afterImg || !beforeImg) return;

    const enableMobileAnim = () => {
      afterImg.style.transition = "clip-path 500ms ease";
      beforeImg.style.transition = "clip-path 500ms ease";
    };

    const setState = (state) => {
      enableMobileAnim();

      if (state === "before") {
        beforeImg.style.clipPath = "inset(0 0 0 0)";
        afterImg.style.clipPath = "inset(0 100% 0 0)";
      } else {
        beforeImg.style.clipPath = "inset(0 0 0 100%)";
        afterImg.style.clipPath = "inset(0 0 0 0)";
      }
    };

    const updateByToggle = () => {
      setState(toggle.checked ? "after" : "before");
    };

    toggle.addEventListener("change", updateByToggle);

    updateByToggle();

    return { updateByToggle };
  }

  document.querySelectorAll("[data-compare]").forEach((compare) => {
    const mqMobile = window.matchMedia("(max-width: 767px)");

    const rangeApi = initRangeCompare(compare);
    const toggleApi = initToggleCompare(compare);

    const syncMode = () => {
      if (mqMobile.matches) {
        toggleApi?.updateByToggle?.();
      } else {
        rangeApi?.updateByRange?.();
      }
    };

    window.addEventListener("resize", syncMode);
    syncMode();
  });
}


//Burger header mobile
{
  (() => {
    const header = document.querySelector(".header");
    const burger = document.querySelector(".header__burger");
    const menu = document.querySelector(".header__menu");

    if (!header || !burger || !menu) return;

    const BURGER_ICON = "assets/icon_burger.svg";
    const CLOSE_ICON = "assets/icon_cross.svg";

    const setOpen = (isOpen) => {
      header.classList.toggle("header--open", isOpen);
      document.body.classList.toggle("menu-open", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
      burger.setAttribute(
        "aria-label",
        isOpen ? "Закрыть меню" : "Открыть меню"
      );

      const img = burger.querySelector("img");
      if (img) img.src = isOpen ? CLOSE_ICON : BURGER_ICON;
    };

    burger.addEventListener("click", () => {
      const open = burger.getAttribute("aria-expanded") === "true";
      setOpen(!open);
    });

    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    document.addEventListener("click", (e) => {
      const open = burger.getAttribute("aria-expanded") === "true";
      if (!open) return;

      const insideMenu = e.target.closest(".header__menu");
      const insideBurger = e.target.closest(".header__burger");
      if (!insideMenu && !insideBurger) setOpen(false);
    });
  })();
}
