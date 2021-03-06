import clsx from 'clsx';
import React from 'react';
import { Axios } from '../../../core/axios';
import { MainContext } from '../../../pages';
import { Avatar } from '../../Avatar';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import { WhiteBlock } from '../../WhiteBlock';
import styles from './ChooseAvatarStep.module.scss';

const uploadFile = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData()
  formData.append('photo', file)
  const { data } = await Axios.post('upload', formData, {
    headers: {
      'contentType': 'multipart/form-data'
    }
  })

  return data
}
export const ChooseAvatarStep: React.FC = () => {
  const { onNextStep, setFieldValue, userData } = React.useContext(MainContext)
  const avatarLetters = userData.fullname.split(' ').map(s => s[0]).join('')
  const [avatarUrl, setAvatarUrl] = React.useState<string>(userData.avatarUrl)
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChangeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      const data = await uploadFile(file)
      setAvatarUrl(data.url)
      setFieldValue('avatarUrl', data.url)
      target.value = ''
    }
  };
  React.useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener('change', handleChangeImage);
    }
  }, []);

  return (
    <div className={styles.block}>
      <StepInfo title={`Okay, ${userData?.fullname}`} description="How's this photo" />
      <WhiteBlock className={clsx('m-auto mt-40', styles.whiteBlock)}>
        <div className={styles.avatar}>
          <Avatar width="120px" height="120px" src={avatarUrl} letters={avatarLetters} />
        </div>
        <div className="mb-30">
          <label htmlFor="image" className="link cup">
            Choose a different photo
          </label>
        </div>
        <input id="image" ref={inputFileRef} type="file" hidden />
        <Button onClick={onNextStep}>
          Next
          <img className="d-ib ml-10" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
