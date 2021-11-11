import styled from "styled-components"

export const MenuBurgerWrapper = styled.nav`
  align-items: center;
  background: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: flex-start;
  position: fixed;
  right: ${props => (props.show ? "0" : "-100%")};
  top: 0px;    
  transition: right 0.3s linear;
  width: 73vw;
  
  @media only screen and (min-width: 415px) {
    display:none;
  }

  .mobileHeader{
    background-color: var(--primary-color);
    display: flex;
    flex-direction: column;
    height: 23.5vh;
    justify-content: space-between;
    width:73vw;
  }
  
  .close {
    color: white;
    font-size: 24px;
    font-weight: var(--font-bold);
    padding:5px 10px;
  }

  .close a{
    text-decoration: none;
  }

  .avatar{
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    justify-self: flex-end;
    padding: 5px 12px;
  }

  .logoMobile{
    align-items: center;
    color: var(--tertiary-color);
    display: flex;
    flex-wrap: wrap;
  }

  .logoMobile p {
    background-color: var(--secondary-color);
    border-radius: 50%;
    color: white;
    font-size: var(--heading3);
    font-weight: var(--font-bold);
    padding: 5px;
  }

  .text h3, .mobileBody p {
    font-size: var(--heading3);
    font-weight: var(--font-bold);    
  }
  
  .text h3.great {
    color:var(--quaternary-color);
    opacity: 50%;
    text-align: right;
  }
  
  .text h3.name {
    color: var(--secondary-color);
  }
  
  .textMenu{
    color: white;
    font-size: var(--heading2);
    font-weight: var(--font-bold);
    padding:5px 12px;
    text-align: right;
  }

  .mobileBody{
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    height:62.5vh;
    justify-content: flex-start;
    padding: 31px 12px;
    width: 73vw;
  }

  .botones{
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    height: 10vh;
    justify-content: space-between;
  }

  .botones img{
    width:67vw
  }

  .botones p{
    color: var(--secondary-color);
    padding: 1px 5px;
  }

  .botones p:hover{
    background-color: var(--primary-color);
    border-radius:5px;
    color: white;
  }

  .mobileFooter{
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    height: 14vh;
    justify-content: space-evenly;
    padding-right: 20px;
    width:73vw;
  }

  .logOut{
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    height: 2.5vh;
  }

  .logOut div{
    font-size: 12px;
    font-weight: var(--font-medium);
  }

  .logOut div a{
    color: var(--primary-color);
    text-decoration: none;
  }
  
  .iconsMobile{
    align-items: flex-end;
    display: flex;
    height: 6vh;
    justify-content: space-between;
    width: 33vw;
  }

  .iconSocial{
    opacity:0.6;
  }

  .hide{
    display: none;
    text-align:right;
  }

  .subir{
    justify-content:flex-start;
  }

  .menuFavoritos p{
    text-align: right;
  }

`