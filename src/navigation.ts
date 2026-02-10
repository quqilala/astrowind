import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'AI工具 / AI Tools', href: getPermalink('/#ai-tools') },
    { text: '海外公司/账户与报税 / Global Setup & Tax', href: getPermalink('/#global-tax') },
    { text: '网络技术 / Network Tech', href: getPermalink('/#network-tech') },
    { text: '跨境电商 / Cross-border E-commerce', href: getPermalink('/#cross-border') },
    { text: '关于我们 / About Us', href: getPermalink('/#about') },
  ],
  actions: [{ text: '联系我们 / Contact', href: getPermalink('/#about') }],
};

export const footerData = {
  links: [
    {
      title: '导航 / Navigation',
      links: [
        { text: 'AI工具 / AI Tools', href: '#ai-tools' },
        { text: '海外公司/账户与报税 / Global Setup & Tax', href: '#global-tax' },
        { text: '网络技术 / Network Tech', href: '#network-tech' },
        { text: '跨境电商 / Cross-border E-commerce', href: '#cross-border' },
        { text: '关于我们 / About Us', href: '#about' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: '#' },
  ],
  footNote: `
    <span>© ${new Date().getFullYear()} OUTGOPRO · Built with Astro + Tailwind CSS</span>
  `,
};
