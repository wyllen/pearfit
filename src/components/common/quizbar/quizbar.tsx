import Image from 'next/image';
import Link from 'next/link';
import { X } from 'tabler-icons-react';
import textLogo from '../../../assets/text-logo.png';
import Button from '../../ds/button/button';
import Topbar from '../../ds/topbar/topbar';

const Quizbar = () => {
  return (
    <Topbar
      rightSlot={
        <Button>
          <X />
        </Button>
      }
    >
      <Link href="/">
        <Image
          src={textLogo.src}
          alt="PearFit"
          width={textLogo.width / 2}
          height={textLogo.height / 2}
        />
      </Link>
    </Topbar>
  );
};

export default Quizbar;
