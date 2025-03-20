// Create a LWC component to add or delete table rows on click of button and not be able to delete when there is only one row.
// component should create an actual record on add button and it should delete that record from the org from dlt button
import { LightningElement,wire,track } from 'lwc';
import createAccount from '@salesforce/apex/TableController.createAccount';
import deleteAccount from '@salesforce/apex/TableController.deleteAccount';
import getAccounts from '@salesforce/apex/TableController.getAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountTableLWC extends LightningElement {
    @track rows = [];

    handleInputChange(event) {
        const index = event.target.dataset.index;
        const field = event.target.dataset.name;
        this.rows[index][field] = event.target.value;
    }
    

    @wire(getAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.rows = data.map(acc => ({
                id: acc.Id,
                Name: acc.Name,
                Description: acc.Description,
                BillingState: acc.BillingState
            }));
        } else if (error) {
            this.rows = [];
        }
    }

    handleSave(event){
        const index = parseInt(event.target.dataset.index,10);
        const row = this.rows[index];

        if(row.Name && row.Description && row.BillingState){
            createAccount({ name: row.Name, description: row.Description, billingState: row.BillingState})
            .then(result =>{
                this.showToast('Success', 'Account created successfully', 'success');
                this.rows[index].id = result.Id;
            })
            .catch(error =>{
                this.showToast('Error', 'Failed to create account', 'error');
            })
        }else{
            this.showToast('Error', 'Required fields are missing', 'error');
        }
    }

    handleDelete(event) {
        const index = event.target.dataset.index;
        const recordId = this.rows[index].id;

        if (this.rows.length > 1) {
            if (recordId) {
                deleteAccount({ accountId: recordId })
                    .then(() => {
                        this.rows.splice(index, 1);
                        this.rows = [...this.rows];
                        this.showToast('Success', 'Record deleted successfully', 'success');
                    })
                    .catch(error => {
                        this.showToast('Error', 'Failed to delete record', 'error');
                    });
            } else {
                this.rows.splice(index, 1);
                this.rows = [...this.rows];
            }
        } else {
            this.showToast('Error', 'Cannot delete the row', 'error');
        }
    }

    handleAddRow(){
        this.rows = [...this.rows, {id:null, Name: '', Description: '', BillingState: ''}];
    }


    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title,
            message,
            variant,
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    
}