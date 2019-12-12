({
    handleLoad: function(component, event, helper) {
        component.set('v.showSpinner', false);
		var today = new Date();
		var dt = (today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate());
        component.set('v.postponementDate', dt);
        component.set('v.removeDate', dt);
        component.set('v.cancelDate', dt);
        var recordId = component.get('v.recordId');
        var isDefault = false;
        if (!recordId) {
            var ids = component.get('v.ids');
            component.set('v.recordId', ids[0]);
            component.set('v.isBulk', true);
        }

        var recordUi = event.getParam('recordUi');
        var f = recordUi.record;
        console.log('####' + JSON.parse(JSON.stringify(f)))
        if (f.fields && f.fields['Morpheus_Master_Status_2__c'] && f.fields['Morpheus_Master_Status_2__c'].value && (f.fields['Morpheus_Master_Status_2__c'].value.toUpperCase() == 'POSTPONED' ||
            f.fields['Morpheus_Master_Status_2__c'].value.toUpperCase() == 'CANCELED'||
            f.fields['Morpheus_Master_Status_2__c'].value.toUpperCase() == 'REMOVED')
        ) {
            isDefault = true;
            component.set('v.isMStatus', true);
            component.set('v.morphesusStatus', f.fields['Morpheus_Master_Status_2__c'].value.toUpperCase());
        }
         if(f.fields && f.fields.Postponement_notification_date__c && f.fields['Postponement_notification_date__c'].value != null){
            component.set('v.postponementDate', (f.fields['Postponement_notification_date__c'].value));
        }
        if(f.fields && f.fields.Removal_Date__c && f.fields['Removal_Date__c'].value != null){
            component.set('v.removeDate', (f.fields['Removal_Date__c'].value));
        }
        if(f.fields && f.fields.Cancel_Notification_Date__c && f.fields['Cancel_Notification_Date__c'].value != null){
            component.set('v.cancelDate', (f.fields['Cancel_Notification_Date__c'].value));
        }
        if(f.fields && f.fields.Postponement_New_Auction_Time__c){
            component.set('v.postponeTime', f.fields.Postponement_New_Auction_Time__c.value);
        }
        if(f.fields && f.fields.Attorney_FCL_Sale_Time__c){
            component.set('v.saleTime', f.fields.Attorney_FCL_Sale_Time__c.value);
            
        }
        if(f.fields && f.fields.Postponement_New_Auction_Date__c && f.fields["Postponement_New_Auction_Date__c"].value == null){
            //component.set('v.saleTime', f.fields.Attorney_FCL_Sale_Time__c.value);
        }
        if(f.fields && f.fields.Postponement_New_Auction_Time__c && f.fields["Postponement_New_Auction_Time__c"].value == null){
            if(f.fields.FCL_Sale_Time__c){
                component.set("v.postponeTime", f.fields["FCL_Sale_Time__c"].value);
            } else if(f.fields.Attorney_FCL_Sale_Time__c){
                component.set("v.postponeTime", f.fields["Attorney_FCL_Sale_Time__c"].value);
            }
        }
        component.set('v.displayTimes', helper.getTimes(6, 19));
        component.set('v.campaignId', f.fields['Campaign__c'] ? f.fields['Campaign__c'].value : null);
        var previousAttorneyFCLSaleDateAndTime = {
          'Attorney_FCL_Sale_Time__c' : component.get('v.postponeTime'),
          'Attorney_FCL_Sale_Date__c' : component.get('v.saleTime')
        };
        component.set('v.previousAttorneyFCLSaleDateAndTime', previousAttorneyFCLSaleDateAndTime);
        
        var cId =  f.fields['Campaign__c'] ? f.fields['Campaign__c'].value : null;
        if(cId != null){
            helper.call(component.get('c.getCampaignDetails'), {
                    'campaignid': cId
                }).then(function(res) {
                    console.info(res);
                	component.set("v.camp", res);
                })
        }
    },
    getSelectedTab : function(component, event, helper){
        let tab = component.find('tabs').get('v.selectedTabId');
        component.set('v.tab', tab);
    },
    handleSubmit: function(component, event, helper) {

        event.preventDefault();
        component.set("v.iserror", false);
        var fields = event.getParam('fields');
        var isBulk = component.get('v.isBulk');
        var state = [];
        var allValid = false;
        var selectedTab = component.find('tabs').get('v.selectedTabId');
        var isError = false;
        var errormsg= "Property is not scheduled and can not be Postponed, Cancelled or Removed. Please verify the following data.";
            
        var campaign= component.get("v.camp");
        console.info(campaign);
        
        var Auction_Type = campaign.Auction_Type__c? campaign.Auction_Type__c : null;
        var Auction_Type_Review_Status = campaign.Auction_Type_Review_Status__c? campaign.Auction_Type_Review_Status__c : null;
        var Integration_Type = campaign.Integration_Type__c? campaign.Integration_Type__c:null; 
        var Morpheus_Property_id = campaign.Morpheus_Property_Id__c? campaign.Morpheus_Property_Id__c:null;
        var Morpheus_listing_id=campaign.Morpheus_Listing_Id__c? campaign.Morpheus_Listing_Id__c:null;
        var MLH_Global_Property_ID=campaign.MLH_Global_Property_ID__c? campaign.MLH_Global_Property_ID__c:null;
        var Scheduling_status=campaign.Scheduling_Status__c? campaign.Scheduling_Status__c:null;
        var Morpheus_Master_Status=campaign.Morpheus_Master_Status__c? campaign.Morpheus_Master_Status__c:null;

        if((Auction_Type != "Auctioneering" && Auction_Type != "Concierge") || 
            Auction_Type_Review_Status != "Confirmed" || 
            Integration_Type == "REO" || Morpheus_Property_id == null || Morpheus_listing_id == null || MLH_Global_Property_ID == null
          ){
            isError = true;
        }
        
        var selTab = component.get('v.value');
        if(selTab == "postponement" && Scheduling_status != "scheduled"){ isError = true; }
        if(isError && selectedTab != 'auction' && (selTab == "postponement" || selTab == "cancellation")){
            var fieldsMissingData = [];
            if(Auction_Type != "Auctioneering" && Auction_Type != "Concierge") { fieldsMissingData.push("Auction Type"); }
            if(Auction_Type_Review_Status != "Confirmed") { fieldsMissingData.push("Auction_Type_Review_Status"); } 
            if(Integration_Type == null || Integration_Type == "REO") { fieldsMissingData.push("Integration_Type"); }
            if(Morpheus_Property_id == null) { fieldsMissingData.push("Morpheus_Property_id"); }
            if(Morpheus_listing_id == null) { fieldsMissingData.push("Morpheus_listing_id"); }
            if(MLH_Global_Property_ID == null) { fieldsMissingData.push("MLH_Global_Property_ID"); }
            var finalErrorMsg = errormsg + fieldsMissingData.join(",");
          
            component.set("v.errormsg", finalErrorMsg);
            component.set("v.iserror", true);
            return;
        }
        
        if (selectedTab == 'auction') {
            var saleValNull = false;
            state = component.find('auction');
            allValid = state.reduce(function(validSoFar, inputCmp) {
                if (inputCmp.get('v.value') == null || inputCmp.get('v.value') == undefined || inputCmp.get('v.value') == '') {
                    if(inputCmp.get("v.fieldName")=="Attorney_FCL_Sale_Time__c"){ 
                        if(Auction_Type == "Concierge"){ return true; }
                        saleValNull = true; 
                    }
                    $A.util.addClass(inputCmp, 'slds-has-error');
                } else {
                    $A.util.removeClass(inputCmp, 'slds-has-error');
                }
                return validSoFar && inputCmp.get('v.value') != null && inputCmp.get('v.value') != undefined && inputCmp.get('v.value') != '';
            }, true);
            
            if(!allValid || (Auction_Type == "Auctioneering" && saleValNull)) {    
                component.set("v.errormsg", "Attorney FCL Sale Time is required.");
                component.set("v.iserror", true);
                return;
            }

        } else {
            state = component.find(component.get('v.value'));
            allValid = state.reduce(function(validSoFar, inputCmp) {
                if (inputCmp.get('v.value') == null || inputCmp.get('v.value') == undefined || inputCmp.get('v.value') == '') {
                    $A.util.addClass(inputCmp, 'slds-has-error');
                } else {
                    $A.util.removeClass(inputCmp, 'slds-has-error');
                }
                return validSoFar && inputCmp.get('v.value') != null && inputCmp.get('v.value') != undefined && inputCmp.get('v.value') != '';
            }, true);
        }

        if (allValid) {
            if (isBulk) {
                var ids = component.get('v.ids');
                var objs = [];
                for (var i = 0; i < ids.length; i++) {
                    objs.push({
                        Id: ids[i]
                    })
                }
                if (selectedTab == 'auction' && fields["Attorney_FCL_Sale_Date__c"] != '' && fields["Attorney_FCL_Sale_Time__c"] != '') {
                    helper.clearAll(objs);
                } else {
                    var postpone = false;
                    if((fields["Postponement_New_Auction_Date__c"] == null || fields["Postponement_New_Auction_Date__c"] == '') &&
                              (fields["Postponement_New_Auction_Time__c"] == null || fields["Postponement_New_Auction_Time__c"] == '')){
                        postpone = true;   
                    }
                    helper.updateCampaignMorpheusMasterStatus(component, component.get('v.value'), postpone,
                                                              fields["Postponement_notification_date__c"],
                                                             fields["Postponement_New_Auction_Date__c"], 
                                                              fields["Postponement_New_Auction_Time__c"],
                                                             fields["Postponed_Primary_Reason__c"],
                                                             fields["Postponed_by__c"]);
                    helper.clearFieldsAndAssignStatus(component.get('v.value'), objs);
                    if (component.get('v.value') == 'postponement') {
                        for (var i = 0; i < objs.length; i++) {
                            objs[i].Postponement_New_Auction_Time__c = component.get('v.postponeTime');
                            objs[i].Attorney_FCL_Sale_Time__c = component.get('v.saleTime');
                            objs[i].Attorney_FCL_Sale_Date__c = objs[i].Postponement_New_Auction_Date__c; 
                        }
                    }
                }

                helper.call(component.get('c.updateStatus'), {
                    'intakes': objs
                }).then(function(res) {
                    window.location.href = '/a0Y?fcf=00B1W000007lEAr';
                })
            } else {
                var fields = event.getParam('fields');

                if (selectedTab == 'auction') {
                    fields["Attorney_FCL_Sale_Time__c"] = component.get('v.saleTime');
	                    if(helper.isChanged(component, fields["Attorney_FCL_Sale_Time__c"], fields["Attorney_FCL_Sale_Date__c"]) && component.get('v.campaignId')){
                      let campaign = {
                        'Id' : component.get('v.campaignId')
                      }
                      if(component.get('v.morphesusStatus') == 'CANCELED'){
                        campaign['Listing_Reactivation__c'] = 'Cancellation Reactivation';
                      }
                      if(component.get('v.morphesusStatus') == 'REMOVED'){
                        campaign['Listing_Reactivation__c'] = 'Removal Reactivation';
                      }
                      component.set('v.campaign', campaign);
                    }                    
                    helper.clearAll([fields]);
                } else {
                    fields["Postponement_New_Auction_Time__c"] = component.get('v.postponeTime');
                    fields["Postponement_notification_date__c"] = component.get('v.postponementDate');
                   fields["Removal_Date__c"] = component.get('v.removeDate');
                   fields["Cancel_Notification_Date__c"] = component.get('v.cancelDate');
                       var postpone = false;
                    if((fields["Postponement_New_Auction_Date__c"] == null || fields["Postponement_New_Auction_Date__c"] == '') &&
                              (fields["Postponement_New_Auction_Time__c"] == null || fields["Postponement_New_Auction_Time__c"] == '')){
                        postpone = true;
                    }
                    helper.updateCampaignMorpheusMasterStatus(component, component.get('v.value'), postpone, 
                                                              fields["Postponement_notification_date__c"],
                                                              fields["Postponement_New_Auction_Date__c"], 
                                                              fields["Postponement_New_Auction_Time__c"],
                                                             fields["Postponed_Primary_Reason__c"],
                                                             fields["Postponed_by__c"]);
                    helper.clearFieldsAndAssignStatus(component.get('v.value'), [fields]);
                }

                if (component.get('v.value') == 'postponement' && selectedTab != 'auction') {
                    fields["Attorney_FCL_Sale_Time__c"] = component.get('v.postponeTime');
                    fields["Attorney_FCL_Sale_Date__c"] = fields["Postponement_New_Auction_Date__c"];
                }

                component.set('v.showSpinner', true);
                component.find('myRecordForm').submit(fields);
            }

        } else {
            component.set('v.disabled', true);
        }
    },
    handleSuccess: function(component, event, helper) {
        component.set('v.showSpinner', false);
        $A.get("e.force:closeQuickAction").fire();
        $A.get('e.force:refreshView').fire();
        if(component.get('v.tab') == 'auction' && component.get('v.campaignId')){
            console.log('Campaign');
            helper.call(component.get('c.updateCampaign'),{camp : component.get('v.campaign')}).then(function(res){
                location.reload();
            });
        }
        else{
            location.reload();
        }
    },
    handleError: function(component) {
        component.set('v.showSpinner', false);
    },
    radioChange: function(component) {
        component.set('v.showSpinner', true);
    }
})