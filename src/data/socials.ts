import { company } from './company';
export const socials = [
  { key: 'github', label: 'GitHub', url: company.github, account: 'kineworld' },
  { key: 'bilibili', label: 'Bilibili', url: 'https://space.bilibili.com/3747562836200440', account: '勘境智能', id: '3747562836200440' },
  { key: 'douyin', label: 'Douyin', url: 'https://www.douyin.com/search/63605940588?type=user', account: '勘境智能', id: '63605940588' },
] as const;

// WeChat has no verified public profile URL; Xiaohongshu's profile has not
// been supplied. Keep their names visible without fabricating direct links.
export const socialNames = {
  wechat: '勘境智能',
  xiaohongshu: null,
} as const;
