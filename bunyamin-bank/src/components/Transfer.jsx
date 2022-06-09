import React from 'react'

export default function TransferComponent({isIncoming, amount, from, to, date}) {
    return (
        <div className={`col-12 p-2 mt-3 mb-3 block ${isIncoming ? 'border-primary' : 'border-danger'}`}
            style={{border: '1px solid', borderRadius: 6}}>
            <div className="row">
                <div 
                    className="col-12 text-left rounded mb-1" 
                    style={{fontSize: 22}}>Gönderen: {from}</div>
                <div className="col-12 text-left mb-1"
                    style={{fontSize: 22}}>Alıcı: {to}</div>
                <div className="col-12 text-left" 
                    style={{fontSize: 24}}>Tutar: <strong>{ amount }₺</strong>
                </div>
                <div className="col-12 text-right">
                    <small>{ `${ new Date(date).toLocaleDateString('tr-TR') + ' ' + new Date(date).toLocaleTimeString() }`  }</small>
                </div>
            </div>
        </div>
    )
}
