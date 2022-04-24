import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";

export default function Comment(){
    const {userId} = useParams();
    const base_url = process.env.REACT_APP_BASE_URL;
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/mypage/comments/${userId}`);
                setComments(response.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    return(
        <div >Comment
            <Comment/>
        </div>
    )
}
