import { useState,useEffect } from 'react';
import './App.css';
import './styles/tailwind.css';
import {db} from './firebase/firebase';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

function App() {

  const [info, setinfo] = useState([]);
  const teamData = collection(db,"cleverbotdb");


  const getData= ()=>{
    const unsubscribe = onSnapshot(teamData,(snapshot)=>{
      const teamDetails = snapshot.docs.map((doc)=>({
        ...doc.data(),
        id:doc.id,
      }));
      setinfo(teamDetails)  
    })
    
  }

  useEffect(() => {
    const unsubscribe = getData();
   
  }, [])
  


  return (
    <div style={mainDiv}>
      <div style={{fontWeight:"bold",fontSize:"36px",color:"orange",letterSpacing:"2px"}}>Score Board</div>
      {
        info.map((teams)=>(
          <div style={dataDiv}>
            <div><p>{teams.team}</p></div>
            <div><p>{teams.score} Points</p></div>
          </div>
        ))
      }
      
    </div>
  );
}

const mainDiv = {
  margin:0,padding:0,backgroundColor:"#0C2D57",
  width:"100%",height:"100vh",display:"flex",
  justifyContent:"center",alignItems:"center",
  border:"1px solid #ccc",flexDirection:"column",gap:"8px"
}
const dataDiv ={
  minWidth:"450px",maxWidth:"800px",width: "80%",height:"auto",backgroundColor:"#fff",
  display:"flex",flexDirection: 'row',justifyContent:"space-between",padding:"15px",
  border:"3px solid white",borderRadius:"4px",fontWeight:"bold",fontSize:"28px",
  color:"#0C2D57"
}

export default App;
