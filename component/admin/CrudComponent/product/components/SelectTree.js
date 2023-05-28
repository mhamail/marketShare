import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Radio, TreeSelect } from 'antd';

const SelectTree = ({handleCategory,cateValue}) => {
    const categories = useSelector((state) => state.category.data)
    const subMap = (sub) => {
        return sub.map((c) => {
            return {
                value: c._id,
                title: c.name,
                selectable:c.sub.length>0 ?false:true,
                children: c.sub && c.sub.length > 0 && subMap(c.sub)
            }
        })
    }
    const treeData =
        categories.map((cat) => {
            return {
                value: cat._id,
                title: cat.name,
                selectable:cat.sub.length>0 ?false:true,
                children: cat.sub && cat.sub.length > 0 && subMap(cat.sub)
            }
        })

    const [value, setValue] = useState(undefined);

    const onChange = (value) => {
        setValue(value);
        handleCategory(value)
    };

    return (
        <>
            <TreeSelect
                showSearch
                style={{
                    width: '100%',
                }}
                value={cateValue}
                dropdownStyle={{
                    maxHeight: 400,
                    overflow: 'auto',
                }}
                placeholder="Please select"
                bordered
                allowClear
                dropdownMatchSelectWidth
                // treeDefaultExpandAll
                onChange={onChange}
                treeData={treeData}
            />
        </>
    );
};
export default SelectTree;