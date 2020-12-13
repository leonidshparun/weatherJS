/* eslint-disable camelcase */
const buildUrl = ({ city, coord }, key) => (
  coord
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${key}`
    : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
const getIconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;
const KToC = (value) => Math.round(value) - 273;
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const requestData = async (url) => {
  const resp = await fetch(url);
  if (resp.ok) {
    const json = await resp.json();
    return json;
  }
  throw Error(resp.status);
};

const organizeData = ({
  name,
  weather: [{
    main,
    icon,
    description,
  }],
  main: {
    temp,
    feels_like,
    temp_min,
    temp_max,
  },
}) => ({
  temp: KToC(temp),
  feels_like: KToC(feels_like),
  temp_max: KToC(temp_max),
  temp_min: KToC(temp_min),
  description: capitalize(description),
  iconUrl: getIconUrl(icon),
  main,
  name,
});

const buildData = async (location, key) => organizeData(await requestData(buildUrl(location, key)));

export default buildData;
