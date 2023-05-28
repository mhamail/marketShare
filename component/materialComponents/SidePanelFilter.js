import React from 'react'
import { useSelector } from 'react-redux'


const SidePanelFilter = ({ data }) => {
    const theme = useSelector(state => state.theme.themeMode)
   
    let titleStyle = {
        backgroundColor: theme.text,
        color: theme.rgbPrimary
    }
    let contentStyle = {
        display:"flex",
        justifyContent:"center"
    }
    return (
        <div>
            {data.map((item, i) => (
                <div className='p-2' key={i}>
                    <h6 className='d-flex p-1' style={titleStyle}>
                        <item.icon /> &nbsp; {item.title}
                    </h6>
                   <span style={contentStyle}> {item.content()}</span>
                </div>
            ))}
        </div>
    )
}

export default SidePanelFilter