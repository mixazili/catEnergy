ymaps.ready(init);

function init() {
  if (!window.ymaps) return;

  ymaps.ready(() => {
    const catEnergyOffice = [59.938631, 30.323055];
    const center = [59.939631, 30.310055];

    const map = new ymaps.Map(
      "map",
      {
        center,
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
  });
}
