const buildUrl = (city, key) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
const KToC = value => Math.round(value) - 273;
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
const getIconUrl = icon => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const requestData = async (url) => {
    const resp = await fetch(url);
    if (resp.ok) {
        const json = await resp.json();
        return json
    } else {
        alert("Error HTTP: " + resp.status);
    }
}

const organizeData = ({
    weather: [{
        main,
        icon,
        description
    }],
    main: {
        temp,
        feels_like,
        temp_min,
        temp_max
    }
}) => {
    return {
        temp: KToC(temp),
        feels_like: KToC(feels_like),
        temp_max: KToC(temp_max),
        temp_min: KToC(temp_min),
        description: capitalize(description),
        iconUrl: getIconUrl(icon),
        main
    }
}

export const buildData = async (location, apiKey) =>
    organizeData(await requestData(buildUrl(location, apiKey)));