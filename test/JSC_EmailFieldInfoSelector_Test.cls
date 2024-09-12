@isTest
private class JSC_EmailFieldInfoSelector_Test
{
@IsTest
  static void itShouldGetemailFieldInfo()
  {
    // Given
   List<JSC_GenesysEmailTemplate__mdt>  recordsBefore  =
        [SELECT Id,MasterLabel,Sequence__c,Value__c FROM JSC_GenesysEmailTemplate__mdt ORDER BY Sequence__c];

   

    // when
    JSC_EmailFieldInfoSelector selector =
        (JSC_EmailFieldInfoSelector) JSC_Application.Selector.newInstance(JSC_GenesysEmailTemplate__mdt.SObjectType);

    List<JSC_GenesysEmailTemplate__mdt> records = selector.selectAll();

    // then
    
    System.assertEquals(recordsBefore.get(0).Sequence__c, records.get(0).Sequence__c);
  }
}