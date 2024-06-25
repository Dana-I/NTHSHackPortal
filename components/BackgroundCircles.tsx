import { useEffect, useMemo, useState } from 'react';
import { Container, ISourceOptions } from '@tsparticles/engine';
import Particles from './Particles';
import { useParticles } from './Particles/ParticlesProvider';

export default function BackgroundCircles() {
  const { state: particlesState } = useParticles();
  const [windowWidth, setWindowWidth] = useState(0);

  // tsparticles does not have documentation on size.value unit
  // after experimenting with it, the scaling factor to convert from pixels to size.value is to multiply pixels with 0.5
  const scaleFactor = 0.5;

  const particlesLoaded = (container?: Container) => {
    console.log(container);
    return Promise.resolve();
  };

  useEffect(() => {
    const resizeHandler = () => {
      setWindowWidth(window.innerWidth);
    };

    resizeHandler(); // Init
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      fpsLimit: 120,
      fullScreen: {
        enable: false,
      },
      detectRetina: true,

      particles: {
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          value: 1,
        },
        opacity: {
          value: 1,
        },
        shape: {
          type: 'image',
          options: {
            image: {
              src: '/assets/circles.svg',
              replaceColor: false,
            },
          },
        },
        size: {
          value: Math.min(windowWidth * 0.75 * scaleFactor, 600 * scaleFactor),
        },
      },
    }),
    [windowWidth],
  );

  console.log(options, windowWidth);

  if (particlesState.init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className={'w-full h-full'}
      />
    );
  }

  return <></>;
}
