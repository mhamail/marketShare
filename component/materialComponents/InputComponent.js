import React from 'react'

const InputComponent = (props) => {
    const { sign, label, type, placeholder, name, value, onChange, disabled, style,text } = props
    return (
        <div className='form-group mt-2'>
            {sign} <label className='text-muted'>{label}</label> &nbsp; &nbsp; &nbsp; 
            <span className='text-muted'>{text}</span>
            <input
                style={style}
                className='form-control'
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    )
}

export default InputComponent