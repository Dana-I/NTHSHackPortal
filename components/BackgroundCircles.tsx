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

      //   interactivity: {
      //     events: {
      //       onClick: {
      //         enable: false,
      //         mode: 'push',
      //       },
      //       onHover: {
      //         enable: false,
      //         mode: 'repulse',
      //       },
      //     },
      //     modes: {
      //       push: {
      //         quantity: 4,
      //       },
      //       repulse: {
      //         distance: 200,
      //         duration: 0.4,
      //       },
      //     },
      //   },

      //   background: {
      //     color: {
      //       value: '#0d47a1',
      //     },
      //   },

      particles: {
        // color: {
        //   value: '#ffffff',
        // },
        // links: {
        //   color: '#ffffff',
        //   distance: 150,
        //   enable: true,
        //   opacity: 0.5,
        //   width: 1,
        // },
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
          //   density: {
          //     enable: true,
          //   },
          value: 1,
        },
        opacity: {
          value: 1,
        },
        shape: {
          type: 'image',
          options: {
            image: {
              // any path or url to your image that will be used as a particle
              src: '/assets/circles.svg',
              // the pixel width of the image, you can use any value, the image will be scaled
              //   width: 600,
              // the pixel height of the image, you can use any value, the image will be scaled
              //   height: 600,
              // if true and the image type is SVG, it will replace all the colors with the particle color
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
