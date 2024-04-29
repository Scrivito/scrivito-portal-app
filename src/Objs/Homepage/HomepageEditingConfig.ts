import { provideEditingConfig } from 'scrivito'
import { Homepage } from './HomepageObjClass'

provideEditingConfig(Homepage, {
  title: 'Homepage',
  attributes: {
    cartAddedMessage: {
      title: 'Confirmation message after adding',
    },
    cartAddLabel: {
      title: 'Add-button label',
    },
    cartRemovedMessage: {
      title: 'Confirmation message after removing',
    },
    cartRemoveLabel: {
      title: 'Remove-button label',
    },
    cartUnvailableMessage: {
      title: 'Add-button tooltip if not logged in',
      description:
        'The placeholder __product__ is available for all labels and messages.',
    },
    contentTitle: {
      title: 'Site name',
    },
    metaDataDescription: {
      title: 'Page description',
      description: 'Limit to 175, ideally 150 characters.',
    },
    siteLanguageIcon: { title: 'Language icon' },
    siteLogoDark: {
      title: 'Dark logo',
      description: 'Used with light backgrounds',
    },
    siteLogoLight: {
      title: 'Light logo',
      description: 'Used with dark backgrounds',
    },
    siteFavicon: {
      title: 'Favicon',
    },
    title: { title: 'Title' },
    sitePortalOnlyMode: { title: 'Use portal-only mode?' },
    siteCartPage: { title: 'Location of cart page' },
    sitePortalOverviewPage: { title: 'Location of portal overview page' },
    siteSearchResultsPage: {
      title: 'Location of search results page',
    },
    siteUserProfilePage: { title: 'Location of user profile page' },
  },
  propertiesGroups: [
    {
      title: 'Site settings',
      properties: [
        'contentTitle',
        'siteLogoDark',
        'siteLogoLight',
        'siteFavicon',
        'siteLanguageIcon',
        'sitePortalOnlyMode',
        'sitePortalOverviewPage',
        'siteSearchResultsPage',
        'siteUserProfilePage',
      ],
      key: 'site-settings-group',
    },
    {
      title: 'Shopping cart',
      properties: [
        'siteCartPage',
        'cartUnvailableMessage',
        'cartAddLabel',
        'cartAddedMessage',
        'cartRemoveLabel',
        'cartRemovedMessage',
      ],
      key: 'cart-settings-group',
    },
  ],
  properties: ['title', 'metaDataDescription'],
  initialContent: {
    cartAddedMessage: 'Added __product__ to cart.',
    cartAddLabel: 'Add to cart',
    cartRemovedMessage: 'Removed __product__ from cart.',
    cartRemoveLabel: 'Remove from cart',
    cartUnvailableMessage: 'Please log in to add __product__ to cart.',
  },
})
