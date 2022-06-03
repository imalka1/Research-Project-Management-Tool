import React, {Component, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


export const Evaluation = () => {
    const [submission, setSumbission] = useState(null);
    const [marking, setMarking] = useState(null)
    const [title, setTitle] =useState("");
    const [details, setDetails] =useState("");
    const [deadline, setDeadline] =useState("");
    const [type, setType] =useState("");

    useEffect (()=>{
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('http://localhost:9000/rpmt/admin/displaySubmission',requestOptions)
            .then(response=>{ return response.json()})
            .then(data=>{
                // console.log(data)
                setSumbission(data)
            });
    })
    useEffect (()=>{
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('http://localhost:9000/rpmt/admin/displayMarking',requestOptions)
            .then(response=>{ return response.json()})
            .then(data=>{
                 console.log(data)
                setMarking(data)
            });
    })
    

    return (
    <div>

<div style={{width: '500px'}}>
                        <h1>Marking Scheme</h1>
                        <table className="table table-striped" style={{marginTop: '40px'}}>
                            <thead>
                            <tr>
                                <th >#</th>
                                <th scope="col" width="20%">Criteria</th>
                                <th scope="col">Mark Distribution</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                marking && marking.map((marking, key) => {
                                    return <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{marking.criteria}</td>
                                        <td>{marking.marks}</td>
                                            </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </div>

                    <hr></hr>

        <div>
            <h1>Document Submissions</h1>
        {
        submission && submission.map((submission, key) => {
            return(<div style={{border: '3px solid #aaaaaa',borderRadius:' 10px',marginRight: '10px',marginTop:'10px'}}>
                <div style={{margin: '10px',display: 'flex'}}>
                    <div className="row" style={{width: '110%'}}>
                        <div className="col-3" style={{paddingTop: '22px',width: '200px',height: '70px'}}>
                            <span style={{fontWeight: 'bold',}}>Title :</span>
                            <span style={{marginleft: '10px'}}>{submission.title}</span>
                        </div>
                        <div className="col-3" style={{paddingTop: '22px',width: '200px',height: '70px'}}>
                            <span style={{fontWeight: 'bold'}}>Description :</span>
                            <span style={{marginleft: '10px'}}>{submission.details}</span>
                        </div>
                        <div className="col-3" style={{paddingTop: '22px',width: '200px',height: '70px'}}>
                            <span style={{fontWeight: 'bold'}}>Deadline :</span>
                            <span style={{marginLeft: '10px'}}>{submission.deadline}</span>
                        </div>
                        <div className="col-3" style={{paddingTop: '22px',width: '200px',height: '70px'}}>
                            <span style={{fontWeight: 'bold'}}>Type :</span>
                            <span style={{marginLeft: '10px'}}>{submission.type}</span>
                        </div>
                        <div className="col-3" style={{paddingTop: '22px',width: '200px',height: '70px'}}>
                        <a href='https://1drv.ms/u/s!Am_XwB2RHl51nCV08Brchj-LZRHr?e=kMhc31' download>Click to download</a>
                            </div>
                    </div>
                </div>
            </div>)
         })        
    }
            
        </div>
    </div>
    );
};