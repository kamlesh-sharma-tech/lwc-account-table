public with sharing class WeatherApiController {
    @AuraEnabled
    public static String getWeatherDetails(String city){
        HttpRequest req = new HttpRequest();
        Http http = new Http();
        req.setEndpoint('callout:WeatherAPINamed/current.json?q='+city);
        req.setMethod('GET');

        HttpResponse res = new HttpResponse();

        res = http.send(req);
        System.debug('res->>>>'+ res);

        return res.getBody();
    
    }
}