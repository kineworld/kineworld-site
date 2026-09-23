export const pages = ['research','projects','updates','about','contact','media','faq','privacy','terms'] as const;
export const navigation = [
  {path:'/',zh:'首页',en:'Home'}, {path:'/research/',zh:'研究',en:'Research'},
  {path:'/projects/',zh:'项目',en:'Projects'}, {path:'/updates/',zh:'进展',en:'Updates'},
  {path:'/about/',zh:'关于',en:'About'}, {path:'/contact/',zh:'联系',en:'Contact'},
] as const;
export const localPath = (path:string, lang:'zh'|'en') => lang === 'zh' ? path : path === '/' ? '/en/' : '/en' + path;
