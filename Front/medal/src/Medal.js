import React, { useEffect, useState } from "react";
import Select from "react-select";
import styled from "styled-components"
import { useNavigate } from "react-router-dom";


const MedalTableDropdown = ({ medalData }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);

  

  const options = medalData.map((country) => ({
    label: country.Country,
    value: country.Country,
  }));

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    const selectedCountryInfo = medalData.find(
      (country) => country.Country === selectedOption.value
    );
    setCountryInfo(selectedCountryInfo);
  };

  return (
    <div>
      <StyledSelect
        id="countries"
        options={options}
        value={selectedCountry}
        onChange={handleCountryChange}
        placeholder="-- 국가를 선택하세요 --"
      />

      {countryInfo && (
        <Info>
          <Name>
            <span>
              #{countryInfo.Ranking} {countryInfo.Country}
            </span>
          </Name>

          <Medal>
            <MedalDetail>
              금<MedalNum bgColor="#FFD700">{countryInfo.Gold}</MedalNum>
            </MedalDetail>
            <MedalDetail>
              은<MedalNum bgColor="#A3A3A3">{countryInfo.Silver}</MedalNum>
            </MedalDetail>
            <MedalDetail>
              동<MedalNum bgColor="#CD7F32">{countryInfo.Bronze}</MedalNum>
            </MedalDetail>
            <MedalDetail>
              합산
              <MedalNum bgColor="#5F85BB">{countryInfo.Total}</MedalNum>
            </MedalDetail>
          </Medal>
        </Info>
      )}
    </div>
  );
};

const MedalTable = () => {
  const [medalData, setMedalData] = useState([]);

  const navigate = useNavigate();

  const Next = () => {
    navigate('/home');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/medal");
        const data = await response.json();
        setMedalData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const logo = process.env.PUBLIC_URL + "/2020_logo.png"

  return (
    <div>
      <Header>
        <Title>2020 tokyo olympic ranking</Title>
        <Nav onClick={Next}>home</Nav>
      </Header>
      <Main>
        <Logo src={logo} />
        <MedalTableDropdown medalData={medalData} />
      </Main>
    </div>
  );
};

const Header = styled.div`
  background-color: #37436b;
  text-align: center;
  font-size: 30px;
  padding: 15px;
  color: white;
  font-family: "Jura-Medium";
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
 
  margin: 0 auto;
  cursor: default;
`;
const Nav = styled.div`
  font-size: 20px;
  cursor: pointer;
`;
const Main = styled.div`
  width: 100%;
   cursor: default;
`;
const Logo = styled.img`
  display: block;
  margin: 0 auto;
  margin-top: 80px;
`;

const StyledSelect = styled(Select)`
  width: 300px;
  margin: 0 auto;
  margin-top: 50px;
`;
const Info = styled.div`
  text-align: center;
 
  margin-top: 30px;
  
`;
const Name = styled.div`
  margin: 0 auto;
  font-size: 25px;
  span {
    box-shadow: inset 0 -20px 0 #cfe2ff;
  }
  font-family: "NanumSquareNeo-Variable";
`;
const Medal = styled.div`
  font-size: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center; 
  margin: 0 auto; 
  margin-top: 10px;
  
`;
const MedalDetail = styled.div`
  margin-top: 15px;
  font-family: "NanumSquareNeo-Variable";
`;

const MedalNum = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 10px;
  padding: 10px;
  line-height: 30px;
  margin-bottom: 50px;
`;


export default MedalTable;
