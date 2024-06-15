import Image from 'next/image';
import { useEffect, useState } from 'react';
import 'firebase/storage';
import firebase from 'firebase';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';

/**
 * Keynote Speaker card for landing page.
 */
export default function KeynoteSpeaker(props) {
  const [imageLink, setImageLink] = useState();

  useEffect(() => {
    if (props.imageLink !== undefined) {
      const storageRef = firebase.storage().ref();
      storageRef
        .child(`speaker_images/${props.imageLink}`)
        .getDownloadURL()
        .then((url) => {
          setImageLink(url);
        })
        .catch((error) => {
          console.error('Could not find matching image file');
        });
    }
  }, []);

  return (
    <div className="flex flex-col items-center w-72 md:w-80 h-[350px] md:h-80 rounded-3xl relative overflow-hidden border-2 border-gray-300 font-inter">
      <div className="rounded-t-sm">
        {props.imageLink !== undefined && imageLink !== undefined && (
          <Image src={imageLink} width={350} height={200} objectFit="cover" alt="" />
        )}
      </div>
      <div className="flex-col items-center justify-center w-full h-80 absolute translate-y-44 pt-3">
        <div className="px-8 md:px-4">
          <div className="text-lg md:text-md font-bold pb-1">{props.name}</div>
          <div className="text-md md:text-sm font-normal pb-2 md:pb-1">{props.subtitle}</div>
          <div className="text-xs md:text-[8pt] pb-6 md:pb-2">{props.description}</div>
          <div className="flex space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#9CA6FF]">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                <LinkedInIcon style={{ fontSize: 25, color: 'white' }} />
              </a>
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#9CA6FF]">
              <a href="https://www.github.com" target="_blank" rel="noreferrer">
                <GitHubIcon style={{ fontSize: 25, color: 'white' }} />
              </a>
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#9CA6FF]">
              <a href="https://www.google.com" target="_blank" rel="noreferrer">
                <LanguageIcon style={{ fontSize: 25, color: 'white' }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
