// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'EventDispatcher Documentation',
  tagline: 'EventDispatcher Documentation',
  url: 'https://eventdispatcher.eeldev.com',
  baseUrl: '/', 
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  favicon: 'img/eeldev_icon.png',
  organizationName: 'eeldev-docs', // Usually your GitHub org/user name.
  projectName: 'doc.eventdispatcher', // Usually your repo name.
  deploymentBranch: 'deployment',
  trailingSlash: false,
  customFields: {
    productName: 'EventDispatcher',
  },
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
  ],
  plugins: [require.resolve("docusaurus-plugin-image-zoom")],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          //editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        
        //blog: {
        //  showReadingTime: true,
        //  sortPosts: 'ascending'
        //  // Please change this to your repo.
          //editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //},
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      zoom: {
        selector: '.markdown :not(em) > img',
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
          background: {
            light: 'rgb(255, 255, 255)',
            dark: 'rgb(17, 18, 20)'
          }
        }
      },
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: false,
      },
      navbar: {
        items: [
          { href: 'https://eeldev.com', label: 'Website', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'eelDev',
            items: [
              { label: 'Website', href: 'https://eeldev.com' },
              { label: 'EventDispatcher on Fab', href: 'https://www.fab.com/listings/dc32d4cf-9875-470f-a4e4-0264c4215724' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Discord', href: 'https://discord.gg/3Yu7pEy' },
              { label: 'YouTube', href: 'https://www.youtube.com/channel/UC6Rhr_F5BxwfTtcADVPUNYA' },
              { label: 'Twitter', href: 'https://twitter.com/dryeeldev' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} eelDev AB`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.vsDark,
      },
      
    }
    ),
};

export default config;