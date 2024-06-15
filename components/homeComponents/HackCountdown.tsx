import React, { useState, useEffect, CSSProperties } from 'react';

interface Hack24CountdownProps {
  targetDate: string;
}

const HackCountdown: React.FC<Hack24CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const digitBoxStyle: CSSProperties = {
    background: 'linear-gradient(to bottom, rgba(156, 166, 255, .4), rgba(255, 255, 255, 0.1))',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    margin: '0 10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '87.74px',
    height: '140.38px',
  };

  const digitStyle: CSSProperties = {
    fontFamily: '"DS-Digital", monospace',
    fontSize: '120px',
    fontWeight: 400,
    color: '#05149C',
  };

  const labelStyle: CSSProperties = {
    textTransform: 'uppercase',
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: '40px',
    lineHeight: '60px',
    color: '#05149C',
    marginTop: '10px',
  };

  const styles: { [key: string]: CSSProperties } = {
    countdownContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
      color: '#2E0480',
      background:
        '#FFFFFF url("data:image/svg+xml,%3Csvg width%3D%2250vw%22 height%3D%22353px%22 viewBox%3D%220 0 100vw 706px%22 fill%3D%22none%22 xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cfilter id%3D%22blurStrong%22%3E%3CfeGaussianBlur stdDeviation%3D%2220%22/%3E%3C/filter%3E%3C/defs%3E%3Cellipse cx%3D%2286.5vw%22 cy%3D%22260px%22 rx%3D%22180px%22 ry%3D%22180px%22 fill%3D%22%234A3AFF%22 opacity%3D%220.1%22 filter%3D%22url(%23blurStrong)%22/%3E%3Cellipse cx%3D%2299vw%22 cy%3D%22250px%22 rx%3D%22160px%22 ry%3D%22160px%22 fill%3D%22%232D5BFF%22 opacity%3D%220.1%22 filter%3D%22url(%23blurStrong)%22/%3E%3C/svg%3E") no-repeat bottom right',
      height: '100vh',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    },
    timeSection: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '37.5px',
    },
    notifySection: {
      marginTop: '20px',
      textAlign: 'center',
      fontFamily: 'Poppins',
      fontWeight: 400,
      fontSize: '20px',
      lineHeight: '30px',
      color: '#000000',
      width: '414px',
    },
    button: {
      textDecoration: 'none',
      position: 'relative',
      border: 'none',
      fontSize: '18px',
      fontFamily: 'inherit',
      cursor: 'pointer',
      color: '#fff',
      width: '218.55px',
      height: '53.44px',
      lineHeight: '53.44px',
      textAlign: 'center',
      background: 'linear-gradient(90deg, #d4a6ff, #80baff)',
      backgroundSize: '300%',
      borderRadius: '30px',
      zIndex: 1,
      transition: 'background 1s',
      marginTop: '40px',
      userSelect: 'none',
      outline: 'none',
    },
  };

  return (
    <>
      <style>
        {`
          .button {
            text-decoration: none;
            position: relative;
            border: none;
            font-size: 18px;
            font-family: inherit;
            cursor: pointer;
            color: #fff;
            width: 218.55px;
            height: 53.44px;
            line-height: 53.44px;
            text-align: center;
            background: linear-gradient(90deg, #d4a6ff, #80baff);
            background-size: 300%;
            border-radius: 30px;
            z-index: 1;
            transition: background 1s;
            margin-top: 40px;
            user-select: none;
            outline: none;
          }
          .button:hover {
            animation: ani 8s linear infinite;
            border: none;
          }
          .button::before {
            content: "";
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            z-index: -1;
            background: linear-gradient(90deg, #d4a6ff, #80baff);
            background-size: 400%;
            border-radius: 35px;
            transition: 1s;
          }
          .button:hover::before {
            filter: blur(20px);
          }
          .button:focus {
            outline: none;
          }
          @keyframes ani {
            0% {
              background-position: 0%;
            }
            100% {
              background-position: 400%;
            }
          }
        `}
      </style>
      <div style={styles.countdownContainer}>
        <div style={styles.timeSection}>
          {Object.entries(timeLeft).map(([unit, value]) => {
            const digits = value.toString().padStart(2, '0').split('');
            return (
              <div key={unit} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex' }}>
                  {digits.map((digit, index) => (
                    <div key={`${unit}-${index}`} style={digitBoxStyle}>
                      <span style={digitStyle}>{digit}</span>
                    </div>
                  ))}
                </div>
                <div style={labelStyle}>{unit.toUpperCase()}</div>
              </div>
            );
          })}
        </div>
        <div style={styles.notifySection}>
          <p>We will let you know when we are launching</p>
          <button className="button">Notify Me</button>
        </div>
      </div>
    </>
  );
};

const Hack24Countdown: React.FC = () => {
  return <HackCountdown targetDate="2024-11-04T00:00:00Z" />;
};

export default Hack24Countdown;
