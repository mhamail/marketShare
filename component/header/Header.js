import React from 'react'
import styles from './header.module.scss'
import styled from '@emotion/styled';
import { withRouter } from 'next/router';
import Link from 'next/link';
//component
import SearchProduct from '../shop/components/SearchProduct';
import CartBadge from '../shop/components/CartBadge';
//redux
import { useSelector,useDispatch } from 'react-redux';
import { resetAll } from '../shop/function';
import { selectThemeMode } from '../../redux/slices/theme/themeSelector';

const Header = ({ router,color,opacity }) => {
    const dispatch=useDispatch()
    const theme = useSelector(selectThemeMode)
    const isActive = (path, custom) => {
        if (router.pathname === path) return { color: theme.active, ...custom }
        else return { color: opacity?opacity:theme.text, ...custom }
    }
    const HeaderDiv = styled.div`
        /* background-image:linear-gradient(to right bottom,${theme.primary},${theme.secondary}); */
        `
    const HyperText = styled.a`
        & :hover{
            color:${color?color:theme.active};
        }
        `
    return (
        <HeaderDiv className={styles.header}>
            <div className={styles.search}>
                <SearchProduct />
            </div>
            <div className={styles.topLink}>
                        <Link href={{
                            pathname: "/shop",
                            query: {}
                        }}>
                            <HyperText
                                className={`${styles.text}`}
                                style={isActive("/shop")}>
                                <span onClick={() => resetAll(dispatch)}>
                                    Shop
                                </span>
                            </HyperText>
                        </Link>
                    </div>
            <div className={styles.cart}>
                <Link href="/cart">
                    <HyperText>
                        <CartBadge style={isActive("/cart", { fontSize: "1.7em" })} />
                    </HyperText>
                </Link>
            </div>
        </HeaderDiv>
    )
}

export default withRouter(Header)