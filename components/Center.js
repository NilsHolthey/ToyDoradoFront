import styled from 'styled-components';

const StyledDiv = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export default function Center({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}
