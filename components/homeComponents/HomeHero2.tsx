import { useRouter } from 'next/router';
import Image from 'next/image';
import Circles from '../../public/assets/circles.svg';
import MLH_Sticker from '../../public/assets/mlh-sticker.png';
import AppHeader2_Wrapper from '../AppHeader2/wrapper';
import BackgroundCircles from '../BackgroundCircles';

export default function HomeHero() {
  const router = useRouter();

  return (
    <section className="min-h-screen bg-contain bg-white flex flex-col">
      {/* App header */}
      <AppHeader2_Wrapper />

      <div className="flex h-screen w-full relative">
        {/* Circles */}
        {/* <Circles className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[600px] max-w-[75vw] h-auto" /> */}
        <div className="w-full h-full absolute top-0 left-0 z-0">
          <BackgroundCircles />
        </div>

        <div className="relative z-10 shrink-0 w-full flex">
          {/* MLH sticker */}
          <div className="absolute top-0 right-4 z-20">
            <Image
              src={MLH_Sticker.src}
              height={MLH_Sticker.height}
              width={MLH_Sticker.width}
              alt="MLH sticker"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Big welcome */}
          <div className="w-full flex flex-col gap-1 justify-center items-center bg-[rgba(242,243,255,0.75)] backdrop-blur-[70px]">
            <p className="text-2xl md:text-4xl">Welcome To</p>
            <h1 className="text-4xl md:text-6xl lg:text-9xl font-bold text-[#05149C]">
              HACKPORTAL
            </h1>
          </div>
        </div>
      </div>

      {/* Bottom banner */}
      <div className="w-full flex justify-center bg-[#7B81FF] text-white h-[1.75rem] text-nowrap">
        <p className="text-lg">
          SAMPLE TEXT • SAMPLE TEXT • SAMPLE TEXT • SAMPLE TEXT • SAMPLE TEXT • SAMPLE TEXT • SAMPLE
          TEXT • SAMPLE TEXT • SAMPLE TEXT
        </p>
      </div>
    </section>
  );
}
