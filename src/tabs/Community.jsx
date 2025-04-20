import { useTranslation } from 'react-i18next';

function Community() {
  const { t } = useTranslation();

  return (
    <>
      <h1 className='flex justify-center items-center'> {t('communityWelcome')} </h1>
    </>
  );
}

export default Community;