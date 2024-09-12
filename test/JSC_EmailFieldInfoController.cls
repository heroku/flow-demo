public class JSC_EmailFieldInfoController {
    /**
* sendEmail
*
* @description Send Email to Contact Center
* @param jsonStringEmailbody The Form data to be sent as email.
* @return void
* @throws Exception When the email send Fails.
* @example
* JSC_EmailFieldInfoController.sendEmail('json');
*/
    
    @AuraEnabled(Cacheable=true)
    public static void sendEmail(String jsonStringEmailbody)
    {
        
        List<String> callCenterEmailId;
        String subject, emailbody='';
        Map<String,Object> emailDataMap = new Map<String,Object >();
        
        try
        {
            
            if(String.isNotBlank(jsonStringEmailbody)){
                emailDataMap =  (Map<String,Object >)JSON.deserializeUntyped (jsonStringEmailbody);
            }
            
            JSC_EmailFieldInfoService service = (JSC_EmailFieldInfoService)
                JSC_Application.Service.newInstance(JSC_EmailFieldInfoService.class);
            
            List<JSC_GenesysEmailTemplate__mdt> emailFields = service.getEmailFieldInfo();
            
            if(emailDataMap.size()>0 && emailFields.size()>0){
                for(JSC_GenesysEmailTemplate__mdt emailField : emailFields){
                    
                    if(emailField.Sequence__c == 0)
                        subject = emailField.Value__c;
                    if(emailField.Sequence__c == -1)
                        callCenterEmailId = new String[] {emailField.Value__c}; 
                            if(emailDataMap.containsKey(emailField.MasterLabel)){
                                emailbody = emailbody + '>>>' + emailField.Value__c +'=' + emailDataMap.get(emailField.MasterLabel) + '<<< <br/> '; 
                            }else if(emailField.Sequence__c != 0 && emailField.Sequence__c != -1){
                                emailbody = emailbody + '>>>' +emailField.Value__c+'= <<< <br/> ';  
                            } 
                }
            }
            
            
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setToAddresses(callCenterEmailId);
            mail.setSubject(subject);
            mail.setHtmlBody(emailbody);
            
            fflib_ISObjectUnitOfWork  uow = JSC_Application.UnitOfWork.newInstance();
            uow.registerEmail(mail); 
            uow.commitWork();
            
        }
        catch(Exception e)
        {
            throw new AuraHandledException(e.getMessage());
        }
    }
}