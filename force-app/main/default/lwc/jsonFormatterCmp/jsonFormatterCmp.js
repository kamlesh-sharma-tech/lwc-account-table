import { LightningElement } from 'lwc';

export default class JsonFormatterCmp extends LightningElement {
    jsonInput = '';
    formattedJson = '';

    handleChange(event){
        this.jsonInput = event.target.value;
    }

    formatJson(){
        try{
            const json = JSON.parse(this.jsonInput);
            this.formattedJson = JSON.stringify(json,null,4);
        }catch(error){
            this.formattedJson = 'Invalid json';
        }
    }
}