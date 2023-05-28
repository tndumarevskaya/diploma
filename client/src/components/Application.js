import React from 'react'

export default function Application({ isOpen, onClose }) {
    if (!isOpen) return null; 
    
    return (
        <div className='application'>
            <div className="modal">
                <div className="modal-content">
                    application
                    <div className='buttons'>
                        <button className="save-button" onClick={onClose}>Принять</button>
                        <button className="cancel-button" onClick={onClose}>Отклонить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
