/**
* @File Name : TableController.cls
* @Description :
* @Author :
* @Last Modified By :
* @Last Modified On : March 20, 2025
* @Modification Log :
*==============================================================================
* Ver | Date | Author | Modification
*==============================================================================
* 1.0 | March 20, 2025 |   | Initial Version
**/

/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 03-20-2025
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public class TableController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [SELECT Id, Name, Description, BillingState FROM Account Where CreatedDate = TODAY];
    }

    @AuraEnabled 
    public static Account createAccount(String name, String description, String billingState){
        Account acc = new Account();
        acc.Name = name;
        acc.Description = description;
        acc.BillingState = billingState;

        System.debug('acc.name'+acc.Name);
        System.debug('acc.description'+acc.Description);
        System.debug('acc.billingState'+acc.BillingState);

        insert acc;
        return acc;
    }

    @AuraEnabled 
    public static Account deleteAccount(String accountId){
        Account acc = [SELECT Id FROM Account Where Id =: accountId];
        if(acc != null){
            delete acc;
        }
        return acc;
    }
}