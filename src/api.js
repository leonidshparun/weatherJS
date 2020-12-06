export const buildUrl = (city, key) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

export const sendRequest = async (url) => {
    const resp = await fetch(url);

    if (resp.ok) {
        const json = await resp.json();
        return json
    } else {
        alert("Error HTTP: " + resp.status);
    }
}

export const extractData = response => {
    const {
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
    } = response;

    return {
        main,
        icon,
        description,
        temp,
        feels_like,
        temp_max,
        temp_min
    }
}

export const formatData = ({
    main,
    icon,
    description,
    temp,
    feels_like,
    temp_max,
    temp_min
}) => {
    [temp, feels_like, temp_max, temp_min] = 
    [temp, feels_like, temp_max, temp_min].map(value => Math.round(value) - 273);
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    description = description[0].toUpperCase() + description.slice(1);

    return {
        temp,
        feels_like,
        temp_max,
        temp_min,
        description,
        iconUrl,
        main
    }
}