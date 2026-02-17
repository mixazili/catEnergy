ymaps.ready(init);

function init() {
  if (!window.ymaps) return;

  const catEnergyOffice = [59.938631, 30.323055];

  const center = [59.939631, 30.310055]

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

document.querySelectorAll("[data-compare]").forEach((compare) => {
  const range = compare.querySelector("[data-compare-range]");
  const stage = compare.querySelector(".compare__stage");
  const afterImg = compare.querySelector(".compare__img--after");
  const beforeImg = compare.querySelector(".compare__img--before")

  const THUMB_RADIUS = 17;

  const update = () => {
    const min = Number(range.min) || 0;
    const max = Number(range.max) || 1000;
    const val = Number(range.value) || 0;

    const t = (val - min) / (max - min); 

    const rangeRect = range.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();

    const xOnRange =
      THUMB_RADIUS + t * (rangeRect.width - THUMB_RADIUS * 2);

    const xInStage = (rangeRect.left + xOnRange) - stageRect.left;

    const rightInsetPx = Math.max(0, stageRect.width - xInStage);
    const leftInsetPx = Math.max(0, xInStage);

    afterImg.style.clipPath = `inset(0px ${rightInsetPx}px 0px 0px)`;
    beforeImg.style.clipPath = `inset(0px 0px 0px ${leftInsetPx}px)`;
  };

  range.addEventListener("input", update);
  window.addEventListener("resize", update);
  update();
});



