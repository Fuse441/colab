import { PrimeIcons, MenuItem } from 'primeng/api';

export const menu: MenuItem[] = [
  {
    label: 'หน้าแรก',
    icon: PrimeIcons.HOME,
    url: 'home'
},{
  label: 'ติดต่อ',
  icon: PrimeIcons.INBOX,
  url: 'content'
},{
  label: 'เข้าสู่ระบบ/สมัครสมาชิก',
  icon: PrimeIcons.SIGN_IN,
  url: 'sign_in'
},{
  label: 'ข้อเสนอแนะ',
  icon: PrimeIcons.COMMENTS,
  url: 'suggestion'
},{
  label: 'ช่วยเหลือ',
  icon: PrimeIcons.EXCLAMATION_CIRCLE,
  url: 'assist'
}
];
