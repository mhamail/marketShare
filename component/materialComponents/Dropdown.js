import React from 'react'
import styles from './material.module.scss'
import Link from 'next/link'

const Dropdown = ({ title, link, position, color }) => {
    let main = { color: color.text }
    return (
        <>
            <div className={styles.dropdownMain} style={main}>
                {title}
                <div className={styles.dropdownContent}
                    style={{ [position]: "-10%", }}>
                    {link.map((item, i) => {
                        return !item.func ?
                            <Link href={item.link} key={i}>
                                <a>
                                    {item.name}
                                </a>
                            </Link>
                            :
                            <div onClick={item.func} key={i}>
                                <a> {item.name}</a>
                            </div>
                    }

                    )}
                </div>
            </div>
        </>
    )
}

export default Dropdown