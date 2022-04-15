import React from 'react'
import './Header.css';

const Header = () => {
  return (
      <header>
          <div className="logo-container">
              <img src="logo.png" alt="douzoeunLogo" className='logo'></img>
              <div className='theme'>Dou-Zoeun 마켓</div>
          </div>
          <div className='search-container'>
              <input className='searchBox' type="text" />
              <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className='menu-container'>
              <div>판매하기</div><span className='vertical-line2'></span>
              <div>내상점</div><span className='vertical-line2'></span>
              <div>좋은톡</div><span className='vertical-line2'></span>
              <div>로그인/회원가입</div>
          </div>
      </header>
    )
}

export default Header

