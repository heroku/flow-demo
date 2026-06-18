({
    call: function(action, params) {
        return new Promise($A.getCallback(function(resolve, reject) {
            if (params) {
                action.setParams(params);
            }
            action.setCallback(this, function(res) {
                if (res.getState() == "SUCCESS") {
                    resolve(res.getReturnValue());
                } else {
                    reject(res.getError());
                }
            });
            $A.enqueueAction(action);
        }));
    },
    clearFieldsAndAssignStatus: function(sec, objs) {
        for (var i = 0; i < objs.length; i++) {
            /* ADDED to clear Sale auction*/
            /*objs[i].Attorney_FCL_Sale_Time__c = '';
            objs[i].Attorney_FCL_Sale_Date__c = '';*/

            if (sec == 'cancellation') {
                objs[i].Postponement_notification_date__c = '';
                objs[i].Postponement_New_Auction_Date__c = '';
                objs[i].Postponement_New_Auction_Time__c = '';
                objs[i].Postponed_Primary_Reason__c = '';
                objs[i].Postponed_by__c = '';
                objs[i].Removal_Date__c = '';
                objs[i].Removal_Reason__c = '';
                objs[i].Removal_Requested_By__c = '';
                objs[i].Gate_Opened__c= true;
            	objs[i].FCL_Sale_Date_Changed__c = false
                //objs[i].Morpheus_Master_Status__c = 'Canceled';
            } else if (sec == 'postponement') {
                objs[i].Removal_Date__c = '';
                objs[i].Removal_Reason__c = '';
                objs[i].Removal_Requested_By__c = '';
                objs[i].Cancel_Notification_Date__c = '';
                objs[i].Cancel_Primary_Reason__c = '';
                objs[i].Cancelled_By__c = '';
                objs[i].Gate_Opened__c= true;
            	objs[i].FCL_Sale_Date_Changed__c = false
                //objs[i].Morpheus_Master_Status__c = 'Postponed';
            } else {
                objs[i].Postponement_notification_date__c = '';
                objs[i].Postponement_New_Auction_Date__c = '';
                objs[i].Postponement_New_Auction_Time__c = '';
                objs[i].Postponed_Primary_Reason__c = '';
                objs[i].Postponed_by__c = '';
                objs[i].Cancel_Notification_Date__c = '';
                objs[i].Cancel_Primary_Reason__c = '';
                objs[i].Cancelled_By__c = '';
                objs[i].Gate_Opened__c= true;
            	objs[i].FCL_Sale_Date_Changed__c = false;
                //objs[i].Morpheus_Master_Status__c = 'Removed';
            }
        }
    },
     updateCampaignMorpheusMasterStatus : function(component, status, postpone, notificationdate, auctiondate, auctiontime, reason, postponedby) {
        var status_label = '';
  		if(status == 'postponement'){
            status_label = 'POSTPONED';
        } else if(status == 'removal'){
        	status_label = 'Removed';
        } else if(status == 'cancellation'){
            status_label = 'Canceled';
        }
        var recordId = component.get('v.recordId');
        var action = component.get("c.updateCampaignMorpheusMasterStatus");
        action.setParams({
            campaignid: component.get('v.campaignId'),
            propertyIntakeId: recordId,
            status: status_label,
            postponeIndefinitely: postpone,
            reason: reason,
            notificationdate: notificationdate,
            auctiontime: auctiontime,
            auctiondate: auctiondate,
            postponedby: postponedby
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state == "SUCCESS"){
                console.log("Successfully updated campaign");
            } else {
                console.error("Failed to update campaign");
            }
        });
        $A.enqueueAction(action);
    }, 
    
    clearAll: function(objs) {
        for (var i = 0; i < objs.length; i++) {
            objs[i].Postponement_notification_date__c = '';
            objs[i].Postponement_New_Auction_Date__c = '';
            objs[i].Postponement_New_Auction_Time__c = '';
            objs[i].Postponed_Primary_Reason__c = '';
            objs[i].Postponed_by__c = '';
            objs[i].Removal_Date__c = '';
            objs[i].Removal_Reason__c = '';
            objs[i].Removal_Requested_By__c = '';
            objs[i].Removal_Date__c = '';
            objs[i].Removal_Reason__c = '';
            objs[i].Removal_Requested_By__c = '';
            objs[i].Cancel_Notification_Date__c = '';
            objs[i].Cancel_Primary_Reason__c = '';
            objs[i].Cancelled_By__c = '';
            objs[i].Postponement_notification_date__c = '';
            objs[i].Postponement_New_Auction_Date__c = '';
            objs[i].Postponement_New_Auction_Time__c = '';
            objs[i].Postponed_Primary_Reason__c = '';
            objs[i].Postponed_by__c = '';
            objs[i].Cancel_Notification_Date__c = '';
            objs[i].Cancel_Primary_Reason__c = '';
            objs[i].Cancelled_By__c = '';
            objs[i].Gate_Opened__c= true;
            objs[i].FCL_Sale_Date_Changed__c = false
            //objs[i].Morpheus_Master_Status__c = ''; /* Changed to Blank to support Listing Integration */
            //objs[i].Morpheus_Master_Status__c = 'Postponed'/*CHANGED from '' to 'Postponed' to show the auction tab after submitting the auction*/
        }
    },
    /** timeConvertor: function(time) {
        if (time) {
            time = time.split('.')[0];
            time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

            if (time.length > 1) {
                time = time.slice(1);
                time[5] = +time[0] < 12 ? 'AM' : 'PM';
                time[0] = +time[0] % 12 || 12;
            }
            return time[0] + time[1] + time[2] + ' ' + time[5];
        } else {
            return '';
        }

    },
    timeConvertorFomatted: function(time) {
        var PM = time.match('PM') ? true : false;
        time = time.split(':');
        var min = time[1];
        if (PM) {
            var hour = 12 + parseInt(time[0],10);
            min = min.replace('PM','').trim();
        } else {
            var hour = time[0].length > 1 ? time[0] : '0'+time[0];
            min = min.replace('AM','').trim();
        }
        var d = hour + ':' + min + ':00.000Z';
        return d;
    },**/

    getTimes: function(startHour, endHour, interval) {
        var times = []
        var hours, minutes, ampm;
        for (var i = startHour * 60; i <= endHour * 60; i += (interval || 15)) {
            hours = Math.floor(i / 60);
            minutes = i % 60;
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            ampm = hours % 24 < 12 ? 'AM' : 'PM';
            hours = hours % 12;
            if (hours === 0) {
                hours = 12;
            }

            times.push({
                label: hours + ':' + minutes + ' ' + ampm,
                value: hours + ':' + minutes + ' ' + ampm
            })
        }

        return times;
    },
    isChanged : function(component, saleTime, saleDate){
        var previousAttorneyFCLSaleDateAndTime = JSON.parse(JSON.stringify(component.get('v.previousAttorneyFCLSaleDateAndTime')));
        if(saleTime !== previousAttorneyFCLSaleDateAndTime['Attorney_FCL_Sale_Time__c']){
          return true;
        }
        if(saleDate !== previousAttorneyFCLSaleDateAndTime['Attorney_FCL_Sale_Date__c']){
          return true;
        }
        return false;
	  } 
})