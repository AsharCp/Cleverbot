import { useState,useEffect } from 'react';
import './App.css';
import './styles/tailwind.css';
import {db} from './firebase/firebase';
import './style.css';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';

function App() {

  const [info, setinfo] = useState([]);
  const [teamName, setteamName] = useState("");
  const [teamScore, setteamScore] = useState("");
  const teamData = collection(db,"cleverbotdb");
  const [isDivVisible, setisDivVisible] = useState(true);

  // Function to fetch the data
  const getData= ()=>{
    const unsubscribe = onSnapshot(teamData,(snapshot)=>{
      const teamDetails = snapshot.docs.map((doc)=>({
        ...doc.data(),
        id:doc.id,
      }));
      setinfo(teamDetails)  
    })
    
    
  }
  // Useeffect
  useEffect(() => {
    const unsubscribe = getData();
   
  }, [])
  // Read name
  const handleName=(event)=>{
    setteamName(event.target.value);
  }
  // Read score
  const handleScore=(event)=>{
    let scoreValue = parseInt(event.target.value)
    setteamScore(scoreValue);
  }
  // Add button
  const handleAddDataBtn=()=>{
    const docRef = addDoc(teamData,{
      team:teamName,
      score:parseInt(teamScore)
    })
    setteamName("");
    setteamScore("")
  }
  // Toggle button
  const toggleBtn=()=>{
    setisDivVisible(!isDivVisible)

  }
  // delete
  const deleteData=(id)=>{
    const deleteDetails = deleteDoc(doc(db,"cleverbotdb",id));
    
  }
  // Increment score
  const increment=(inData)=>{
    const incrementDetails = updateDoc(doc(db,"cleverbotdb",inData.id),{
      score:parseInt(inData.score)+parseInt(5)
      
    })
  }
  // decrement score
  const decrement=(deData)=>{
    const decrementDetails = updateDoc(doc(db,"cleverbotdb",deData.id),{
      score:parseInt(deData.score)-5
    })

  }

  return (
    <div style={mainDiv} className='maindiv'>
      <div>
        <button style={modeButtonStyle} onClick={toggleBtn}>{isDivVisible?"admin":"user"}</button>
      </div>
      <div style={{fontWeight:"bold",fontSize:"50px",color:"orange",letterSpacing:"2px",marginTop:"0px"}}>Score Board</div>
      {
        info.map((teams)=>(
          <div style={dataDiv} key={teams.id}>
            <div><p>{teams.team}</p></div>
            <div><p>{teams.score} Points</p></div>
        
            {isDivVisible?
              <div>
              <button onClick={()=>increment(teams)} style={buttonStyle} >+5</button>
              <button onClick={()=>decrement(teams)} style={buttonStyle} >-5</button>
              <button onClick={()=>deleteData(teams.id)} style={buttonStyle}>Delete</button>
            </div>
            :""
           }
            
          </div>
        ))
      }
      {isDivVisible?
        <div style={addDiv}>
          <input onChange={handleName} value={teamName} type='text' placeholder='Team name' style={inputStyle}></input>
          <input onChange={handleScore} value={teamScore} type='number' placeholder='Score' style={inputStyle}></input>
          <button  onClick={handleAddDataBtn} style={AddbuttonStyle}>Add team</button>
        </div>:""
      }
      
      
    </div>
  );
}

const mainDiv = {
  margin:0,padding:0,backgroundColor:"black",
  width:"100vw",height:"100vh",display:"flex",
  justifyContent:"center",alignItems:"center",
  border:"0px solid #ccc",flexDirection:"column",gap:"8px",
  
}
const dataDiv ={
  minWidth:"350px",maxWidth:"800px",width: "80%",height:"auto",backgroundColor:"#fff",
  display:"flex",flexDirection: 'row',justifyContent:"space-between",padding:"5px",
  borderRadius:"4px",fontWeight:"bold",fontSize:"28px",
  color:"#0C2D57"
}
const addDiv = {
  display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"black",
  padding:"1px",borderRadius:"3px",flexDirection:"column"
  
}
const buttonStyle ={
  background:"white",marginRight:"3px",backgroundColor:"black",color:"white",fontSize:"18px",
  fontWeight:"normal",borderRadius:"4px",padding:"4px",isCursorAtEnd:"pointer"

}
const inputStyle = {padding:"3px",margin:"3px",width:"330px",borderRadius:"3px",height:"40px",
outline:"none",backgroundColor:"#fff",color:"black",marginTop:"1px",alignItems:"center",
border:"1px solid #ccc"

}

const modeButtonStyle ={
  background:"blue",margin:"3px",padding:"3px",backgroundColor:"#0C2D57",color:"white",fontSize:"18px",
  fontWeight:"normal",borderRadius:"4px",padding:"4px",isCursorAtEnd:"pointer",position:"absolute",top:"3px",right:'2px'
}
const AddbuttonStyle ={
  background:"white",padding:"2px",backgroundColor:"#2F3C7E",color:"white",fontSize:"18px",
  fontWeight:"normal",borderRadius:"4px",isCursorAtEnd:"pointer",paddingTop:"0px",paddingBottom:"6px"
  
  
}
if (window.matchMedia('(max-width: 576px)').matches) {
  dataDiv.fontSize = "18px";
  inputStyle.height="35px";
  inputStyle.width="250px";
  dataDiv.width = "30%";
  dataDiv.minWidth="300px";
  buttonStyle.fontSize="15px"
}



export default App;
