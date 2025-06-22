import cn from 'classnames';
import styles from './Menu.module.css';
import type { MenuProps } from './index';
import { Link, useLocation } from "react-router-dom";

const Menu = (props: MenuProps) => {
    const location = useLocation();

    const menuItems = props.items.map((itemSpec, i) => {
        const isActive = location.pathname === `/${itemSpec.id}`;

        const linkClass = cn(styles['menu-item-link'], {
            [styles['link-selected']]: isActive,
        });

        return (
            <div className={styles['menu-item']} key={`menu-tab-${i}`}>
                <Link className={linkClass} to={`/${itemSpec.id}`}>
                    {itemSpec.label}
                </Link>
            </div>
        );
    });

    return (
        <div className={styles['menu-container']}>
            {menuItems}
        </div>
    );
};

export default Menu;
