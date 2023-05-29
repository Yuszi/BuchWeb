import css from 'styled-jsx/css';

const HeaderStyles = css`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: #f2f2f2;
  }

  .logo {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  .nav {
    display: flex;
    align-items: center;
  }

  .nav-link {
    margin-right: 10px;
    color: #666;
    text-decoration: none;
  }
`;

export default HeaderStyles;