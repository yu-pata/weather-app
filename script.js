// script.js - Day 2: デザインと機能拡張

const apiKey = '1882683fd83c52d85788fc8c5bf11dea'; // APIキー
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value; // 入力された都市名を取得

    fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=ja`)
        .then(response => {
            if (!response.ok) {
                throw new Error('都市が見つかりませんでした');
            }
            return response.json();
        })
        .then(data => {
            console.log('天気データ:', data);

            // 天気情報を画面に表示
            const weather = data.weather[0]; // 天気情報
            const main = data.main; // 主な気象データ
            const wind = data.wind; // 風情報

            const weatherHtml = `
                <h2>${data.name}の天気</h2>
                <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="${weather.description}">
                <p>天気: ${weather.description}</p>
                <p>温度: ${main.temp}°C</p>
                <p>体感温度: ${main.feels_like}°C</p>
                <p>湿度: ${main.humidity}%</p>
                <p>風速: ${wind.speed} m/s</p>
            `;

            document.getElementById('weatherResult').innerHTML = weatherHtml;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('weatherResult').innerHTML = `
                <p style="color: red;">エラー: ${error.message}</p>
            `;
        });
});