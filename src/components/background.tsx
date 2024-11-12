import React from 'react';
import styled from 'styled-components';

const BackgroundWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #1d2b64, #f8cdda);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: -1;

  .circle {
    position: absolute;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }

  .circle:nth-child(1) {
    left: 20%;
    animation-duration: 7s;
    width: 300px;
    height: 300px;
  }
  .circle:nth-child(2) {
    left: 70%;
    animation-duration: 5s;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
`;

const Background: React.FC = () => {
  return (
    <>
    <BackgroundWrapper>
      <div className="circle"></div>
      <div className="circle"></div>
    </BackgroundWrapper>
    </>
  );
};

export default Background;
