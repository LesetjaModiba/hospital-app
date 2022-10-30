import { SafeAreaView,StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";

import React, { useEffect} from "react";
import { addDoc, collection, getDocs,serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase.js';

const NurseHome = ({navigation}) => {
    const [patientInfo,setPatientInfo]=React.useState([])
    const patientRef = collection(db, "patients")

    const getPatientRef = async () => {
        const data = await getDocs(patientRef)

        console.log(data.docs.map((results) => (results.data())))
        setPatientInfo(data.docs.map((results) => ({ ...results.data(), id: results.id })));


    }
    useEffect(() => {
        getPatientRef()

    }, []);

    return ( 
        <SafeAreaView  style={styles.container}>
        <View style={{width:"100%",flexDirection:"row", paddingLeft:40,marginTop:60}}>
            <Text>
                Photo
            </Text>
            <View>
                <Text style={{color: "white"}}>Nurse Name</Text>
                <Text style={{color: "white"}}>Nurse ID no</Text>
                <Text style={{color: "white"}}>Employee no</Text>
            </View>
        </View>
        <ScrollView style={styles.patientList}>
            <TextInput style={{width: "95%", height: 32, backgroundColor: "#5060F0",borderRadius: 5,placeholderTextColor:"white",paddingLeft:10,color:"white",marginBottom:20,alignSelf:"center"}}
            placeholder="Search..."
            />
    
        {patientInfo.map((patient,index)=>{
           if( patient.condition=="Severe"){
            return(
                <TouchableOpacity style={styles.patient} key={index} onPress={()=>navigation.navigate("nursePatientFile",{patient:patient})}>
                <Text style={{color:"white"}}>{patient.fullName} {patient.idno}</Text>
                <View style={{width:20,height:20,borderRadius:10,backgroundColor:"red",marginRight:10}}></View>
                </TouchableOpacity>
            )
           }
           else if(patient.condition==="Moderate"){
            return(
                <TouchableOpacity style={styles.patient} key={index} onPress={()=>navigation.navigate("nursePatientFile",{patient:patient})}>
                <Text style={{color:"white"}}>{patient.fullName} {patient.idno}</Text>
                <View style={{width:20,height:20,borderRadius:10,backgroundColor:"#32CD32",marginRight:10}}></View>
                </TouchableOpacity>
            )
           }
           else{
            return(
                <TouchableOpacity style={styles.patient} key={index} onPress={()=>navigation.navigate("nursePatientFile",{patient:patient})}>
                <Text style={{color:"white"}}>{patient.fullName} {patient.idno}</Text>
                <View style={{width:20,height:20,borderRadius:10,backgroundColor:"white",marginRight:10}}></View>
                </TouchableOpacity>
            )
           }
                
 
                    }
               )
        }
        </ScrollView>

        <TouchableOpacity style={{width: 246, height: 41, backgroundColor: "#5060F0",borderRadius: 5,justifyContent:"center",marginBottom:40}} onPress={()=>navigation.navigate("nurseLogin")}>
            <Text style={{alignSelf:"center",color:"white"}}>Close</Text>
        </TouchableOpacity>

        </SafeAreaView>
     );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#2827D3",
        overflowX:"hidden",
      },
      patientList:{
          width: 360,
          height: 200,
          marginTop:40,
          marginBottom:40,
          padding:20,
          border: "2px solid #9C9EEB",
          borderRadius: 15,
      },
      patient:{
          width: "95%",
          height: 44,
          backgroundColor:"#5060F0",
          borderRadius: 5,   
          alignSelf:"center",
          alignItems:"center",
          marginTop:10,
          paddingLeft:10,
          flexDirection:"row",
          justifyContent:"space-between"
      }
})
export default NurseHome;