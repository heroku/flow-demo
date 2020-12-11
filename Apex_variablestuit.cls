public with sharing class Apex_variablestuit {
    public Apex_variablestuit() {
        String productName ='HCL';
        Integer c = 1;
        Set<String> setOfProducts =new Set<string>();
        Map<Id,String> mapOfProductIdToName = new Map<id, string>();
        String strname = 'My String new';
        Integer myinteger = 1;
        Boolean myBoolean = true;
       // Integer m = 100;
        for (Integer i= 0; i<10; i++){
            Integer m =1;
            System.debug('this code will throw an error');
        }
    }
}