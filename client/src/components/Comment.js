import React, {useState, useEffect} from 'react';
import axios from "axios";

export default function CommentList(){

    const base_url = process.env.REACT_APP_BASE_URL;
    const [comments, setCommnets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/shop/:id`);
                setComments(response.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    return(
        <div> Comments
            {/*{comments.map(()=>{*/}
            {/*    <Comment/>*/}
            {/*});*/}
            {/*}*/}
        </div>
    )
}

export default function Comment(){
    return(
        <div>

        </div>
    )
}