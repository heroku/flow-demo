//*********Batch Class for ADT user
global class AdcBatchclass implements Database.Batchable<SObject>,Database.AllowsCallouts {
    public class candWrapper{
        public userDetails user{get;set;}
        public candWrapper(userDetails usRecd){
            this.user=usRecd;
        }
    }
    global class userDetails{
        public string FirstName{get;set;} 
        public string LastName{get;set;} 
        public integer UserId{get;set;} 
        public userDetails(string FirstName,string LastName,integer UserId){
            this.FirstName=FirstName;
            this.LastName=LastName;
            this.UserId=UserId;
        }
    } 
    global Database.QueryLocator start(Database.BatchableContext bc){
        Date todayDt=Date.today();
        system.debug('@@@@avoiding duplicate records');
        return Database.getQueryLocator('SELECT Id,Name,FirstName__c,LastName__c,UserId__c FROM ADCUser__c WHERE createddate>=:todayDt');
    }
    
    global void execute(Database.BatchableContext bc, List<SObject> scope){
       system.debug('@@@@setting the batch size <20');
        List<candWrapper> newuserList=new List<candWrapper>();
        for(SObject obj: scope){
            ADCUser__c ADCuserObj = (ADCUser__c)obj;
            userDetails newuser=new userDetails(ADCuserObj.FirstName__c,ADCuserObj.LastName__c,Integer.valueof(ADCuserObj.UserId__c));
            newuserList.add(new candWrapper(newuser));
        }
        if(newuserList.size()>0){
            String UserjsonStr=Json.serialize(newuserList);
            system.debug('**'+UserjsonStr);
            if(UserjsonStr.contains('userDetails'))UserjsonStr=UserjsonStr.replaceAll('userDetails', 'user'); 
            Http h = new Http();
            string url='https://api.auction.com/v1/user/';
            system.debug('@@@@calling remote site settings');
            system.debug('@@@@ calling new HTTP request');
            HttpRequest req = new HttpRequest();
            req.setEndpoint(url);
            req.setMethod('POST');
            req.setHeader('Content-Type', 'text/html;charset=UTF-8');
            req.setBody(UserjsonStr);
            HttpResponse res = h.send(req);
            if (res.getStatusCode() != 200) {
                System.debug('there is some issue ');
                 System.debug('Res ' + res.getStatus());
            } else {
                System.debug(res.getBody());
            }
        }
    }
    
    global void finish(Database.BatchableContext bc){
        System.debug('maximum callouts allowed '+  String.valueOf(Limits.getLimitCallouts()));
    }
      
}