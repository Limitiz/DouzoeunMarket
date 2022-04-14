import React from 'react'
import './Footer.css';

function Footer() {
    return (
        <footer>
            <div className='left'>
                <div className='company'>더 좋은 마켓(주) <span className='vertical-line'></span> 사업자정보</div>
                <div>사업자 등록번호 : 123-456-789 통신판매업신고: 2022-서울송파-1124</div>
                <div>호스팅서비스 제공자 : Amazon Web Service(AWS)</div>
                <div>Email: douzone2Team@naver.com </div>
                <div>서울특별시 송파구 중대로 135, 서관 12층 (가락동) 대표전화 : 02-2188-6900 사업자번호 : 214-82-04799</div>
            </div>
            <div className='rightc'>
                <div className='right'>
                    <i className="fa-brands fa-facebook"></i>                
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-medium"></i>
                </div>
                {/* <div className='title'>더 조은 마켓</div> */}
                <br />
                <div className="address">Copyright@Douzone2Team</div>
                <br />
                <div className="info">
                    <div className='underline'>이용약관</div>
                    <div className='underline'>개인정보처리방침</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer