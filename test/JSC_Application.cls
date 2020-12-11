public with sharing class JSC_Application
{
	public static final fflib_Application.UnitOfWorkFactory UnitOfWork = new fflib_Application.UnitOfWorkFactory(
			new List<SObjectType>
			{
				JSC_Content__c.SObjectType,
				ContentVersion.SObjectType,
				ContentDocumentLink.SObjectType
			}
	);

	public static final fflib_Application.ServiceFactory Service = new fflib_Application.ServiceFactory(
			new Map<Type, Type>
			{
					//please add the entries in alphabatical order
					JSC_AnnouncementsService.class => JSC_AnnouncementsService.class,
					JSC_BasicInfoService.class => JSC_BasicInfoService.class,
					JSC_BreadcrumbService.class => JSC_BreadcrumbService.class,
					JSC_ContentDocumentLinksService.class => JSC_ContentDocumentLinksService.class,
					JSC_ContentsService.class => JSC_ContentsService.class,
					JSC_ContentVersionsService.class => JSC_ContentVersionsService.class,
					JSC_EmailFieldInfoService.class => JSC_EmailFieldInfoService.class,
                    JSC_ExecutiveSummaryPageCardsService.class => JSC_ExecutiveSummaryPageCardsService.class,
					JSC_InitialAttestationsService.class => JSC_InitialAttestationsService.class,
					JSC_JSAlertsService.class => JSC_JSAlertsService.class,
					JSC_PageHeadersService.class => JSC_PageHeadersService.class,
					JSC_ProductResourcesService.class => JSC_ProductResourcesService.class,
					JSC_ProductsService.class => JSC_ProductsService.class,
					JSC_ResourcesService.class => JSC_ResourcesService.class,
					JSC_SectionComponentsService.class => JSC_SectionComponentsService.class,
					JSC_SitePageTextsService.class => JSC_SitePageTextsService.class,
					JSC_StaticResourcesService.class => JSC_StaticResourcesService.class,
					JSC_TabbedNavigationService.class => JSC_TabbedNavigationService.class,
					JSC_TaPubMedCardsService.class => JSC_TaPubMedCardsService.class,
					JSC_TaResourcePageCardsService.class => JSC_TaResourcePageCardsService.class,
					JSC_TherapeuticAreasService.class => JSC_TherapeuticAreasService.class,
					JSC_UsefulLinksService.class => JSC_UsefulLinksService.class
			}
	);

	public static final fflib_Application.SelectorFactory Selector = new fflib_Application.SelectorFactory(
			new Map<SObjectType, Type>
			{
					//please add the entries in alphabatical order
					ContentVersion.SObjectType => JSC_ContentVersionsSelectorImp.class,
					JSC_APINameMappingByKey__mdt.SObjectType => JSC_ApiNameMapByKeysSelectorImp.class,
					JSC_BasicCommunitySiteInformation__mdt.SObjectType => JSC_BasicInfoSelectorImp.class,
					JSC_Breadcrumb__mdt.SObjectType => JSC_BreadcrumbSelectorImp.class,
					JSC_Content__c.SObjectType => JSC_ContentsSelectorImp.class,
					JSC_ExecutiveSummaryPageCard__mdt.SObjectType => JSC_ExecSummariesSelectorImp.class,
					JSC_GenesysEmailTemplate__mdt.SObjectType => JSC_EmailFieldInfoSelectorImp.class,
                     JSC_InitialAttestation__mdt.SObjectType => JSC_InitialAttestationsSelectorImp.class,
					JSC_JSAlerts__c.SObjectType => JSC_JSAlertsSelectorImp.class,
					JSC_JSAnnouncementsPageCards__c.SObjectType => JSC_AnnouncementsSelectorImp.class,
					JSC_JSUsefulLinksPageCards__c.SObjectType => JSC_UsefulLinksSelectorImp.class,
					JSC_LinkWhitelist__mdt.SObjectType => JSC_LinkWhitelistsSelectorImp.class,
					JSC_MainResourcesPageCard__mdt.SObjectType => JSC_ResourcesSelectorImp.class,
					JSC_PageHeader__mdt.SObjectType => JSC_PageHeadersSelectorImp.class,
					JSC_ProductResourcesPageCards__mdt.SObjectType  => JSC_ProductResourcesSelectorImp.class,
					JSC_SectionComponents__c.SObjectType => JSC_SectionComponentsSelectorImp.class,
					JSC_Setting__mdt.SObjectType => JSC_SettingsSelectorImp.class,
					JSC_SitePageText__mdt.SObjectType => JSC_SitePageTextSelectorImp.class,
					JSC_TabbedNavigationHeader__mdt.SObjectType => JSC_TabbedNavigationSelectorImp.class,
					JSC_TAPubMedCard__mdt.SObjectType => JSC_TaPubMedCardsSelectorImp.class,
					JSC_TAResourcesPageCard__mdt.SObjectType => JSC_TaResourcePageCardsSelectorImp.class,
					JSC_TherapeuticAreasPageCard__mdt.SObjectType => JSC_TherapeuticAreasSelectorImp.class,
					Product2.SObjectType => JSC_ProductsSelectorImp.class,
					Schema.Network.SObjectType => JSC_NetworksSelectorImp.class,
					StaticResource.SObjectType => JSC_StaticResourcesSelectorImp.class
			}
	);

	public static final fflib_Application.SelectorFactory ElevatedSelector = new fflib_Application.SelectorFactory(
			new Map<SObjectType, Type>
			{
					//please add the entries in alphabatical order
					ContentVersion.SObjectType => JSC_ContentVersionsSelectorElevatedImp.class,
					JSC_APINameMappingByKey__mdt.SObjectType => JSC_ApiNameMapByKeysSelectorElevatedImp.class,
					JSC_BasicCommunitySiteInformation__mdt.SObjectType => JSC_BasicInfoSelectorElevatedImp.class,
					JSC_Breadcrumb__mdt.SObjectType => JSC_BreadcrumbSelectorElevatedImp.class,
					JSC_Content__c.SObjectType => JSC_ContentsSelectorElevatedImp.class,
					JSC_ExecutiveSummaryPageCard__mdt.SObjectType => JSC_ExecSummariesSelectorElevatedImp.class,
					JSC_InitialAttestation__mdt.SObjectType => JSC_InitAttestationsSelectorElevatedImp.class,
					JSC_JSAlerts__c.SObjectType => JSC_JSAlertsSelectorElevatedImp.class,
					JSC_JSAnnouncementsPageCards__c.SObjectType => JSC_AnnouncementsSelectorElevatedImp.class,
					JSC_JSUsefulLinksPageCards__c.SObjectType => JSC_UsefulLinksSelectorElevatedImp.class,
					JSC_LinkWhitelist__mdt.SObjectType => JSC_LinkWhitelistsSelectorElevatedImp.class,
					JSC_MainResourcesPageCard__mdt.SObjectType => JSC_ResourcesSelectorElevatedImp.class,
					JSC_PageHeader__mdt.SObjectType => JSC_PageHeadersSelectorElevatedImp.class,
					JSC_ProductResourcesPageCards__mdt.SObjectType => JSC_ProductResourcesSelectorElevatedImp.class,
					JSC_SectionComponents__c.SObjectType => JSC_SectionComponentsSelectorElevatedImp.class,
					JSC_Setting__mdt.SObjectType => JSC_SettingsSelectorElevatedImp.class,
					JSC_SitePageText__mdt.SObjectType => JSC_SitePageTextElevatedImp.class,
					JSC_TabbedNavigationHeader__mdt.SObjectType => JSC_TabbedNavigationSelectorElevatedImp.class,
					JSC_TAPubMedCard__mdt.SObjectType => JSC_TaPubMedCardsSelectorElevatedImp.class,
					JSC_TAResourcesPageCard__mdt.SObjectType => JSC_TaResourcePageCardsSelectorElevImp.class,
					JSC_TherapeuticAreasPageCard__mdt.SObjectType => JSC_TherapeuticAreasSelectorElevatedImp.class,
					Product2.SObjectType => JSC_ProductsSelectorElevatedImp.class,
					Schema.Network.SObjectType => JSC_NetworksSelectorElevatedImp.class,
					StaticResource.SObjectType => JSC_StaticResourcesSelectorElevatedImp.class
			}
	);

	public static final fflib_Application.DomainFactory Domain = new fflib_Application.DomainFactory(
			JSC_Application.Selector,
			new Map<SObjectType, Type>
			{
					ContentDocumentLink.SObjectType => JSC_ContentDocumentLinks.Constructor.class,
					JSC_Content__c.SObjectType => JSC_Contents.Constructor.class
			}
	);
}