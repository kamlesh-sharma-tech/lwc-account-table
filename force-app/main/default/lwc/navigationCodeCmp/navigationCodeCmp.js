import { LightningElement,api,wire } from 'lwc';
import getCode from '@salesforce/apex/NavigationCodeController.getNavigationCode';
export default class NavigationCodeCmp extends LightningElement {
    @api strTitle;
    connectedCallback() {
        console.log('title->>',this.strTitle);
    }
    code;

    @wire(getCode, { code: '$strTitle' } )
    wireCode({ error, data }){
        console.log('data->',data);
        if(data){
            this.code = data;
            console.log('data->>>',data);
        }
    }
}