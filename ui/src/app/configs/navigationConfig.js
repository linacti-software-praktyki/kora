import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'git-projects', 
    title: 'projects',
    translate: 'projects',
    type: 'item',
    icon: 'heroicons-outline:chart-pie',
    url: 'projects'
  },
  {
    id: 'example-component',
    title: 'Example',
    translate: 'EXAMPLE',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'example',
  },
  {
    id: 'post-component',
    title: 'Post',
    translate: 'POST',
    type: 'item',
    icon: 'heroicons-outline:mail',
    url: 'post',
  },
  {
    id: 'finances-component',
    title: 'Finances',
    translate: 'FINANCES',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'finances',
  },
  {
    id: 'work-tracking-component',
    title: 'Work Tracking',
    translate: 'WORK_TRACKING',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'work-tracking',
  },
  {
    id: 'invoices-component',
    title: 'Invoices',
    translate: 'INVOICES',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'invoices',
  },
  {
    id: 'wojciech-component',
    title: 'Wojciech',
    translate: 'WOJCIECH',
    type: 'item',
    icon: 'heroicons-outline:mail',
    url: 'wojciech',
  },
  {
    id: 'dominik-component',
    title: 'Dominik',
    translate: 'DOMINIK',
    type: 'item',
    icon: 'heroicons-outline:mail',
    url: 'dominik',
  },
  {
    id: 'piotr-component',
    title: 'Piotr',
    translate: 'PIOTR',
    type: 'item',
    icon: 'heroicons-outline:mail',
    url: 'piotr',
  },
  {
    id: 'dawid-component',
    title: 'Dawid',
    translate: 'DAWID',
    type: 'item',
    icon: 'heroicons-outline:mail',
    url: 'dawid',
  },
  {
    id: 'mati-component',
    title: 'Mati',
    translate: 'MATI',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'mati',
  },
  {
    id: 'subpage',
    title: 'Subpage',
    translate: 'SUBPAGE',
    type: 'item',
    icon: 'heroicons-outline:academic-cap',
    url: 'subpage',
  },
  {
    id: 'specific-name',
    title: 'Specific Name',
    translate: 'SPECIFIC_NAME',
    type: 'item',
    icon: 'heroicons-outline:calculator',
    url: 'specific-name',
  },
];

export default navigationConfig;
