import styled from 'styled-components';

export const ProfileFormLayout = styled.section`
    max-width: 792px;
    grid-row: 2;
    padding: 10px;
    background: linear-gradient(180deg, #E9F2F3 0%, #A6C5E3 100%);
    border-radius: 24px;
`

export const FormTextInput = styled.input`
width: 695px;
height: 80px;
border: 1.41px solid #00000061;
border-radius: 11.3px;
background-color: transparent;
font-family: Roboto;
font-size: 22.6px;
font-weight: 400;
line-height: 32.49px;
text-align: left;
padding: 23.31px 19.78px;

&::placeholder {
    color: #00000099;
  }
`

export const AvatarButton = styled.button`
width: 120px;
height: 120px;
background-color: #D9D9D9;
border-radius: 50%;   
border: none;
`