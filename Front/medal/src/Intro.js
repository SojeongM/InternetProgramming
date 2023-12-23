import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Intro = () => {
    const navigate = useNavigate();

    const Next = () => {
      navigate("/medal");
    };
    const [scrollOpacity, setScrollOpacity] = useState(0);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const opacity = Math.min(scrollPosition / windowHeight, 1);
      setScrollOpacity(opacity);
    };

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
    
    const wallpaper = process.env.PUBLIC_URL + "/tokyo.jpg"

    return (
      <div>
        <Body>
          <Main>
            <Wall src={wallpaper} />
            <Text>
              <Big>2020 TOKYO OLYMPIC</Big>
              <Small>2021-07-23 ~ 2021-08-08</Small>
            </Text>
          </Main>
          <Info style={{ opacity: scrollOpacity }}>
            <BigInfo>participation from</BigInfo>
            205 countries <br />
            5,000 individuals
            <br />
            <br />
            archery, athletics, badminton, boxing, canoeing, and cycling to
            equestrian sports, football, fencing, golf, gymnastics, handball,
            hockey, judo, modern pentathlon, rowing, rugby, sailing, shooting,
            swimming, taekwondo, tennis, triathlon, table tennis, volleyball,
            weightlifting, wrestling, karate, skateboarding, surfing,
            basketball, sport climbing, and baseball/softball
            <br />
            <NextLink onClick={Next}>see ranking -{">"}</NextLink>
          </Info>
        </Body>
      </div>
    );
}

const Wall = styled.img`
  width: 100%;
  object-fit: cover;
 
`;
const Body = styled.div`
  background-color: #37436b;
  cursor: default;
`;
const Main = styled.div`
  position: relative;
  width: 100%;
  
`;
const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  transition: opacity 0.5s ease;
`;

const Big = styled.div`
  font-size: 70px;
  font-weight: bold;
`;
const Small = styled.div`
  font-size: 35px;
  font-family: "NanumSquareNeo-Variable";
  margin-top: 20px;
`;

const Info = styled.div`
  text-align: center;
  color: white;
  font-family: "Jura-Medium";
  margin-top: 90px;
  font-size: 30px;
  background-color: #37436b;
  margin: 0 20%;
  padding-bottom: 100px;
  line-height: 50px;
  transition: opacity 0.5s ease;
`;
const BigInfo = styled.div`
    font-size: 40px;
    margin-bottom: 40px;
    margin-top: 80px;
`;
const NextLink = styled.div`
  margin-top: 30px;
  text-decoration: underline;
`;
export default Intro