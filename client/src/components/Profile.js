import React, {useState, useRef} from 'react';

export default function Profile(){
    const [profileImg, setImg] = useState("defaultProfile.jpg")
    const [file, setFile] = useState(''); //사용자가 불러온 파일 정보
    const fileInput = useRef(null); //파일을 업로드 하는 버튼

    //input tag값이 변화되었을때 state에 값을 넣는 함수
    const onChange = (e) => {
        if(e.target.files[0]){
            setFile(e.target.files[0])
        }else{ //업로드 취소
            setImg("defaultProfile.jpg")
            return
        }
        //화면에 프로필 사진 표시
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setImg(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    return(
        <>
            <img src={profileImg} alt="프로필 기본 이미지"
                 style={{width:'100px', height:'100px'}}
                onClick={()=>{fileInput.current.click()}}/>
            <input type="file" name="profilImageUpload"
                   style={{display:'none'}}
                   accept = 'image/*'
                   onChange={onChange}
                   ref={fileInput}/>

        </>
    )
}