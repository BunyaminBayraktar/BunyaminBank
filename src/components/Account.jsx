import React from 'react'
import { useNavigate } from 'react-router'

export default function AccountComponent({id, accountName, balance, accountCode}) {
    const navigate = useNavigate();

  return (
    <div className='row block text-left' style={{fontSize: 20}}>
        <div className="col-12">Hesap Adı: <strong>{accountName}</strong></div>
        <div className="col-12 pt-2">Hesap Bakiyesi: <strong>{balance}</strong></div>
        <div className="col-12">Hesap Kodu: <strong>{accountCode}</strong></div>
        <div className="col-12 pt-3">
            <button className='btn btn-secondary btn-block' onClick={() => navigate('/transfers/new-transfer?fromAcc='+id)}>
                <i className='fa fa-plus mr-2'></i>Yeni Havale Yap
            </button>
            <button className='btn btn-success btn-block' onClick={() => navigate('/transfers/?fromAcc='+accountCode)}>
                <i className='fa fa-eye mr-2'></i>Havaleleri Görüntüle
            </button>
        </div>
    </div>
  )
}
