import { DeleteFilled } from '@ant-design/icons';
import { Menu,Tooltip } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import SearchComponent from '../../../materialComponents/SearchComponent'

const DropdownCategory = ({ clickCategory, removeCat }) => {
    const categories = useSelector((state) => state.category.data)
    const [keyword, setKeyword] = useState('')

    const searchItem = () => (
        <SearchComponent
            keyword={keyword}
            setKeyword={setKeyword}
            placeholder="search category"
        />
    )
    let title, clickDisable;
    const catStyleByLength = (c) => {
        if (c.sub.length > 0) {
            title = "delete child first"
            clickDisable = { cursor: "none", opacity: "0.2" };
        }
        else {
            title = "delete category, becareful"
            clickDisable = undefined
        }
    }
    const removeCategory = (c) => {
        if (c.sub.length > 0) {
        }
        else {
            removeCat(c._id)
        }
    }
    const clickCat = (c) => (
        <div>
            {catStyleByLength(c)}
            <Tooltip title={title}>
                <span className='me-3 text-danger' style={clickDisable} onClick={() => removeCategory(c)}><DeleteFilled /></span>
            </Tooltip>
            <span onClick={() => clickCategory(c)}>{c.name}</span>
        </div>
    )

    const subMap = (sub) => {
        return sub.map((c) => (
            !c.sub.length ?
                <div className='p-3' style={{ cursor: "pointer" }}>{clickCat(c)}</div>
                :
                <Menu.SubMenu
                    title={clickCat(c)}
                >
                    {c.sub &&
                        subMap(c.sub)
                    }
                </Menu.SubMenu>
        ))
    }
    return (
        <>
            {searchItem()}
            {categories.filter((c) =>
                c.name.includes(keyword)).map((c) => {
                    return <Menu defaultOpenKeys={["1", "2"]} theme="dark" style={{ minWidth: "200px" }}>
                        <Menu.SubMenu
                            title={clickCat(c)}
                        >
                            {c.sub &&
                                subMap(c.sub)
                            }
                        </Menu.SubMenu>
                    </Menu>
                })}
        </>
    );
};
export default DropdownCategory;