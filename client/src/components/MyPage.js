import React from 'react';
import {Tabs, Tab} from "react-bootstrap";
import Profile from './Profile';
import Product from "./Product";

export default function MyPage(){

    return(
        <div style={{width:'80%', margin:'auto'}}>
           <Profile/>
            <Tabs defaultActiveKey="MyProduct" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="MyProduct" title="나의 상품 목록">
                    <Product/>
                </Tab>
                <Tab eventKey="MyFavorite" title="찜 목록">
                    <Product/>
                </Tab>
            </Tabs>
        </div>
    )
}