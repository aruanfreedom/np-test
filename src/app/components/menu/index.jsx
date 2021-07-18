import styled from 'styled-components';

const Menu = styled.div`
  display: flex;
  background: #33c3f0;
  color: #fff;
  
  a {
    display: block;
    padding: 20px;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;

    &:hover {
      color: #000;
      background: rgba(255, 255, 255, .6);
    }
  }
`;

export default Menu;
