import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'AI工具及工作流', href: getPermalink('/ai-tools') },
    { text: '海外公司/账户设立报税', href: getPermalink('/global-tax') },
    { text: '网络技术', href: getPermalink('/network-tech') },
    { text: '跨境电商', href: getPermalink('/cross-border') },
    { text: '关于我们', href: getPermalink('/about-us') },
  ],
  actions: [{ text: '联系咨询', href: getPermalink('/about-us') }],
};

export const footerData = {
  links: [
    {
      title: '导航',
      links: [
        { text: 'AI工具及工作流', href: getPermalink('/ai-tools') },
        { text: '海外公司/账户设立报税', href: getPermalink('/global-tax') },
        { text: '网络技术', href: getPermalink('/network-tech') },
        { text: '跨境电商', href: getPermalink('/cross-border') },
        { text: '关于我们', href: getPermalink('/about-us') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [{ ariaLabel: 'Github', icon: 'tabler:brand-github', href: '#' }],
  footNote: `
    <span>© ${new Date().getFullYear()} OUTGOPRO · Built with Astro + Tailwind CSS</span>
  `,
};
