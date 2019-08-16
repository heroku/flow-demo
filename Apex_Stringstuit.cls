public with sharing class Apex_Stringstuit {
    public Apex_Stringstuit() {
    String company= 'auction';
    System.debug('value companyname variable'+company);
    }
    public Boolean contains(String subString){
        String product1 ='HCL';
        String product2 ='Dell';
        Boolean result = product2.contains(product1);
        System.debug('o/p wiil be false as it doesn"t contains prod1 '+result);
        return result;
    }
    public Boolean equals(String subString){
        String prod1= 'hcl';
        String prod2= 'hel';
        Boolean optput = prod2.equals(prod1);
        System.debug('o/p wiil be false as it doesn"t equals prod1 '+optput);
        return optput;

    }
    public Boolean equalsIgnoreCase(String stringtoCompare){
        String tstring1 = 'salesforce';
        String tstring2 = 'force';
        Boolean result = tstring2.equalsIgnoreCase(tstring2);
        System.debug('value will be false as they are not same'+result);
        return result; 
    }
    public String remove(String stringToRemove){
        String tstring1 = 'salesforce';
        String tstring2 = 'sales';
        String result = tstring2.remove(tstring2);
        System.debug('value will force since removing sales from tstring1'+result);
        return result;
    }
    public String removeEndIgnoreCase(String stringtoRemove){
        String tstring1 = 'this is a salesforce test code';
        String tstring2 = 'code';
        String result = tstring2.removeEndIgnoreCase(tstring2);
        System.debug('value will be this is a salesforce test since we removed code at end'+result);
        return result; 
    }
    public Boolean startsWith(String prefix){
        String tstring1 = 'salesforce';
        String tstring2 = 'sales';
        Boolean result = tstring2.startsWith(tstring2);
        System.debug('value will be true as they start with sales'+result);
        return result; 
    }

}
