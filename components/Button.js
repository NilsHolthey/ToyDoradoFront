import styled, { css } from 'styled-components';

export const ButtonStyle = css`
  border: none;
  color: rgb(51, 51, 51);
  padding: 5px 15px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  svg {
    height: 18px;
  }
  cursor: pointer;
  ${(props) =>
    props.light &&
    !props.outline &&
    css`
      background-color: rgb(241, 241, 241);
    `}
  ${(props) =>
    props.light &&
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid #fdf7d2;
      color: #fdf7d2;
      font-size: 0.9rem;
    `}
  ${(props) =>
    props.prmy === '1' &&
    css`
      font-size: 0.9rem;
      background-color: #f5df4d;
      border: 1px solid #f5df4d;
    `}

${(props) =>
    props.size === 'lg' &&
    css`
      font-size: 1.5rem;
      padding: 10px 20px;
      gap: 2px;
      align-items: center;
      svg {
        height: 18px;
      }
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
