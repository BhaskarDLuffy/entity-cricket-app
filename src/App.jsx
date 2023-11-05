import React, { useState } from 'react'
import './App.css'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


const App = () => {
  const [matchData, setMatchData] = useState([])
  const handleSubmit = async () => {
    const response = await axios(`https://cricket-api.aadhan.workers.dev/`)
    const data = await response.data.response
    setMatchData(data);
    console.log(data);
    return data;
  }
  const fecthEntityMatchdata = useQuery({
    queryKey: ["cricketscore"],
    queryFn: () => handleSubmit(),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchInterval: 10000
  })
console.log(fecthEntityMatchdata.status)
  if (fecthEntityMatchdata.status == 'pending') return (
    <div className='h-screen w-full grid place-content-center'>
      <div className=''>
        <h4>Loading.........</h4>
      </div>
    </div>
  )

  return (
    <div>
      <div className='flex justify-start items-center border-2 gap-[5rem] p-5'>
        <div className=''><b>{matchData["match_info"].teama.name}</b> - <span className='text-[aqua] font-semibold'>score:</span> {matchData["match_info"].teama.scores} - <span className='text-[aqua] font-semibold'>overs:</span> {matchData["match_info"].teama.overs}</div>
        <div className=''><b>{matchData["match_info"].teamb.name}</b> - <span className='text-[aqua] font-semibold'>score:</span> {matchData["match_info"]?.teamb.scores} - <span className='text-[aqua] font-semibold'>overs:</span> {matchData["match_info"]?.teamb.overs}</div>
      </div>
      <br />
      <div className='flex justify-center items-center border-2 gap-[5rem] p-5'>
        <div className='flex flex-col justify-center items-start'>
          <h3 className='font-bold'>Batsmans:</h3>
          <div>
          {matchData.live.batsmen.map((striker)=>(
            <div key={striker.name} className='text-left'>
              {striker.name}
            </div>
          ))}
          </div>
        </div>
        <div className='flex flex-col justify-center items-start'>
          <h3 className='font-bold'>Bowlers:</h3>
          <div>
          {matchData.live.bowlers.map((bowler)=>(
            <div key={bowler.name}>
                {bowler.name}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App