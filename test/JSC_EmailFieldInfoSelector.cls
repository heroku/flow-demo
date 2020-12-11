public abstract with sharing class JSC_EmailFieldInfoSelector extends fflib_SObjectSelector{
 public JSC_EmailFieldInfoSelector()
  {
    super();
  }

    
  public JSC_EmailFieldInfoSelector(Boolean includeFieldSetFields, Boolean enforceCRUD, Boolean enforceFLS)
  {
    super(includeFieldSetFields, enforceCRUD, enforceFLS);
  }

  public List<Schema.SObjectField> getSObjectFieldList()
  {
    return new List<Schema.SObjectField>
    {
         JSC_GenesysEmailTemplate__mdt.Id,
        JSC_GenesysEmailTemplate__mdt.MasterLabel,
        JSC_GenesysEmailTemplate__mdt.Value__c ,
        JSC_GenesysEmailTemplate__mdt.Sequence__c
    };
  }

  public Schema.SObjectType getSObjectType()
  {
    return JSC_GenesysEmailTemplate__mdt.getSObjectType();
  }

  public List<JSC_GenesysEmailTemplate__mdt> selectAll()
  {
    return Database.query(
        newQueryFactory()
        .addOrdering(JSC_GenesysEmailTemplate__mdt.Sequence__c, fflib_QueryFactory.SortOrder.ASCENDING)
            .toSOQL()
    );
  }
   
}
