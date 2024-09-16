import React from 'react'

type props = {
    onChange?: () => void,
    checked?: boolean,
    id? : string | number | undefined,
    disabled?: boolean,
}

const Checkbox: React.FC<props> = ({ id, onChange, checked, disabled }) => {
    return (
        <input id={id} disabled={disabled} onChange={onChange} checked={checked} type="checkbox" value="" className="disabled:opacity-40 w-4 h-4 bg-slate-50 border-gray-300 rounded focus:border-0 text-[var(--primary-theme-color)] focus:ring-0 checked:bg-[var(--primary-theme-color)]" />
    )
}

export default Checkbox