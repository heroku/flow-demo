@IsTest
public class JSC_EmailFieldInfoServiceTest {
 @IsTest
  static void itShouldGetEmailFieldInfo()
  {
    
      //Given
    List<JSC_GenesysEmailTemplate__mdt>  recordsBefore  =
        [SELECT Id,MasterLabel,Sequence__c,Value__c FROM JSC_GenesysEmailTemplate__mdt ORDER BY Sequence__c];

    // when
    JSC_EmailFieldInfoService  service =
        (JSC_EmailFieldInfoService ) JSC_Application.Service.newInstance(JSC_EmailFieldInfoService.class);

    List<JSC_GenesysEmailTemplate__mdt> recordsAfter = service.getEmailFieldInfo();

    // then
    System.assertEquals(recordsBefore.get(0).Id, recordsAfter.get(0).Id);
    
  }
}