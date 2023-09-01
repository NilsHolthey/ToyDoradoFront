import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`




	*,
	*::before,
	*::after {
		box-sizing: border-box;
		/* outline:1px solid green ; */
		margin: 0;
		padding:0;	
	}

    body{
     box-sizing:border-box;
     margin: 0;
     padding: 0;
     /* font-family: 'Inter', sans-serif; */
    background-color: rgb(241, 241, 241);
}


	


	
`;

export default GlobalStyles;
