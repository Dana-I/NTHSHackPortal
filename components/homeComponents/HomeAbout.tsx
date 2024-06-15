import React from 'react';
import { CSSProperties } from 'react';

const HomeAbout = () => {
  interface CustomShapesStyles {
    [key: string]: CSSProperties;
  }

  const customShapesStyles: CustomShapesStyles = {
    customShapeOne: {
      position: 'absolute',
      top: '45px',
      left: '195px',
      width: '505px',
      height: '164.75px',
      background: '#C1C8FF',
      borderRadius: '0px 0px 0px 158px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#000',
      transition: 'transform 400ms',
      cursor: 'pointer',
    },
    labelBoxOne: {
      fontWeight: 500,
      fontSize: '48px',
      fontFamily: 'Fredoka',
      color: '#05149C',
      marginBottom: '-10px',
    },
    customShapeTwo: {
      position: 'absolute',
      bottom: '57.8px',
      left: '-50px',
      width: '750px',
      height: '220.23px',
      background: '#C1C8FF',
      borderRadius: '0px 158px 0px 158px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#000',
      transition: 'transform 400ms',
      cursor: 'pointer',
    },
    labelBoxTwo: {
      fontWeight: 500,
      fontSize: '48px',
      fontFamily: 'Fredoka',
      color: '#05149C',
      marginBottom: '-10px',
    },
    customShapeThree: {
      position: 'absolute',
      top: '45px',
      right: '-40px',
      width: '540px',
      height: '403.48px',
      background: '#C1C8FF',
      borderRadius: '0px 158px 0px 0px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#000',
      transition: 'transform 400ms',
      cursor: 'pointer',
    },
    labelBoxThree: {
      fontWeight: 500,
      fontSize: '48px',
      fontFamily: 'Fredoka',
      color: '#05149C',
      marginBottom: '-10px',
    },
    customShapeFour: {
      position: 'absolute',
      top: '41.5px',
      left: '-50px',
      width: '240px',
      height: '167.28px',
      background: '#C1C8FF',
      borderRadius: '0px 158px 0px 0px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#000',
      transition: 'transform 400ms',
      cursor: 'pointer',
    },
  };

  const styles: { [key: string]: CSSProperties } = {
    container: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background:
        '#FFFFFF url("data:image/svg+xml,%3Csvg width%3D%22100vw%22 height%3D%22706px%22 viewBox%3D%220 0 100vw 706px%22 fill%3D%22none%22 xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cfilter id%3D%22blurStrong%22%3E%3CfeGaussianBlur stdDeviation%3D%2220%22/%3E%3C/filter%3E%3C/defs%3E%3Cellipse cx%3D%2295vw%22 cy%3D%2280px%22 rx%3D%22180px%22 ry%3D%22180px%22 fill%3D%22%234A3AFF%22 opacity%3D%220.1%22 filter%3D%22url(%23blurStrong)%22/%3E%3Cellipse cx%3D%2290vw%22 cy%3D%220px%22 rx%3D%22195px%22 ry%3D%22180px%22 fill%3D%22%23962DFF%22 opacity%3D%220.1%22 filter%3D%22url(%23blurStrong)%22/%3E%3Cellipse cx%3D%2210vw%22 cy%3D%22606px%22 rx%3D%22130px%22 ry%3D%22130px%22 fill%3D%22%234A3AFF%22 opacity%3D%220.1%22 filter%3D%22url(%23blurStrong)%22/%3E%3Cellipse cx%3D%225vw%22 cy%3D%22556px%22 rx%3D%22110px%22 ry%3D%22110px%22 fill%3D%22%23962DFF%22 opacity%3D%220.1%22 filter%3D%22url(%23blurStrong)%22/%3E%3Cellipse cx%3D%220vw%22 cy%3D%22506px%22 rx%3D%2290px%22 ry%3D%2290px%22 fill%3D%22%232D5BFF%22 opacity%3D%220.1%22 filter%3D%22url(%23blurStrong)%22/%3E%3C/svg%3E") no-repeat top right',
      padding: '100px',
      color: '#FFFFFF',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      gap: '20px',
      width: '100vw',
      height: '706px',
      overflow: 'hidden',
    },
    header: {
      position: 'absolute',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontFamily: 'Fredoka, sans-serif',
      fontWeight: 600,
      fontSize: '50px',
      color: '#05149C',
    },
    description: {
      position: 'absolute',
      top: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80%',
      fontFamily: 'DM Sans, sans-serif',
      fontWeight: 400,
      fontSize: '16px',
      color: '#000000',
    },
    statsContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
      fontFamily: 'DM Sans, sans-serif',
      fontWeight: 400,
      fontSize: '30px',
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          .statsContainer > div {
            transition: transform 400ms;
          }

          .statsContainer > div:hover {
            transform: scale(1.1);
          }

          .statsContainer:hover > div:not(:hover) {
            filter: blur(10px);
            transform: scale(0.9);
          }
        `}
      </style>
      <h1 style={styles.header}>About HackPortal</h1>
      <p style={styles.description}>
        Hackathons are 24-hour gatherings where students collaborate to <br /> create innovative
        projects, forge new connections, and compete for prizes.
      </p>
      <div className="statsContainer" style={styles.statsContainer}>
        <div style={{ ...customShapesStyles.customShapeFour }}></div>
        <div style={{ ...customShapesStyles.customShapeOne }}>
          <div style={customShapesStyles.labelBoxOne}>Incredible</div>
          Statistic 1
        </div>
        <div style={{ ...customShapesStyles.customShapeTwo }}>
          <div style={customShapesStyles.labelBoxTwo}>Shocking</div>
          Statistic 2
        </div>
        <div style={{ ...customShapesStyles.customShapeThree }}>
          <div style={customShapesStyles.labelBoxThree}>Big</div>
          Statistic 3
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
