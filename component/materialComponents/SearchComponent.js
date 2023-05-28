import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import styles from './material.module.scss'

const SearchComponent = ({ keyword, setKeyword, placeholder,onClick,onkeypress }) => {
    const handleSearch = (event) => {
        setKeyword(event.target.value)
    }
    const clickPress=event=>{
        if (event.keyCode === 13) {
            onClick && onClick()
         }
    }
    return (
        <div className={`${styles.search} p-2 form-group`}>
            <div className={styles.icon} onClick={onClick}>
                <SearchOutlined />
            </div>
            <input
                type="search"
                className={`${styles.input} form-control`}
                onChange={handleSearch}
                placeholder={placeholder}
                onKeyUp={clickPress}
                value={keyword}
            />
        </div>
    )
}

export default SearchComponent