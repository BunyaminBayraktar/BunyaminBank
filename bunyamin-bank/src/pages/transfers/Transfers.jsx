import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TransferComponent from '../../components/Transfer';
import { getUserTransfers } from '../../services/monetary.service';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useLocation, useNavigate } from 'react-router';

export default function Transfers() {
  const userName = useSelector((state) => state.user.loggedInUser.userName);
  const [errorMessage, setErrorMessage] = useState('');
  const [incomings, setIncomings] = useState([]);
  const [outGoings, setOutgoings] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [accountCode, setAccountCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    try
    {
      const queryParams = new URLSearchParams(location.search);
      let accountCodeLcl = queryParams.get('fromAcc');
      if(accountCodeLcl === null)
      {
          navigate('/accounts');
          return;
      }
      console.log("accountCodeLcl", accountCodeLcl);
      setAccountCode(accountCodeLcl);
      console.log("accountCode", accountCode);

      var userTransfers = getUserTransfers(userName);
      console.log("userTransfers", userTransfers);
      if(userTransfers.Status)
      {
        userTransfers.Outgoings = userTransfers.Outgoings.filter(item => item.source.accountCode === accountCodeLcl);
        userTransfers.Incomings = userTransfers.Incomings.filter(item => item.destination.accountCode === accountCodeLcl);
        
        if(userTransfers.Incomings.length > 0 || userTransfers.Outgoings.length > 0)
        {
          setIncomings(userTransfers.Incomings);
          setOutgoings(userTransfers.Outgoings);
          setCanvas(userTransfers.Incomings, userTransfers.Outgoings);
        }
        else
        {
          setErrorMessage("Herhangi bir transfer bulunamadı.");
        }
      }
      else
      {
        setErrorMessage(userTransfers.ErrorList.join(','));
      }
    }
    catch(err)
    {
      console.log('transfers useEffect err', err);
    }
  }, [userName, accountCode]);

  function setCanvas(incomeArr, outgoingArr)
  {
    try 
    {
      console.log("incomeArr", incomeArr);
      console.log("outgoingArr", outgoingArr);
      console.log("userName", userName);

      const allTransfers = incomeArr.concat(outgoingArr);

      allTransfers.sort((a,b) => new Date(a.date) > new Date(b.date));
      console.log("sortedArr", allTransfers);
      console.log("accountCode", accountCode);
      console.log("mapped sortedArr", allTransfers.map((t) => 
      (
        t.destination.userName === userName
        && t.destination.accountCode === accountCode
      ) ? t.destination.afterBalance : t.source.afterBalance));

      const data = {
        labels: allTransfers.map(t => {
          var date = new Date(t.date);
          console.log("T.date", date);
          var dd = String(date.getDate()).padStart(2, '0');
          var mm = String(date.getMonth() + 1).padStart(2, '0');
          var hh = String(date.getHours()).padStart(2, '0');
          var min = String(date.getMinutes()).padStart(2, '0');
          var yy = String(date.getFullYear()).substring(2, 4);

          return dd + '.' + mm + '.' + yy + " " + hh + ":" + min;
        }),
        datasets: [
          {
            label: 'Bakiye',
            data: allTransfers.map((t) => 
              (
                t.destination.userName === userName
                && t.destination.accountCode === accountCode
              ) ? t.destination.afterBalance : t.source.afterBalance),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };

      console.log("chartData", data);
      setChartData(data);
    } 
    catch (error) 
    {
      console.log("transfers.chart", error);
    }
    
  }

  return (
    <div className='w-100 p-5 row justify-content-center'>
      {
        errorMessage &&
          <span className='alert alert-danger'>{errorMessage}</span>
      }
      {
        chartData && 
        <div className="col-12 p-5">
          <Line data={chartData} style={{maxHeight: 300}} key="chart"></Line>
        </div>
      }
      {
        incomings.length > 0 && 
        <div className="col-md-6 col-sm-12">
          <div className="col-12 block" style={{fontSize: 25}}>
            Gelirler
          </div>
          {
            incomings.map((incoming, index) => 
              <TransferComponent
                amount={incoming.amount}
                from={incoming.source.userName}
                to={incoming.destination.userName}
                isIncoming={true}
                date={incoming.date}
                key={index}
                ></TransferComponent>
            )
          }
        </div>
      }
      {
        outGoings.length > 0 &&
        <div className="col-md-6 col-sm-12">
          <div className="col-12 block" style={{fontSize: 25}}>
            Giderler
          </div>
        {
            outGoings.map((outGoing, index) => 
              <TransferComponent
                amount={outGoing.amount}
                from={outGoing.source.userName}
                to={outGoing.destination.userName}
                isIncoming={false}
                date={outGoing.date}
                key={index}
              ></TransferComponent>
            )
          }
        </div>
      }
    </div>
  )
}
