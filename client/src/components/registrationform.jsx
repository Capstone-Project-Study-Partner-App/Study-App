import { useState } from "react";
import { createUser } from "../fetching.js";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm ({user,setUser}){
    const [error,setError]=useState(null);
    const [first_name,setFirst_name]=useState("");
    const [last_name,setLast_name]=useState("");
    const [gender,setGender]=useState("");
    const [dob,setDob]=useState("");
    const [education_level,setEducation_level]=useState("");
    const [location,setLocation]=useState("");
    const [classes, setClasses]=useState("");
    const [education,setEducation]=useState("");
    const [major, setMajor]=useState("");
    const [work,setWork]=useState("");
    const [interests,setInterests]=useState("");
    const [skills,setSkills]=useState("");
    const [languages,setLanguages]=useState("");
    const [availibility,setAvailibility]=useState("");
    const [study_habits,setStudy_habits]=useState("");
    
    async function handleSubmit(e){
        e.preventDefault();
        const APIData=await createUser(
            first_name,
            last_name,
            gender,
            dob,
            education_level,
            location,
            classes,
            education,
            major,
            work,
            interests,
            skills,
            languages,
            availibility,
            study_habits,
        );
        if (APIData.success){
            console.log ("New User: ", APIData.data.newUser);
            const newUserList = [...useResolvedPath, APIData.data.newUser];
            setUser(newUserList);

            setFirst_name ("");
            setLast_name ("");
            setLocation ("");
            setEducation_level ("");
            setWork ("");
            setEducation ("");
            education ("");
            setClasses ("");
            skills ("");
            availibility("");
            interests("");
            languages("");
            study_habits("");
            major("");
            gender ("");
        }
    }

    
    
    return (
        <div>
            <h1> 
                This is registration Questions
            </h1>
        </div>
    )
}