import { LightningElement,track } from 'lwc';
import getCurrentWeather from '@salesforce/apex/WeatherApiController.getWeatherDetails';


export default class CurrentWeatherLWC extends LightningElement {
    city='';
    weatherIcon;
    weatherText;

    cityChangeHandler(event)
    {
        this.city=event.target.value;
    }
    changeHandler()
    {
        getCurrentWeather({city:this.city})
        .then(result=>{
            let weatherdata=JSON.parse(result);
            console.log('weatherData->>>',weatherdata);
            this.weatherIcon=weatherdata.current.condition.icon;
            this.weatherText=weatherdata.current.condition.text;
        })
        .catch(error=>{});
    }
}