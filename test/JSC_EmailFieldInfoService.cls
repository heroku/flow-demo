public class JSC_EmailFieldInfoService {
    
    public List<JSC_GenesysEmailTemplate__mdt> getEmailFieldInfo()
    {
        
        
        JSC_EmailFieldInfoSelector selector = (JSC_EmailFieldInfoSelector)
            JSC_Application.Selector.newInstance(JSC_GenesysEmailTemplate__mdt.SObjectType);
        
        return selector.selectAll();
    }
    
}