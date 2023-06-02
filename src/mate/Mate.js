import React from 'react';
import {Container, NavigationBar} from "../UI/UIPackage";
import {useSelector} from "react-redux";
import RecommendUser from "./RecommendUser";

function Community(props) {

    const following = useSelector((state) => state.following)

    return (
        <Container>
            <h1>메이트</h1>
            {
                following?(
                    <RecommendUser/>
                )
                    :
                    (
                        <p>hello</p>
                    )
            }
            <NavigationBar/>

        </Container>
    );
}

export default Community;
