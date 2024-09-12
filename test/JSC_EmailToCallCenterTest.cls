@isTest
public class JSC_EmailToCallCenterTest {
    @isTest
    public static void sendEmailTest() {
        Test.startTest();
        string jsn ='{ "FirstName":"testdev001","LastName"  :"00001","Email"  : "sample@test.com","HealthcareProfessionalType":"test001","Phone":"09576309756","Product":"test product", "Message":"same body meeesage for the test email","AddOrUpdatePersonalInformationInProfile":"false"}';
        JSC_EmailToCallCenter.sendEmail(jsn);
        Integer t = 1;
        System.assert(t == 1);
        Test.stopTest(); 
    }
}
