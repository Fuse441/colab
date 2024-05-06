import { PrimeIcons, MenuItem } from 'primeng/api';

export const menu: MenuItem[] = [
  {
    label: 'หน้าแรก',
    icon: PrimeIcons.HOME,
    url: 'home'
},{
  label: 'ติดต่อ',
  icon: PrimeIcons.INBOX,
  url: 'contact'
},{
  label: 'เข้าสู่ระบบ/สมัครสมาชิก',
  icon: PrimeIcons.SIGN_IN,
  url: 'login'
}
];
