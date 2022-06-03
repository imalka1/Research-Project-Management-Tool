import React from "react";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBarSup.css'

const prefix = '/supervisor';

export const NavSupervisor = () => {
    let navigate = useNavigate();

    return(
        <div className='navS' style={{paddingLeft: '10px', paddingTop: '10px', paddingRight: '10px', marginTop: '0px'}}>
            <div onClick={() => {
                navigate(prefix + '/view_topics')
            }}>View Topics
            </div>
            <div onClick={() => {
                navigate(prefix + '/add_supervisor')
            }}>Add Supervisor
            </div>
            <div onClick={() => {
                navigate(prefix + '/evaluation')
            }}>Evaluation
            </div>
        </div>
    );
}

