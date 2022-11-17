import styles from './Footer.module.scss';
import Link from "next/link"
import Icon from '../../../elements/icon/Icon';

export interface IFooter extends React.ComponentPropsWithoutRef<'div'> { }

const Footer: React.FC<IFooter> = ({ ..._divProps }) => {
  return <>
    <div className={styles.component}>
      <div data-branding>
        <Icon useDefaultColor className={styles.logo} name="yourdash-logo" />
        <h1>YourDash</h1>
      </div>
      <section>
        {/* use chipButton */}
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/docs">Docs</Link>
        <Link href="https://github.com/ewsgit/yourdash">Git</Link>
      </section>
      <footer>
        <section>
          <span>YourDash ©️ 2022 Ewsgit</span>
        </section>
        <section>
          <span></span>
        </section>
      </footer>
    </div>
  </>
};

export default Footer;